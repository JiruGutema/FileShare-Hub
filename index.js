import express, { static as serveStatic } from "express";
import multer, { diskStorage } from "multer";
import { extname } from "path";
import { readdir, unlink, stat, mkdirSync, existsSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import os from "os";
import qrcode from "qrcode-terminal";
import QRCode from "qrcode";
import styles from "./utils/styles.js"; // Import styles
import script from "./utils/script.js"; // Import script
import homePage from "./utils/homePage.js"; // Import home page template
import getFiles from "./utils/getFiles.js";
import uploadFiles from "./utils/uploadFiles.js";
import loginPage from "./utils/login.js";
import shareText from "./utils/shareText.js"; // Import text sharing functionality
import getFileIcon from "./utils/getFileIcon.js";
import {listUploads, listCard} from "./utils/listUploads.js";

const platform = os.platform();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 1234;

// Generate random 5-digit access code
const ACCESS_CODE = Math.floor(10000 + Math.random() * 90000).toString();
const authenticatedSessions = new Set();
let sharedText = { content: '', language: 'text', timestamp: null };

// Clear all data on server restart
function clearAllData() {
  if (existsSync('uploads')) {
    rmSync('uploads', { recursive: true, force: true });
  }
  mkdirSync('uploads');
  authenticatedSessions.clear();
  sharedText = { content: '', language: 'text', timestamp: null };
}

// Clear data on startup
clearAllData();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple session middleware with cookie support
function requireAuth(req, res, next) {
  const sessionId = req.headers['x-session-id'] || req.query.session || req.headers.cookie?.split('session=')[1]?.split(';')[0];
  if (authenticatedSessions.has(sessionId)) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Get network IP address
function getNetworkIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const inter of interfaces[name]) {
      if (inter.family === 'IPv4' && !inter.internal) {
        return inter.address;
      }
    }
  }
  return 'localhost';
}

const networkIP = getNetworkIP();

// Set up storage with multer
const storage = diskStorage({
  destination: (_, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_, file, cb) => {
    // Add timestamp before the original name to avoid collisions
    cb(null,file.originalname);
  },
});
const upload = multer({ storage });

// Serve static files from the uploads directory with authentication
app.use("/uploads", (req, res, next) => {
  const sessionId = req.headers.cookie?.split('session=')[1]?.split(';')[0] || req.query.session;
  if (authenticatedSessions.has(sessionId)) {
    next();
  } else {
    res.status(401).send('Authentication required');
  }
}, serveStatic("uploads"));

// Endpoint to upload files (enhanced with multiple file support)
app.post("/upload", requireAuth, upload.array("file", 10), (req, res) => {

  
  if (!req.files || req.files.length === 0) {
    console.log('No files uploaded');
    return res.status(400).send("No files uploaded.");
  }
  
  const uploadedFiles = req.files.map(file => ({
    original: file.originalname,
    filename: file.filename,
    size: file.size
  }));
  
  console.log('Uploaded files:', uploadedFiles);
  res.send(uploadFiles(styles, script, uploadedFiles));
});

// QR code generation endpoint
app.get("/qr", requireAuth, async (_, res) => {
  try {
    const networkUrl = `http://${networkIP}:${PORT}`;
    const qrCodeDataURL = await QRCode.toDataURL(networkUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    res.json({ qrCode: qrCodeDataURL, url: networkUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});


// Login page
app.get("/login", (_, res) => {
  res.send(loginPage(styles));
});

// Authentication endpoint
app.post("/auth", (req, res) => {
  const { code } = req.body;

  if (code === ACCESS_CODE) { 
    const sessionId = Date.now().toString() + Math.random().toString(36);
    authenticatedSessions.add(sessionId);
    res.cookie('session', sessionId, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 }); // 24 hours
    res.redirect('/');
  } else {
    res.redirect('/login?error=1');
  }
});

// Home route with authentication
app.get("/", requireAuth, (req, res) => {
  const sessionId = req.headers.cookie?.split('session=')[1]?.split(';')[0];
  res.send(homePage(styles, script, networkIP, PORT, sessionId));
});

// Endpoint to list all uploaded files
app.get("/files", requireAuth, (_, res) => {
  const directoryPath = join(__dirname, "uploads");
  readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan files!");
    }
    
    
    let totalSize = 0;
    let processedFiles = 0;
    const fileDetails = [];
    
    if (files.length === 0) {
      return res.send(getFiles(script, styles));
    }
    
    files.forEach(file => {
      stat(join(directoryPath, file), (err, stats) => {
        if (!err) {
          totalSize += stats.size;
          fileDetails.push({ name: file, size: stats.size, date: stats.mtime });
        }
        processedFiles++;
        
        if (processedFiles === files.length) {
          fileDetails.sort((a, b) => b.date - a.date);
          
          const fileItems = fileDetails
            .map(file => `
              <div class="file-item">
                <div class="file-info">
                  <div class="file-icon">${getFileIcon(file.name)}</div>
                  <div class="file-details">
                    <h4 style="word-break: break-all; overflow-wrap: break-word; max-width: 300px;">${file.name}</h4>
                    <p class="file-size">${formatFileSize(file.size)} • ${new Date(file.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div class="file-actions" style="flex-shrink: 0;">
                  <a href="/uploads/${file.name}" class="btn file-btn btn-secondary" target="_blank">View</a>
                  <a href="/uploads/${file.name}" download class="btn file-btn btn-success">Download</a>
                  <form action="/delete" method="post" style="display:inline;">
                    <input type="hidden" name="filename" value="${file.name}">
                    <button type="submit" class="btn file-btn btn-danger" onclick="return confirm('Delete this file?')">Delete</button>
                  </form>
                </div>
              </div>`)
            .join("");

          res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>📂 File Manager</title>
              ${styles}
            </head>
            <body>
               <!-- <button id="toggle" class="toggle-btn">🌙 Dark</button> -->
              <div class="container">
                <h1>📂 File Manager</h1>
                
                <div class="stats">
                  <div class="stat-item">
                    <div class="stat-number">${files.length}</div>
                    <div>Files</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">${formatFileSize(totalSize)}</div>
                    <div>Total Size</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">${new Set(files.map(f => f.split('.').pop())).size}</div>
                    <div>File Types</div>
                  </div>
                </div>
                
                <div class="file-list">
                  ${fileItems}
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <a href="/" class="btn">Upload More</a>
                </div>
              </div>
              ${script}
              <script>
                function formatFileSize(bytes) {
                  if (bytes === 0) return '0 Bytes';
                  const k = 1024;
                  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                  const i = Math.floor(Math.log(bytes) / Math.log(k));
                  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
                }
              </script>
            </body>
            </html>
          `);
        }
      });
    });
  });
});

// Helper function for file size formatting
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function for file icons


// Text sharing endpoints
app.get("/text", requireAuth, (_, res) => {
  res.send(shareText(sharedText, styles, script));
});

app.post("/text", requireAuth, (req, res) => {
  const { content, language } = req.body;
  if (content && content.trim()) {
    sharedText = {
      content: content.trim(),
      language: language || 'text',
      timestamp: new Date()
    };
  }
  res.redirect('/text');
});

// Endpoint to delete a file
app.post("/delete", requireAuth, (req, res) => {
  const filePath = join(__dirname, "uploads", req.body.filename);
  unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send("Unable to delete file!");
    }
    res.redirect("/files");
  });
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\n\nServer shutting down...');
  console.log('All sessions destroyed');
  authenticatedSessions.clear();
  process.exit(0);
});

app.listen(PORT, () => {
  const localUrl = `http://localhost:${PORT}`;
  const networkUrl = `http://${networkIP}:${PORT}`;
  
  console.clear();
   // Generate QR code for the network URL
  qrcode.generate(networkUrl, { small: true }, (qrcode) => {
    console.log(qrcode);
    console.log('\n');
    console.log('Press Ctrl+C to stop the server');
    console.log('\n');
  });
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                          ║');
  console.log('║   FileShare server is running!                                        ║');
  console.log('║                                                                          ║');
  console.log(`║   Access Code:   ${ACCESS_CODE.padEnd(42)} ║`);
  console.log(`║   Local:            ${localUrl.padEnd(42)} ║`);
  console.log(`║   On Your Network:  ${networkUrl.padEnd(42)} ║`);
  console.log('║                                                                          ║');
  console.log('║   Enter the 5-digit code when prompted to access the file sharing app    ║');
  console.log('║                                                                          ║');
  console.log('╚══════════════════════════════════════════════════════════════════════════╝');
  console.log('\n');
  console.log('📱 To share files with mobile devices:');
  console.log('1. Connect both devices to the same network');
  console.log(`2. Scan the QR code above or visit ${networkUrl} on your mobile device`);
  console.log("3. Insert the above Access code to the password section")
  console.log('4. Upload and share files instantly!');

  
 
});                                                 
  
