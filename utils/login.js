const loginPage = (styles) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FileShare Access</title>
    ${styles}
    </head>
    <body>
      <div class="login-container" style="position: absolute !important; left: 50% !important; top: 50% !important; transform: translate(-50%, -50%) !important;">
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