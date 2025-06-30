const loginPage = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FileShare Access</title>
      <style>
        * { box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: white;
          margin: 0; padding: 20px; min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
        }
        .login-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 10px; padding: 40px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px); text-align: center;
          max-width: 400px; width: 100%;
        }
        h1 { margin-bottom: 30px; color: #2c3e50; }
        .code-input {
          font-size: 24px; padding: 15px; border: 2px solid #ddd;
          border-radius: 10px; text-align: center; width: 200px;
          margin: 20px 0; letter-spacing: 5px;
        }
        .btn {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white; border: none; padding: 12px 30px;
          border-radius: 25px; font-size: 16px; cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn:hover { transform: translateY(-2px); }
        .error { color: #e74c3c; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="login-container">
        <h1>Access Code</h1>
        <p>Enter the 5-digit access code to continue</p>
        <form action="/auth" method="post">
          <input type="text" name="code" class="code-input" placeholder="00000" maxlength="5"> 
          <br>
          <button type="submit" class="btn">Access FileShare</button>
        </form>
        <div id="error" class="error"></div>
      </div>
      <script>
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('error')) {
          document.getElementById('error').textContent = 'Invalid access code. Please try again.';
        }
      </script>
    </body>
    </html>
  `;
}
export default loginPage;