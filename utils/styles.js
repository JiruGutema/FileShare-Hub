const styles = `
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background:rgb(255, 255, 255);
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
      background:rgb(233, 233, 233);

      border-radius: 10px;
      padding: 30px;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    .container.dark {
      background: rgba(44, 62, 80, 0.95);
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
    .quick-access {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .quick-card {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 15px;
      padding: 25px;
      text-align: center;
      transition: all 0.3s ease;
      cursor: pointer;
      border: 2px solid transparent;
    }
    .dark .quick-card {
      background: rgba(52, 73, 94, 0.8);
    }
    .quick-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
      border-color: #667eea;
    }
    .quick-card-icon {
      font-size: 36px;
      margin-bottom: 15px;
      display: block;
    }
    .quick-card h3 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 18px;
    }
    .dark .quick-card h3 {
      color: #ecf0f1;
    }
    .quick-card p {
      margin: 0;
      font-size: 14px;
      opacity: 0.7;
    }
    .network-info {
      background: rgba(102, 126, 234, 0.1);
      border-radius: 15px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .dark .network-info {
      background: rgba(52, 152, 219, 0.1);
    }
    .network-url {
      font-family: 'Courier New', monospace;
      background: rgba(0, 0, 0, 0.1);
      padding: 8px 15px;
      border-radius: 8px;
      margin: 5px;
      display: inline-block;
      font-weight: bold;
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
    .qr-section {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 15px;
      padding: 25px;
      margin: 20px 0;
      text-align: center;
    }
    .dark .qr-section {
      background: rgba(52, 73, 94, 0.8);
    }
    .qr-code {
      margin: 20px 0;
      display: inline-block;
      padding: 15px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    .url-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 15px;
      flex-wrap: wrap;
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
      .url-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  </style>
`;

export default styles;