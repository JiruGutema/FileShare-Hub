function uploadPage(styles, script, networkIP, PORT) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Share Files - FileShare Hub</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <h1>📤 Share Files</h1>
        <p style="text-align: center; margin-bottom: 20px; opacity: 0.8;">Upload files to share across devices</p>
        
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
          <button type="submit" class="btn">Upload Files</button>
        </form>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="/" class="btn btn-secondary">Back to Home</a>
        </div>
      </div>
      ${script}
      <script>
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
        
        document.getElementById('uploadForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const formData = new FormData(this);
          const fileCount = formData.getAll('file').length;
          
          if (fileCount === 0) {
            showNotification('Please select files to upload', 'error');
            return;
          }
          
          try {
            const response = await fetch('/upload', {
              method: 'POST',
              body: formData,
              credentials: 'include'
            });
            
            if (response.ok) {
              showNotification(fileCount + ' file(s) uploaded successfully!', 'success');
              setTimeout(() => {
                window.location.href = '/files';
              }, 1500);
            } else {
              showNotification('Upload failed', 'error');
            }
          } catch (error) {
            showNotification('Upload failed', 'error');
          }
        });
      </script>
    </body>
    </html>
  `;
}
export default uploadPage;