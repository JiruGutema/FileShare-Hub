import express, { static as serveStatic } from "express";
import multer, { diskStorage } from "multer";
import { extname } from "path";
import { readdir, unlink, stat } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { stderr, stdout } from "process";
// import req
``
import os from "os";
const platform = os.platform();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 1234;

// Set up storage with multer
// check if the uploads exists if not create a directory


const storage = diskStorage({
  destination: (_, file, cb) => {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + extname(file.originalname)); // Append timestamp to the file name
  },
});

const upload = multer({ storage });

// Serve static files from the uploads directory
app.use("/uploads", serveStatic("uploads"));

// CSS styles
const styles = `
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
      padding: 20px;
      min-height: 100vh;
      transition: all 0.3s ease;
      color: #333;
    }
    body.dark {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: #ecf0f1;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    .container.dark {
      background: rgba(44, 62, 80, 0.95);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    h1, h2 {
      text-align: center;
      margin-bottom: 30px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }
    .dark h1, .dark h2 {
      background: linear-gradient(45deg, #3498db, #e74c3c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .upload-area {
      border: 3px dashed #667eea;
      border-radius: 15px;
      padding: 40px;
      text-align: center;
      transition: all 0.3s ease;
      cursor: pointer;
      background: rgba(102, 126, 234, 0.05);
      margin-bottom: 20px;
    }
    .upload-area:hover, .upload-area.dragover {
      border-color: #764ba2;
      background: rgba(118, 75, 162, 0.1);
      transform: translateY(-2px);
    }
    .dark .upload-area {
      border-color: #3498db;
      background: rgba(52, 152, 219, 0.1);
    }
    .dark .upload-area:hover, .dark .upload-area.dragover {
      border-color: #e74c3c;
      background: rgba(231, 76, 60, 0.1);
    }
    .upload-icon {
      font-size: 48px;
      margin-bottom: 15px;
      color: #667eea;
    }
    .dark .upload-icon {
      color: #3498db;
    }
    input[type="file"] {
      display: none;
    }
    .file-input-label {
      display: inline-block;
      padding: 12px 30px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      margin-top: 15px;
    }
    .file-input-label:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    .btn {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      text-decoration: none;
      display: inline-block;
      margin: 5px;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    .btn-secondary {
      background: linear-gradient(45deg, #95a5a6, #7f8c8d);
    }
    .btn-danger {
      background: linear-gradient(45deg, #e74c3c, #c0392b);
    }
    .btn-success {
      background: linear-gradient(45deg, #27ae60, #2ecc71);
    }
    .progress-bar {
      width: 100%;
      height: 6px;
      background: #ecf0f1;
      border-radius: 3px;
      overflow: hidden;
      margin: 20px 0;
      display: none;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(45deg, #667eea, #764ba2);
      width: 0%;
      transition: width 0.3s ease;
    }
    .file-list {
      margin-top: 30px;
    }
    .file-item {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 15px;
      padding: 20px;
      margin: 15px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    .dark .file-item {
      background: rgba(52, 73, 94, 0.8);
    }
    .file-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    .file-info {
      display: flex;
      align-items: center;
      flex: 1;
    }
    .file-icon {
      font-size: 24px;
      margin-right: 15px;
      width: 40px;
      text-align: center;
    }
    .file-details h4 {
      margin: 0 0 5px 0;
      color: #2c3e50;
    }
    .dark .file-details h4 {
      color: #ecf0f1;
    }
    .file-size {
      font-size: 12px;
      color: #7f8c8d;
      margin: 0;
    }
    .file-actions {
      display: flex;
      gap: 10px;
    }
    .toggle-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 10px 15px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      font-weight: 600;
    }
    .toggle-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }
    .stats {
      display: flex;
      justify-content: space-around;
      margin: 30px 0;
      padding: 20px;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 15px;
    }
    .dark .stats {
      background: rgba(52, 152, 219, 0.1);
    }
    .stat-item {
      text-align: center;
    }
    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #667eea;
    }
    .dark .stat-number {
      color: #3498db;
    }
    .notification {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #27ae60;
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      display: none;
    }
    .notification.error {
      background: #e74c3c;
    }
    @media (max-width: 768px) {
      .container {
        margin: 10px;
        padding: 20px;
        border-radius: 15px;
      }
      .file-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
      .file-actions {
        width: 100%;
        justify-content: center;
      }
      .stats {
        flex-direction: column;
        gap: 15px;
      }
      .toggle-btn {
        position: relative;
        top: auto;
        right: auto;
        margin: 20px auto;
        display: block;
      }
    }
  </style>
`;

// Enhanced JavaScript with drag-and-drop and notifications
const script = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Dark mode toggle
      const toggleButton = document.getElementById('toggle');
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.querySelector('.container')?.classList.add('dark');
      }
      
      toggleButton?.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        document.querySelector('.container')?.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toggleButton.textContent = isDark ? '☀️ Light' : '🌙 Dark';
      });
      
      // Update toggle button text
      if (toggleButton) {
        toggleButton.textContent = document.body.classList.contains('dark') ? '☀️ Light' : '🌙 Dark';
      }
      
      // Drag and drop functionality
      const uploadArea = document.querySelector('.upload-area');
      const fileInput = document.getElementById('fileInput');
      
      if (uploadArea && fileInput) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          uploadArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
          e.preventDefault();
          e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
          uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
          uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
        });
        
        uploadArea.addEventListener('drop', handleDrop, false);
        uploadArea.addEventListener('click', () => fileInput.click());
        
        function handleDrop(e) {
          const dt = e.dataTransfer;
          const files = dt.files;
          fileInput.files = files;
          handleFiles(files);
        }
        
        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
        
        function handleFiles(files) {
          if (files.length > 0) {
            document.querySelector('.upload-text').textContent = 
              files.length === 1 ? files[0].name : files.length + ' files selected';
          }
        }
      }
      
      // File upload with progress
      const uploadForm = document.getElementById('uploadForm');
      if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(uploadForm);
          const progressBar = document.querySelector('.progress-bar');
          const progressFill = document.querySelector('.progress-fill');
          
          if (progressBar) {
            progressBar.style.display = 'block';
            progressFill.style.width = '0%';
          }
          
          try {
            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', (e) => {
              if (e.lengthComputable && progressFill) {
                const percentComplete = (e.loaded / e.total) * 100;
                progressFill.style.width = percentComplete + '%';
              }
            });
            
            xhr.onload = () => {
              if (xhr.status === 200) {
                showNotification('File uploaded successfully!', 'success');
                setTimeout(() => window.location.href = '/files', 1500);
              } else {
                showNotification('Upload failed!', 'error');
              }
              if (progressBar) progressBar.style.display = 'none';
            };
            
            xhr.open('POST', '/upload');
            xhr.send(formData);
          } catch (error) {
            showNotification('Upload failed!', 'error');
            if (progressBar) progressBar.style.display = 'none';
          }
        });
      }
      
      // Notification system
      function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification' + (type === 'error' ? ' error' : '');
        notification.textContent = message;
        document.body.appendChild(notification);
        notification.style.display = 'block';
        
        setTimeout(() => {
          notification.style.display = 'none';
          document.body.removeChild(notification);
        }, 3000);
      }
      
      // File size formatter
      function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }
      
      // File icon helper
      function getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const icons = {
          pdf: '📄', doc: '📝', docx: '📝', txt: '📄',
          jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', svg: '🖼️',
          mp4: '🎥', avi: '🎥', mov: '🎥', mkv: '🎥',
          mp3: '🎵', wav: '🎵', flac: '🎵',
          zip: '📦', rar: '📦', '7z': '📦',
          js: '⚡', html: '🌐', css: '🎨', json: '📋'
        };
        return icons[ext] || '📁';
      }
      
      // Apply file icons
      document.querySelectorAll('.file-icon').forEach(icon => {
        const filename = icon.nextElementSibling?.querySelector('h4')?.textContent;
        if (filename) {
          icon.textContent = getFileIcon(filename);
        }
      });
    });
  </script>
`;

// Endpoint to upload files (enhanced with multiple file support)
app.post("/upload", upload.array("file", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  
  const uploadedFiles = req.files.map(file => ({
    original: file.originalname,
    filename: file.filename,
    size: file.size
  }));
  
  res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>✅ Upload Success</title>
      ${styles}
    </head>
    <body>
      <button id="toggle" class="toggle-btn">🌙 Dark</button>
      <div class="container">
        <h1>✅ Upload Successful!</h1>
        <div style="text-align: center; margin: 30px 0;">
          <div style="font-size: 64px; margin-bottom: 20px;">🎉</div>
          <p style="font-size: 18px; opacity: 0.8;">${uploadedFiles.length} file(s) uploaded successfully</p>
        </div>
        
        <div class="file-list">
          ${uploadedFiles.map(file => `
            <div class="file-item">
              <div class="file-info">
                <div class="file-icon">📁</div>
                <div class="file-details">
                  <h4>${file.original}</h4>
                  <p class="file-size">${formatFileSize(file.size)}</p>
                </div>
              </div>
              <div class="file-actions">
                <a href="/uploads/${file.filename}" class="btn btn-secondary" target="_blank">👁️ View</a>
                <a href="/uploads/${file.filename}" download class="btn btn-success">⬇️ Download</a>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="/" class="btn">📤 Upload More</a>
          <a href="/files" class="btn btn-secondary">📂 View All Files</a>
        </div>
      </div>
      ${script}
    </body>
    </html>`
  );
});

// Home route
app.get("/", (_, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>📁 File Share Hub</title>
      ${styles}
    </head>
    <body>
      <button id="toggle" class="toggle-btn">🌙 Dark</button>
      <div class="container">
        <h1>📁 File Share Hub</h1>
        <p style="text-align: center; margin-bottom: 30px; opacity: 0.8;">Drag & drop files or click to upload</p>
        
        <form id="uploadForm" action="/upload" method="post" enctype="multipart/form-data">
          <div class="upload-area">
            <div class="upload-icon">☁️</div>
            <div class="upload-text">Drop files here or click to browse</div>
            <input type="file" id="fileInput" name="file" required multiple>
            <label for="fileInput" class="file-input-label">Choose Files</label>
          </div>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <button type="submit" class="btn">🚀 Upload Files</button>
        </form>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="/files" class="btn btn-secondary">📂 View All Files</a>
        </div>
      </div>
      ${script}
    </body>
    </html>
  `);
});

// Endpoint to list all uploaded files
app.get("/files", (_, res) => {
  const directoryPath = join(__dirname, "uploads");
  readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan files!");
    }
    
    
    let totalSize = 0;
    let processedFiles = 0;
    const fileDetails = [];
    
    if (files.length === 0) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>📂 File Manager</title>
          ${styles}
        </head>
        <body>
          <button id="toggle" class="toggle-btn">🌙 Dark</button>
          <div class="container">
            <h1>📂 File Manager</h1>
            <div style="text-align: center; padding: 60px 20px;">
              <div style="font-size: 64px; margin-bottom: 20px;">📭</div>
              <h3>No files uploaded yet</h3>
              <p style="opacity: 0.7; margin-bottom: 30px;">Start by uploading your first file!</p>
              <a href="/" class="btn">📤 Upload Files</a>
            </div>
          </div>
          ${script}
        </body>
        </html>
      `);
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
                  <div class="file-icon">📁</div>
                  <div class="file-details">
                    <h4>${file.name}</h4>
                    <p class="file-size">${formatFileSize(file.size)} • ${new Date(file.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div class="file-actions">
                  <a href="/uploads/${file.name}" class="btn btn-secondary" target="_blank">👁️ View</a>
                  <a href="/uploads/${file.name}" download class="btn btn-success">⬇️ Download</a>
                  <form action="/delete" method="post" style="display:inline;">
                    <input type="hidden" name="filename" value="${file.name}">
                    <button type="submit" class="btn btn-danger" onclick="return confirm('Delete this file?')">🗑️ Delete</button>
                  </form>
                </div>
              </div>`
            ).join("");
          
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
              <button id="toggle" class="toggle-btn">🌙 Dark</button>
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
                  <a href="/" class="btn">📤 Upload More</a>
                  <button onclick="location.reload()" class="btn btn-secondary">🔄 Refresh</button>
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

// Endpoint to delete a file
app.post("/delete", express.urlencoded({ extended: true }), (req, res) => {
  const filePath = join(__dirname, "uploads", req.body.filename);
  unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send("Unable to delete file!");
    }
    res.redirect("/files");
  });
});

app.listen(PORT, () => {
  setTimeout(() => {
    console.log(
      "**********************************************************************************"
    );
  }, 0);

  if (platform === "linux") {
    // Check if it's Android
    const isAndroid = os.release().includes("android");
    if (isAndroid) {
      exec("ifconfig", (error, stdout) => {
        if (error) {
          console.error(`Error executing echo: ${error.message}`);
          return;
        }
        console.log(`Command1 Output: ${stdout}`);
      });
    } else {
      exec("ifconfig", (error, stdout) => {
        if (error) {
          console.error(`Error executing command2: ${error.message}`);
          return;
        }
        console.log(`Command2 Output: ${stdout}`);
      });
    }
  } else if (platform === "win32") {
    exec("ipconfig", (error, stdout) => {
      if (error) {
        console.error(`Error executing command2: ${error.message}`);
        return;
      }
      console.log(`Command2 Output: ${stdout}`);
    });
  } else {
    console.log(
      `If your machine's OS is not in [Linux, Android, MacOS, Windows], please try to get your machines ip adress manually. then use that ip address to connect to your server for file sharing. http://your-machine's-ip:${PORT}`
    );
  }
  setTimeout(() => {
    console.log(
      "**********************************************************************************"
    );
    console.log(`Server is running on http://localhost:${PORT} \n`);
    console.log(
      `for sharing file locally, \nplease follow the following step, \n \n1. make sure you are connected to same network with both of your device. \n\n2. after connecting to same network, take a ip address of your machine. please, consider looking it in the above log, it starts with 'inet' if you are on linux. or go to settings and look up for network section. \n\n3. run a apps on your machine. (it doesn't matter which one). \n\n4. go to your browser on your other device, and enter the following to you machine. http://your-machine's-ip(the one the app is running on):{PORT} `
    );
  }, 0);
});
