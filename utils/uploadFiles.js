import getFileIcon from './getFileIcon.js';
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}



function uploadFiles(styles, script, uploadedFiles) {
    return  `<!DOCTYPE html>
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
                <div class="file-icon">${getFileIcon(file.original)}</div>
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
}

export default uploadFiles;