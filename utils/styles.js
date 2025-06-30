const styles = `
  <style>
    /* CSS Custom Properties for better maintainability */
    :root {
      /* Color Palette */
      --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      --primary-color: #667eea;
      --primary-dark: #764ba2;
      --secondary-gradient: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
      --success-gradient: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
      --danger-gradient: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      
      /* Light Theme Colors */
      --bg-primary: #ffffff;
      --bg-secondary: #f8f9fa;
      --bg-surface: rgba(233, 233, 233, 0.8);
      --bg-card: rgba(255, 255, 255, 0.9);
      --bg-overlay: rgba(102, 126, 234, 0.05);
      --bg-overlay-hover: rgba(118, 75, 162, 0.1);
      
      --text-primary: #2c3e50;
      --text-secondary: #7f8c8d;
      --text-muted: rgba(44, 62, 80, 0.7);
      
      --border-color: #e9ecef;
      --border-focus: var(--primary-color);
      
      /* Shadows */
      --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
      --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
      --shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.2);
      --shadow-xl: 0 15px 35px rgba(0, 0, 0, 0.25);
      
      /* Spacing */
      --spacing-xs: 0.5rem;
      --spacing-sm: 1rem;
      --spacing-md: 1.5rem;
      --spacing-lg: 2rem;
      --spacing-xl: 3rem;
      
      /* Border Radius */
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 24px;
      --radius-full: 50px;
      
      /* Transitions */
      --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      
      /* Typography */
      --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      
      /* Z-index scale */
      --z-dropdown: 1000;
      --z-sticky: 1020;
      --z-fixed: 1030;
      --z-modal: 1040;
      --z-popover: 1050;
      --z-tooltip: 1060;
    }

    /* Dark Theme */
    [data-theme="dark"] {
      --primary-gradient: linear-gradient(135deg, #3498db 0%, #e74c3c 100%);
      --primary-color: #3498db;
      --primary-dark: #e74c3c;
      
      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --bg-surface: rgba(44, 62, 80, 0.95);
      --bg-card: rgba(52, 73, 94, 0.9);
      --bg-overlay: rgba(52, 152, 219, 0.1);
      --bg-overlay-hover: rgba(231, 76, 60, 0.1);
      
      --text-primary: #f1f5f9;
      --text-secondary: #94a3b8;
      --text-muted: rgba(241, 245, 249, 0.7);
      
      --border-color: #334155;
      --border-focus: var(--primary-color);
      
      --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.5);
      --shadow-xl: 0 15px 35px rgba(0, 0, 0, 0.6);
    }

    /* Auto dark mode based on system preference */
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
        --primary-gradient: linear-gradient(135deg, #3498db 0%, #e74c3c 100%);
        --primary-color: #3498db;
        --primary-dark: #e74c3c;
        
        --bg-primary: #0f172a;
        --bg-secondary: #1e293b;
        --bg-surface: rgba(44, 62, 80, 0.95);
        --bg-card: rgba(52, 73, 94, 0.9);
        --bg-overlay: rgba(52, 152, 219, 0.1);
        --bg-overlay-hover: rgba(231, 76, 60, 0.1);
        
        --text-primary: #f1f5f9;
        --text-secondary: #94a3b8;
        --text-muted: rgba(241, 245, 249, 0.7);
        
        --border-color: #334155;
        --border-focus: var(--primary-color);
        
        --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
        --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
        --shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.5);
        --shadow-xl: 0 15px 35px rgba(0, 0, 0, 0.6);
      }
    }

    /* Reset and Base Styles */
    *, *::before, *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      -webkit-text-size-adjust: 100%;
    }

    body {
      font-family: var(--font-family);
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      margin: 0;
      padding: var(--spacing-lg);
      min-height: 100vh;
      transition: background-color var(--transition-normal), color var(--transition-normal);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Focus management for accessibility */
    :focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    :focus:not(:focus-visible) {
      outline: none;
    }

    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: var(--spacing-md);
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      text-align: center;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: var(--spacing-xl);
    }

    h2 {
      font-size: clamp(1.5rem, 4vw, 2rem);
      text-align: center;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      margin-bottom: var(--spacing-md);
      color: var(--text-muted);
    }

    /* Layout Components */
    .container {
      max-width: min(800px, 100% - 2rem);
      margin: 0 auto;
      background: var(--bg-surface);
      border-radius: var(--radius-sm);
      padding: var(--spacing-xl);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-lg);
      transition: all var(--transition-normal);
      animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Login Container */
    .login-container {
      background: var(--bg-card);
      border-radius: var(--radius-sm);
      padding: var(--spacing-xl);
      box-shadow: var(--shadow-xl);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      text-align: center;
      max-width: 420px;
      width: 100%;
      animation: fadeInScale 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .login-container h1 {
      color: var(--text-primary);
      margin-bottom: var(--spacing-lg);
      font-size: 2rem;
    }

    .login-container p {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-lg);
    }

    /* Form Elements */
    .code-input {
      font-size: 1.5rem;
      padding: var(--spacing-md);
      border: 2px solid var(--border-color);
      border-radius: var(--radius-sm);
      text-align: center;
      width: 200px;
      margin: var(--spacing-lg) 0;
      letter-spacing: 0.3em;
      background: var(--bg-primary);
      color: var(--text-primary);
      font-family: var(--font-mono);
      transition: all var(--transition-fast);
    }

    .code-input:focus {
      border-color: var(--border-focus);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      outline: none;
    }

    .code-input::placeholder {
      color: var(--text-secondary);
      opacity: 0.6;
    }

    /* Upload Area */
    .upload-area {
      border: 3px dashed var(--primary-color);
      border-radius: var(--radius-sm);
      padding: var(--spacing-xl);
      text-align: center;
      transition: all var(--transition-normal);
      cursor: pointer;
      background: var(--bg-overlay);
      margin-bottom: var(--spacing-lg);
      position: relative;
      overflow: hidden;
    }

    .upload-area::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s;
    }

    .upload-area:hover::before {
      left: 100%;
    }

    .upload-area:hover,
    .upload-area.dragover {
      border-color: var(--primary-dark);
      background: var(--bg-overlay-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .upload-icon {
      font-size: 3rem;
      margin-bottom: var(--spacing-md);
      color: var(--primary-color);
      transition: transform var(--transition-normal);
    }

    .upload-area:hover .upload-icon {
      transform: scale(1.1);
    }

    /* Quick Access Grid */
    .quick-access {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-lg);
      margin: var(--spacing-xl) 0;
    }

    .quick-card {
      background: var(--bg-card);
      border-radius: var(--radius-sm);
      padding: var(--spacing-lg);
      text-align: center;
      transition: all var(--transition-normal);
      cursor: pointer;
      border: 2px solid transparent;
      box-shadow: var(--shadow-sm);
      position: relative;
      overflow: hidden;
    }

    .quick-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--primary-gradient);
      opacity: 0;
      transition: opacity var(--transition-normal);
      z-index: -1;
    }

    .quick-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
      border-color: var(--primary-color);
      color: white;
    }

    .quick-card:hover::before {
      opacity: 0.1;
    }

    .quick-card:hover .quick-card-icon {
      transform: scale(1.2);
    }

    .quick-card:hover h3,
    .quick-card:hover p {
      color: white;
    }

    .quick-card-icon {
      font-size: 2.25rem;
      margin-bottom: var(--spacing-md);
      display: block;
      transition: transform var(--transition-normal);
    }

    .quick-card h3 {
      margin: 0 0 var(--spacing-sm) 0;
      color: var(--text-primary);
      font-size: 1.125rem;
      transition: color var(--transition-normal);
    }

    .quick-card p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
      transition: color var(--transition-normal);
    }

    /* Network Info */
    .network-info {
      background: var(--bg-overlay);
      border-radius: var(--radius-sm);
      padding: var(--spacing-lg);
      margin: var(--spacing-lg) 0;
      text-align: center;
      border: 1px solid var(--border-color);
    }

    .network-url {
      font-family: var(--font-mono);
      background: var(--bg-primary);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-sm);
      margin: var(--spacing-xs);
      display: inline-block;
      font-weight: 600;
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      word-break: break-all;
    }

    /* Buttons */
    .btn {
      background: var(--primary-gradient);
      color: white;
      border: none;
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--radius-full);
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-normal);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);
      margin: var(--spacing-xs);
      position: relative;
      overflow: hidden;
      min-height: 44px; /* Accessibility: minimum touch target */
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .btn:hover::before {
      left: 100%;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .btn-secondary {
      background: var(--secondary-gradient);
    }

    .btn-danger {
      background: var(--danger-gradient);
    }

    .btn-success {
      background: var(--success-gradient);
    }

    /* File Input */
    input[type="file"] {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .file-input-label {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-lg);
      background: var(--primary-gradient);
      color: white;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: all var(--transition-normal);
      font-weight: 600;
      margin-top: var(--spacing-md);
      min-height: 44px;
    }

    .file-input-label:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    /* Progress Bar */
    .progress-bar {
      width: 100%;
      height: 8px;
      background: var(--bg-secondary);
      border-radius: var(--radius-sm);
      overflow: hidden;
      margin: var(--spacing-lg) 0;
      display: none;
    }

    .progress-fill {
      height: 100%;
      background: var(--primary-gradient);
      width: 0%;
      transition: width var(--transition-normal);
      border-radius: var(--radius-sm);
    }

    /* File List */
    .file-list {
      margin-top: var(--spacing-xl);
    }

    .file-item {
      background: var(--bg-card);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all var(--transition-normal);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      margin: 5px 10px !important;

    }

    .file-item:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .file-info {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0; /* Allow text truncation */
    }

    .file-icon {
      font-size: 1.5rem;
      margin-right: var(--spacing-md);
      width: 40px;
      text-align: center;
      flex-shrink: 0;
    }

    .file-details {
      min-width: 0;
      flex: 1;
    }

    .file-details h4 {
      margin: 0 0 var(--spacing-xs) 0;
      color: var(--text-primary);
      font-size: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .file-size {
      font-size: 0.75rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .file-actions {
      display: flex;
      gap: var(--spacing-sm);
      flex-shrink: 0;
    }

    /* Toggle Button */
    .toggle-btn {
      position: fixed;
      top: var(--spacing-lg);
      right: var(--spacing-lg);
      background: var(--bg-card);
      border: 2px solid var(--border-color);
      color: var(--text-primary);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: all var(--transition-normal);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      font-weight: 600;
      z-index: var(--z-fixed);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      box-shadow: var(--shadow-md);
      min-height: 44px;
    }

    .toggle-btn:hover {
      background: var(--primary-color);
      color: white;
      transform: scale(1.05);
      border-color: var(--primary-color);
    }

    /* Stats */
    .stats {
      display: flex;
      justify-content: space-around;
      margin: var(--spacing-xl) 0;
      padding: var(--spacing-lg);
      background: var(--bg-overlay);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      display: block;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-top: var(--spacing-xs);
    }

    /* Notifications */
    .notification {
      position: fixed;
      top: var(--spacing-lg);
      left: 50%;
      transform: translateX(-50%);
      background: var(--success-gradient);
      color: white;
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-lg);
      z-index: var(--z-tooltip);
      display: none;
      font-weight: 600;
      animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .notification.error {
      background: var(--danger-gradient);
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
textarea {
  background: #909FA0 !important;
  }
  .file-btn {
    padding:5px !important;
    border-radius: 5px !important;
    background: inherit !important;
    }

    /* QR Section */
    .qr-section {
      background: var(--bg-card);
      border-radius: var(--radius-sm);
      padding: var(--spacing-lg);
      margin: var(--spacing-lg) 0;
      text-align: center;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
    }

    .qr-code {
      margin: var(--spacing-lg) 0;
      display: inline-block;
      padding: var(--spacing-md);
      background: white;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }

    .qr-code img {
      display: block;
      max-width: 200px;
      height: auto;
      border-radius: var(--radius-sm);
    }

    .url-actions {
      display: flex;
      justify-content: center;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-md);
      flex-wrap: wrap;
    }

    /* Error Styles */
    .error {
      color: #e74c3c;
      margin-top: var(--spacing-md);
      font-weight: 500;
      text-align: center;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      body {
        padding: var(--spacing-md);
      }

      .container {
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
      }

      .login-container {
        padding: var(--spacing-lg);
        margin: var(--spacing-md);
      }

  

      .file-actions {
        width: 100%;
        justify-content: center;
      }

      .stats {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .toggle-btn {
        position: relative;
        top: auto;
        right: auto;
        margin: var(--spacing-lg) auto;
        display: flex;
      }

      .url-actions {
        flex-direction: column;
        align-items: center;
      }

      .code-input {
        width: 100%;
        max-width: 250px;
      }

      .quick-access {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: var(--spacing-md);
      }

      .login-container {
        padding: var(--spacing-md);
      }

      h1 {
        font-size: 1.75rem;
      }

      .btn {
        width: 100%;
        margin: var(--spacing-xs) 0;
      }

      .file-actions .btn {
        width: auto;
        flex: 1;
      }
    }

    /* Reduced motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      :root {
        --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.8);
        --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.8);
        --shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.8);
        --shadow-xl: 0 15px 35px rgba(0, 0, 0, 0.8);
      }
      
      .btn,
      .file-input-label {
        border: 2px solid currentColor;
      }
    }

    /* Print styles */
    @media print {
      .toggle-btn,
      .btn,
      .file-actions {
        display: none !important;
      }
      
      .container {
        box-shadow: none;
        background: white;
        color: black;
      }
    }
  </style>
`;

export default styles;