function homePage(styles, script, networkIP, PORT) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FileShare Hub</title>
      ${styles}
    </head>
    <body>
      <!-- <button id="toggle" class="toggle-btn">🌙 Dark</button> -->
      <div class="container">
        <h1>🚀 FileShare Hub</h1>
        <p style="text-align: center; margin-bottom: 20px; opacity: 0.8;">Share files instantly across devices</p>
        
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
        
        <div class="qr-section">
          <h3>📱 Mobile Access</h3>
          <p style="opacity: 0.8; margin-bottom: 20px;">Scan QR code or copy URL to access from mobile devices</p>
          <div id="qrCode" class="qr-code">Loading QR Code...</div>
          <div class="network-url" id="networkUrl">Network: http://${networkIP}:${PORT}</div>
          <div class="url-actions">
            <button class="btn btn-secondary" onclick="copyToClipboard(document.getElementById('networkUrl').textContent.split(': ')[1])">Copy URL</button>
          </div>
        </div>
        
        <div class="quick-access">
          <div class="quick-card" onclick="window.location.href='/files'">
            <span class="quick-card-icon">📂</span>
            <h3>File Manager</h3>
            <p>View & manage files</p>
          </div>
          <div class="quick-card" onclick="window.location.href='/text'">
            <span class="quick-card-icon">📝</span>
            <h3>Text Sharing</h3>
            <p>Share code & text</p>
          </div>
          
        </div>
      </div>
      ${script}
      <script>
        // Load QR code on page load
        async function loadQRCode() {
          try {
            const response = await fetch('/qr', {
              credentials: 'include'
            });
            if (response.ok) {
              const data = await response.json();
              document.getElementById('qrCode').innerHTML = '<img src="' + data.qrCode + '" alt="QR Code" style="max-width: 200px;">';
            } else {
              document.getElementById('qrCode').textContent = 'Authentication required';
            }
          } catch (error) {
            document.getElementById('qrCode').textContent = 'Failed to load QR code';
          }
        }
        
        // Generate new QR code
        async function generateNewQR() {
          document.getElementById('qrCode').textContent = 'Generating new QR code...';
          try {
            await loadQRCode();
            showNotification('New QR code generated!', 'success');
          } catch (error) {
            showNotification('Failed to generate QR code', 'error');
          }
        }
        
        function copyToClipboard(text) {
          navigator.clipboard.writeText(text).then(() => {
            showNotification('URL copied to clipboard!', 'success');
          }).catch(() => {
            showNotification('Failed to copy URL', 'error');
          });
        }
        
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
        
        // Load QR code when page loads
        document.addEventListener('DOMContentLoaded', loadQRCode);
      </script>
    </body>
    </html>
  `;
}
export default homePage;