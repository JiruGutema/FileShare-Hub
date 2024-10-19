# Sharing File Without Cable (PC to Mobile)

This project provides a simple way to share files between your PC and mobile device using a web interface. It uses Node.js with Express to handle file uploads and serve static files.

## Features

- Upload files from your PC or mobile device.
- List and download uploaded files.
- Simple web interface for uploading and listing files.

## Prerequisites

- Node.js installed on your machine.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/JiruGUtema/Sharing-File-Without-Cable-PC-Mobile.git
   ```

2. Navigate to the project directory:

   ```sh
   cd Sharing-File-Without-Cable-PC-Mobile/Backend
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

## Usage

1. Start the server:

   ```sh
   node index.js
   ```

2. Open your web browser and navigate to `http://localhost:3000`.

3. Use the web interface to upload files and view the list of uploaded files.

## Project Structure

- `index.js`: Main server file.
- `uploads/`: Directory where uploaded files are stored.

## Endpoints

- `GET /`: Home route with file upload form.
- `POST /upload`: Endpoint to handle file uploads.
- `GET /uploads/:filename`: Endpoint to serve uploaded files.
- `GET /files`: Endpoint to list all uploaded files.

## License

Here's how you can add the "How to Use on Local Network" section to your README:

````markdown
# File Upload Server

This is a simple file upload server built using Node.js, Express, and Multer. It allows users to upload files, displays a list of uploaded files, and provides options to download and delete files. The application also supports dark mode.

## Features

1. File upload: Users can upload files with a maximum size of 10MB. The uploaded files are saved in the 'uploads' folder.
2. File list: A list of uploaded files is displayed on the '/files' route.
3. Dark mode: The application supports dark mode, which can be toggled using the 'Toggle Dark Mode' button.
4. File deletion: Users can delete uploaded files using the 'Delete' button.

## Setup

1. Make sure you have Node.js installed.
2. Create a new directory for your project and navigate to it in the terminal.
3. Run `npm init -y` to create a package.json file.
4. Install the required dependencies by running:

   ```bash
   npm install express multer
   ```
````

5. Create an 'uploads' folder in the project directory to store uploaded files.

## Usage

1. Save the provided code in a file called 'app.js' in the project directory.
2. Start the server by running `node app.js` in the terminal.
3. Visit <http://localhost:3005> in your browser to access the application.

## How to Use on Local Network

1. **Obtain Your Local IP Address:**

   - **Windows:**
     - Open Command Prompt and run:
       ```bash
       ipconfig
       ```
     - Look for the `IPv4 Address` under your active network connection.
   - **macOS or Linux:**
     - Open Terminal and run:
       ```bash
       ifconfig
       ```
     - Look for the `inet` address under your active network interface (e.g., `en0` for Wi-Fi).

2. **Update Your Application to Listen on All Interfaces:**
   Modify your `app.js` file to listen on `0.0.0.0` instead of `localhost`:

   ```javascript
   const PORT = 3005;
   const HOST = "0.0.0.0"; // Change to listen on all available interfaces

   app.listen(PORT, HOST, () => {
     console.log(`Server is running on http://${HOST}:${PORT}`);
   });
   ```

3. **Run Your Application:**
   Start your application using Nodemon or Node:

   ```bash
   nodemon app.js
   ```

4. **Connect Your Devices to the Same Network:**
   Ensure that your computer and the device you want to use to access the application (e.g., a smartphone or tablet) are connected to the same Wi-Fi network.

5. **Access the Application from Another Device:**

   - Open a web browser on your mobile device or another computer.
   - Enter the following URL, replacing `YOUR_LOCAL_IP` with the actual local IP address you found earlier:

   ```
   http://YOUR_LOCAL_IP:3005
   ```

   For example, if your local IP address is `192.168.1.10`, you would enter:

   ```
   http://192.168.1.10:3005
   ```

6. **Use the Application:**
   You should now see the file upload interface. You can upload files, view uploaded files, and delete them just as you would on your local machine.

### Additional Notes

- **Firewall Settings:** Ensure that any firewall on your computer allows incoming connections on the port you're using (e.g., port 3005).
- **Testing:** You can test the connection by opening the URL in multiple devices connected to the same network.
- **Dynamic IP:** If your local IP address changes (common with DHCP), repeat the steps to obtain the new IP address.
