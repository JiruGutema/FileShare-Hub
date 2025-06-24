# 🚀 FileShare Hub

> **Have you ever struggled to transfer files between your PC and mobile without cables, cloud uploads, or complicated setups?**  
> **Tired of emailing yourself files or dealing with slow Bluetooth transfers?**

**FileShare Hub** is designed to solve exactly that!  
With just a browser and a shared Wi-Fi network (local - wifi doesn't have to work just local network), you can instantly upload, download, and manage files between any device—no cables, no accounts, no hassle.

**A modern, feature-rich file sharing application for seamless file transfer between devices on the same network.**

![FileShare Hub](https://img.shields.io/badge/Node.js-Express-green) ![License](https://img.shields.io/badge/License-MIT-blue) ![Version](https://img.shields.io/badge/Version-3.0-orange) ![Security](https://img.shields.io/badge/Security-5--digit--auth-red)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glass morphism design** with gradient backgrounds
- **Dark/Light mode** with persistent theme preference
- **Responsive design** optimized for mobile and desktop
- **Smooth animations** and hover effects
- **Professional typography** and consistent styling

### 📤 **Advanced File Upload**
- **Drag & drop interface** for intuitive file uploads
- **Multiple file selection** (up to 10 files simultaneously)
- **Real-time progress indicators** during upload
- **File type detection** with appropriate icons
- **Automatic file organization** with timestamps

### 📱 **Mobile-First Experience**
- **QR code generation** for instant mobile access
- **Network IP auto-detection** across platforms
- **Touch-friendly interface** with optimized button sizes
- **Native mobile sharing** integration
- **Responsive file management** cards

### 🗂️ **Smart File Management**
- **File statistics dashboard** (total files, size, types)
- **Sortable file list** by date, name, or size
- **Quick action buttons** (View, Download, Delete)
- **Bulk operations** with select all/clear functionality
- **File preview** support for common formats

### ⚡ **Quick Access Features**
- **Quick options header** with common actions
- **One-click refresh** and navigation
- **Instant URL copying** to clipboard
- **Smart notifications** for user feedback

### 🔐 **Security & Authentication**
- **5-digit access code** generated on server startup
- **Session-based authentication** with HTTP cookies
- **Persistent login** until server restart
- **Protected file access** with authentication middleware
- **Graceful session cleanup** on server shutdown
- **Secure file serving** with authentication checks

## 🛠️ **Technology Stack**

- **Backend**: Node.js + Express.js
- **File Handling**: Multer middleware
- **QR Generation**: qrcode + qrcode-terminal
- **Frontend**: Vanilla JavaScript + Modern CSS
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Unicode Emojis for universal compatibility

## 📋 **Prerequisites**

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 **Quick Start**

### 1. **Installation**

```bash
# Clone the repository
git clone https://github.com/JiruGUtema/Sharing-File-Without-Cable-PC-Mobile.git

# Navigate to project directory
cd Sharing-File-Without-Cable-PC-Mobile

# Install dependencies
npm install
```

### 2. **Start the Server**

```bash
# Start the application
node index.js

# Or use nodemon for development
npm run dev
```

### 3. **Access the Application**

- **Local Access**: `http://localhost:1234`
- **Network Access**: `http://YOUR_IP:1234`

The server will display a beautiful ASCII art banner with:
- 🔐 **5-digit access code** for secure login
- 📱 QR code for mobile access
- 🌐 Network URLs for easy sharing
- 💡 Helpful tips and instructions

### 4. **Login Process**

1. **Visit the application** → Redirected to login page
2. **Enter 5-digit code** → Displayed in server terminal
3. **Access granted** → Session persists until server restart
4. **Enjoy secure file sharing** → All features unlocked

## 📱 **Mobile Access Setup**

### **Automatic Network Detection**
The application automatically detects your network IP and generates:
- QR codes in terminal for quick scanning
- Web-based QR codes that update dynamically
- Copy-to-clipboard functionality for easy sharing

### **Manual Network Setup**

1. **Find Your IP Address:**
   ```bash
   # Windows
   ipconfig
   
   # macOS/Linux
   ifconfig
   
   # Or check the server startup message
   ```

2. **Connect Devices:**
   - Ensure all devices are on the same Wi-Fi network
   - Scan the QR code or visit the network URL
   - Start sharing files instantly!

## 🏗️ **Project Structure**

```
FileShare-Hub/
├── index.js              # Main server file
├── uploads/              # File storage directory
├── utils/                # Utility modules
│   ├── styles.js         # CSS styles
│   ├── script.js         # Client-side JavaScript
│   ├── homePage.js       # Homepage template
│   ├── getFiles.js       # File listing logic
│   └── uploadFiles.js    # Upload success page
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🔌 **API Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/login` | Login page with 5-digit code input | ❌ |
| `POST` | `/auth` | Authentication endpoint | ❌ |
| `GET` | `/` | Homepage with upload interface | ✅ |
| `POST` | `/upload` | Handle file uploads (max 10 files) | ✅ |
| `GET` | `/files` | File manager with statistics | ✅ |
| `GET` | `/qr` | Generate QR code for network access | ✅ |
| `GET` | `/uploads/:filename` | Serve uploaded files | ✅ |
| `POST` | `/delete` | Delete specific files | ✅ |

## ⚙️ **Configuration**

### **Environment Variables**
```bash
# Optional: Create .env file
PORT=1234                 # Server port (default: 1234)
UPLOAD_LIMIT=10          # Max files per upload
MAX_FILE_SIZE=50MB       # Maximum file size
```

### **Customization Options**
- **Port Configuration**: Change `PORT` constant in `index.js`
- **Upload Limits**: Modify multer configuration
- **Styling**: Update CSS variables in `utils/styles.js`
- **File Storage**: Customize upload directory path

## 🔒 **Security Features**

### **Authentication System**
- **5-digit access code** generated randomly on startup
- **Session-based authentication** with secure HTTP cookies
- **Persistent login** across browser sessions
- **Automatic session cleanup** on server shutdown
- **Protected routes** requiring authentication

### **File Security**
- **Authenticated file access** - all files require login
- **File type validation** and sanitization
- **Upload size limits** to prevent abuse
- **Timestamp-based naming** to avoid conflicts
- **Local network restriction** (no external access)
- **Input validation** and error handling

### **Session Management**
- **Cookie-based sessions** with 24-hour expiration
- **Graceful shutdown** destroys all active sessions
- **Memory-based storage** - no persistent session data
- **Cross-page authentication** - login once, access everywhere

## 📊 **Performance**

- **Lightweight**: ~2MB total package size
- **Fast uploads**: Optimized multer configuration
- **Efficient rendering**: Minimal DOM manipulation
- **Memory friendly**: Streaming file operations
- **Mobile optimized**: Touch-friendly interactions
- **Secure sessions**: Cookie-based authentication
- **Quick startup**: Instant 5-digit code generation

## 🐛 **Troubleshooting**

### **Common Issues**

**Port Already in Use:**
```bash
# Kill process using port 1234
lsof -ti:1234 | xargs kill -9

# Or change port in index.js
const PORT = 3000; // Use different port
```

**Network Access Issues:**
- Check firewall settings
- Ensure devices are on same network
- Verify IP address is correct
- Try disabling VPN if active

**Upload Failures:**
- Check available disk space
- Verify file size limits
- Ensure uploads directory exists
- Check file permissions

**Authentication Issues:**
- Check the 5-digit code in server terminal
- Clear browser cookies if login fails
- Restart server to generate new access code
- Ensure JavaScript is enabled for session handling

**File Access Denied:**
- Login required for all file operations
- Check if session has expired
- Re-authenticate if redirected to login page

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Express.js** team for the robust web framework
- **Multer** developers for file upload handling
- **QRCode** library for seamless QR generation
- **Open source community** for inspiration and support

## 📞 **Support**

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/JiruGUtema/Sharing-File-Without-Cable-PC-Mobile/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/JiruGUtema/Sharing-File-Without-Cable-PC-Mobile/discussions)
- 📧 **Contact**: [jirudagutema@gmail.com](mailto:jirudagutema@gmail.com)

---

<div align="center">

**Made with ❤️ for seamless file sharing**

[⭐ Star this repo](https://github.com/JiruGUtema/Sharing-File-Without-Cable-PC-Mobile) • [🐛 Report Bug](https://github.com/JiruGUtema/Sharing-File-Without-Cable-PC-Mobile/issues) • [✨ Request Feature](https://github.com/JiruGUtema/Sharing-File-Without-Cable-PC-Mobile/issues)

</div>
