const script = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Dark mode toggle
      const toggleButton = document.getElementById('toggle');
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' | 1 == 1 ) {
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
    });
  </script>
`;

export default script;