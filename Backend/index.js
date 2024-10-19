import express, { static as serveStatic } from "express";
import multer, { diskStorage } from "multer";
import { extname } from "path";
import { readdir, unlink } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3005;

// Set up storage with multer
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
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      transition: background-color 0.3s, color 0.3s;
      position: relative;
    }
    body.dark {
      background-color: #222;
      color: #f4f4f4;
    }
    h2 {
      color: #35424a;
    }
    h2.dark {
      color: #f4f4f4;
    }
    form {
      background: white;
      padding: 20px;
      border-radius: 5px;

      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: background-color 0.3s;
    }
    form.dark {
      background: #333;
    }
    input[type="file"] {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 5px;
    }
    button {
      background: #35424a;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      font-size: 20px;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background: #1a202c;
    }
    a {
      margin-top: 20px;
      text-decoration: none;
      padding: 10px 20px;
      margin-top: 20px;
      color: lightseagreen;
    
      border-radius: 5px;
margin: auto;
    }
      .uploaded {
        background: dodgerblue;
            color: white;
      }
    a:hover {
      text-decoration: underline;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s;
    }
    li.dark {
      background: #444;
    }
    form[action="/delete"] {
      margin-left: 10px;
    }
    #toggle {
      position: absolute;
      top: 20px;
      right: 10%;
      cursor: pointer;
      padding: 10px 15px;
      background-color: #35424a;
      color: white;
      border: none;
      border-radius: 5px;
      transition: background 0.3s;
    }
      .uploaded {
        background: dodgerblue;
            color: white;
      }
    .container {
      width: 50%;
      margin: auto;
      text-align: center}
       
    #toggle:hover {
      background-color: #1a202c;
    }

      @media (max-width: 768px) {
      body {
        padding: 20px;
        width: 100%;
        height: 99vh;
        font-size: 20px;
        text-align: center;
      }
      .container {
          width: 80%;
          height: 100%;
          fons-size: 30px;
          margin-top: 50px ;
      input[type="file"] {
      font-size: 20px;
        }
        
  </style>
`;

// JavaScript for toggling dark mode
const script = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const toggleButton = document.getElementById('toggle');
      toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const form = document.querySelector('form');
        const headings = document.querySelectorAll('h2');
        const listItems = document.querySelectorAll('li');
        form.classList.toggle('dark');
        headings.forEach(h => h.classList.toggle('dark'));
        listItems.forEach(li => li.classList.toggle('dark'));
      });
    });
  </script>
`;

// Endpoint to upload files
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>File Upload</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <h2>File uploaded successfully!</h2>
        <p><a href="/uploads/${req.file.filename}">${req.file.originalname}</a></p>
        <button id="toggle">Dark Mode</button>
        <a href="/">Upload more files</a>
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
      <title>File Upload</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <h2>File Upload</h2>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <input type="file" name="file" required>
          <button type="submit">Upload</button>
        </form>
        <button id="toggle">Dark Mode</button>
        <a href="/files">View Uploaded Files</a>
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
    const fileLinks = files
      .map(
        (file) => `
          <li>
            <div >
              <a href="/uploads/${file}">${file}</a>
              <a href="/uploads/${file}" download>
                <button>Download</button>
              </a>
            </div>
            <form action="/delete" method="post" style="display:inline;">
              <input type="hidden" name="filename" value="${file}">
              <button type="submit">Delete</button>
            </form>
          </li>`
      )
      .join("");
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Uploaded Files</title>
        ${styles}
      </head>
      <body>
        <div class="container">
          <h2>Uploaded Files</h2>
          <ul>${fileLinks}</ul>
          <button id="toggle">Dark Mode</button>
          <a class="uploaded" href="/">Upload more files</a>
        </div>
        ${script}
      </body>
      </html>
    `);
  });
});

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
  console.log(`Server is running on http://localhost:${PORT}`);
});
