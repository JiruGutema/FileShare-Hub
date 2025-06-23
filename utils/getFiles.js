function getFiles(script, styles){
    return `
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
          `;

}
export default getFiles;