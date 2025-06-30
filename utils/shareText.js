function shareText(sharedText, script, styles) {
  return  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Text Sharing</title>
      ${styles}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/markdown.min.js"></script>
    </head>
    <body>
      <!-- <button id="toggle" style="color: black; background: rgba(255, 255, 255, 0.3) !important; " class="toggle-btn">🌙 Dark</button> -->
      <div class="container">
        <h1>Text Sharing</h1>
        
        <form action="/text" method="post" style="margin-bottom: 30px;">
          <div style="margin-bottom: 15px;">
            <label for="language">Language:</label>
            <select name="language" id="language" style="margin-left: 10px; padding: 5px;">
              <option value="text">Plain Text</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
              <option value="sql">SQL</option>
              <option value="bash">Bash</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>
          <textarea id="textContent" name="content" placeholder="Paste your text or code here..." style="width: 100%; height: 300px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; font-family: monospace; font-size: 14px;" required></textarea>
          <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button type="submit" class="btn">Share Data</button>
          </div>
        </form>
        
        ${sharedText.content ? `
          <div style="margin-bottom: 20px;">
          <h3>Shared Content (${sharedText.language}):</h3>
          <div style="margin: 15px 0; display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="copySharedText()">Copy</button>
            <button class="btn btn-secondary" onclick="saveSharedAsFile()">Save As</button>
          </div>
            <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 15px 0;">
              <pre><code id="sharedCode" class="language-${sharedText.language}">${sharedText.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
            </div>
            <small style="color: #666;">Saved: ${new Date(sharedText.timestamp).toLocaleString()}</small>
          </div>
        ` : '<p style="text-align: center; color: #666; margin: 40px 0;">No text shared yet</p>'}
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="/" class="btn btn-secondary">Home</a>
          <button onclick="location.reload()" class="btn btn-secondary">Refresh</button>
        </div>
      </div>
      ${script}
      <script>
        if (window.hljs) {
          // Register markdown language if available
          if (window.hljs.getLanguage && !window.hljs.getLanguage('markdown') && window.hljs.registerLanguage) {
            fetch('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/markdown.min.js')
              .then(res => res.text())
              .then(eval)
              .then(() => {
                hljs.registerLanguage('markdown', window.hljsDefineMarkdown);
                hljs.highlightAll();
              });
          } else {
            hljs.highlightAll();
          }
        }
        
        function copyText() {
          const textarea = document.getElementById('textContent');
          textarea.select();
          navigator.clipboard.writeText(textarea.value).then(() => {
            showNotification('Text copied!');
          }).catch(() => {
            document.execCommand('copy');
            showNotification('Text copied!');
          });
        }
        
        async function pasteText() {
          try {
            const text = await navigator.clipboard.readText();
            document.getElementById('textContent').value = text;
            showNotification('Text pasted!');
          } catch (err) {
            showNotification('Paste failed. Use Ctrl+V', 'error');
          }
        }
        
        function saveAsFile() {
          const content = document.getElementById('textContent').value;
          const language = document.getElementById('language').value;
          if (!content.trim()) {
            showNotification('No content to save!', 'error');
            return;
          }
          const ext = getFileExtension(language);
          const blob = new Blob([content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'text.' + ext;
          a.click();
          URL.revokeObjectURL(url);
          showNotification('File downloaded!');
        }
        
        function copySharedText() {
          const code = document.getElementById('sharedCode');
          if (code) {
            const text = code.textContent;
            navigator.clipboard.writeText(text).then(() => {
              showNotification('Shared text copied!');
            }).catch(() => {
              showNotification('Copy failed!', 'error');
            });
          }
        }
        
        function saveSharedAsFile() {
          const code = document.getElementById('sharedCode');
          if (code) {
            const content = code.textContent;
            const language = '${sharedText.language || 'text'}';
            const ext = getFileExtension(language);
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'shared.' + ext;
            a.click();
            URL.revokeObjectURL(url);
            showNotification('File downloaded!');
          }
        }
        
        function getFileExtension(language) {
          const extensions = {
            javascript: 'js', python: 'py', java: 'java', cpp: 'cpp',
            html: 'html', css: 'css', json: 'json', sql: 'sql', bash: 'sh', markdown: 'md'
          };
          return extensions[language] || 'txt';
        }
        
        function showNotification(message, type = 'success') {
          const notification = document.createElement('div');
          notification.style.cssText = 
            'position: fixed; top: 20px; right: 20px; z-index: 1000;' +
            'padding: 12px 20px; border-radius: 8px; color: white;' +
            'background: ' + (type === 'error' ? '#e74c3c' : '#27ae60') + ';' +
            'box-shadow: 0 4px 12px rgba(0,0,0,0.2);';
          notification.textContent = message;
          document.body.appendChild(notification);
          setTimeout(() => {
            notification.remove();
          }, 3000);
        }
      </script>
    </body>
    </html>
  `;}

  export default shareText;