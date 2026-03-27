# Setup Guide for Others to Run Locally

This guide explains how another person can clone your project from GitHub and run it on their PC.

## 📋 Prerequisites

Before getting started, ensure the following are installed on the PC:

### 1. **Node.js & npm**
   - **Download:** https://nodejs.org/
   - Choose **LTS (Long Term Support)** version
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```
   - Both commands should return version numbers

### 2. **Git** (for cloning the repository)
   - **Download:** https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

### 3. **Text Editor (Optional)**
   - VS Code: https://code.visualstudio.com/
   - Sublime Text, Notepad++, or any text editor

---

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository
Open Command Prompt, PowerShell, or Terminal and run:

```bash
git clone https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git
cd ai-ticket-dashboard
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 2: Install Dependencies
```bash
npm install
```

This command will:
- Read `package.json`
- Download all required packages into `node_modules/` folder
- Install: express, exceljs, multer, csv-parser, and their dependencies

**Expected output:**
```
added XX packages, audited XXX packages in Xs
```

### Step 3: Verify Installation
Check if all packages installed correctly:
```bash
npm list
```

### Step 4: Start the Server
```bash
npm start
```

**Expected output:**
```
> ai-ticket-dashboard@1.0.0 start
> node server.js

AI Ticket Dashboard running at http://localhost:3000
Upload files at http://localhost:3000/upload.html
```

### Step 5: Access the Dashboard
Open your web browser and go to:
- **Dashboard:** http://localhost:3000
- **Upload Page:** http://localhost:3000/upload.html

---

## 📊 Using the Dashboard

### Upload Data
1. Navigate to http://localhost:3000/upload.html
2. Click to select or drag-and-drop Excel (.xlsx, .xls) or CSV (.csv) files
3. Click "Upload & Analyze"
4. Dashboard automatically updates with new data

### Refresh Data
1. Go to the main dashboard (http://localhost:3000)
2. Click "🔄 Refresh Data" to re-analyze existing files

### Auto-Refresh
1. Check the "Auto-refresh every" checkbox
2. Select desired interval (30s, 1m, 5m, 10m)
3. Dashboard updates automatically

---

## 🔧 Troubleshooting

### Issue: "npm command not found"
**Solution:** Node.js is not installed or not in PATH
- Reinstall Node.js from https://nodejs.org/
- Restart Command Prompt/Terminal after installation

### Issue: "Port 3000 already in use"
**Solution:** Another application is using port 3000
```bash
# Find the process using port 3000
lsof -i :3000

# Kill the process (replace PID with actual ID)
kill -9 <PID>

# Or edit server.js and change port number
```

### Issue: "npm install fails"
**Possible Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# If still failing, delete node_modules and try again
rm -rf node_modules
npm install
```

### Issue: "Dashboard shows no data / Only Excel files are allowed"
**Solution:** 
- Ensure Excel or CSV files are properly formatted
- Upload a test file from the repository
- Check browser console (F12) for error messages

### Issue: Dashboard not updating after upload
**Solution:**
- Wait for "Upload successful!" message
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Check server logs for errors

---

## 📁 Project Structure

```
ai-ticket-dashboard/
├── index.html             # Main dashboard page
├── upload.html            # File upload interface
├── index.js               # Original analysis script
├── server.js              # Express server
├── analyzer.js            # Data analysis module
├── package.json           # Project dependencies
├── package-lock.json      # Locked dependency versions
├── README.md              # Project overview
├── QUICKSTART.md          # Quick start guide
├── FEATURES.md            # Feature documentation
├── SETUP.md               # This file
├── .gitignore             # Git ignore rules
└── My-FD-Dashboard-/      # Sample data folder
```

---

## 🔄 Project Structure After First Run

After running the server for the first time, you'll see:

```
ai-ticket-dashboard/
├── ... (files above)
├── node_modules/          # ALL installed packages (auto-created)
├── uploads/               # Temporary file uploads (auto-created)
└── dashboard-results.json # Generated analytics (auto-created)
```

**Note:** 
- `node_modules/` should NOT be uploaded to GitHub (handled by .gitignore)
- `uploads/` and `dashboard-results.json` are auto-generated

---

## 💡 Tips for Running on Another PC

### For Windows Users:
```bash
# Use PowerShell or Command Prompt
npm start
```

### For Mac/Linux Users:
```bash
# Use Terminal
npm start
```

### Keep Terminal Open
- The terminal window must stay open while using the dashboard
- Closing it will stop the server

### Stop the Server
- Press `Ctrl+C` in the terminal
- Wait for confirmation message

### Restart the Server
- Press `Ctrl+C` to stop
- Run `npm start` again

---

## 🔗 Important Ports

The dashboard runs on:
- **Port 3000** (default)

If port 3000 is in use:

**Option 1: Change the port in server.js**
```javascript
const PORT = 3000;  // Change to 3001, 3002, etc.
```

**Option 2: Kill the process using port 3000**
```bash
# Windows (PowerShell as Admin)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 📝 Sample Data

If you want to test the dashboard without uploading files:

1. Save sample ticket data as Excel or CSV
2. Click "📤 Upload Files"
3. Select the sample file
4. Click "Upload & Analyze"

The dashboard expects columns like:
- Status
- Priority
- Agent
- Merchant
- Created time
- First response time (in mins or hrs)
- Resolution time (in hrs)
- CSAT Rating
- etc.

---

## 🆘 Getting Help

If someone encounters issues:

1. **Check this guide** for common solutions
2. **Check browser console** (Press F12)
3. **Check server output** in terminal
4. **Review error messages** carefully
5. **Restart everything** (close terminal, npm start again)

---

## 🚀 Quick Commands Reference

```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git

# Navigate to project
cd ai-ticket-dashboard

# Install dependencies (one-time)
npm install

# Start the server
npm start

# Stop the server (in terminal)
Ctrl+C

# Re-analyze data (original script)
npm run analyze

# Check installed packages
npm list

# Update packages
npm update
```

---

## 🔐 Important Notes

- **Keep `.gitignore`** - Ensures large folders aren't uploaded
- **Don't share `node_modules`** - Users install it with `npm install`
- **Share `package.json`** - This is all users need to know dependencies
- **Update `README.md`** - Provide project overview and features
- **Include `.git` folder** - It's created when you push to GitHub

---

## 📄 Version Control

After someone clones and modifies the project:

```bash
# Check changes
git status

# View changes
git diff

# Commit changes (if they want to contribute)
git add .
git commit -m "Description of changes"
git push origin main
```

---

**This should be enough for anyone to run your project on their PC!**

For questions or issues, refer to this guide or create an Issue on GitHub.

---

Last Updated: March 27, 2026
