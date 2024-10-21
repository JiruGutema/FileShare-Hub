import express, { static as serveStatic } from "express";
import multer, { diskStorage } from "multer";
import { extname } from "path";
import { readdir, unlink } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { stderr, stdout } from "process";
import os from "os";
const platform = os.platform();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 1234;

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
      overflow-x: hidden;
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
    .uploadMore {
    background: dodgerblue;
    color: white;
    textdecoration: none;
    
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
          width: 99.99%;
          overflow-x: hidden;
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
        <a href="/" class="uploadMore" >Upload more files</a>
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
        <a href="/files" class="uploadMore">View Uploaded Files</a>
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
          <a class="uploadMore" href="/">Upload more files</a>
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
