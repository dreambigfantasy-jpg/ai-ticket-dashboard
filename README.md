# AI Ticket Dashboard 🎯

A comprehensive web-based dashboard for analyzing support ticket data with real-time metrics, file uploads, and auto-refresh capabilities.

## ✨ Features

### 📊 Dashboard Analytics
- **First Response Time (FRT)** - Average response metrics
- **Resolution Time** - Ticket closure times
- **Agent Performance** - Individual agent metrics
- **SLA Tracking** - Compliance monitoring
- **Weekly Volume** - Ticket trending
- **CSAT Scores** - Customer satisfaction tracking

### 📤 File Management
- **Multiple File Upload** - Upload Excel & CSV files simultaneously
- **Mixed Format Support** - Combine .xlsx, .xls, and .csv files
- **Automatic Processing** - Instant data analysis and metrics

### 🔄 Real-Time Updates
- **One-Click Refresh** - Re-analyze data without re-uploading
- **Auto-Refresh** - Automatic updates at configurable intervals (30s, 1m, 5m, 10m)
- **Live Monitoring** - Track metrics in real-time

### 🔍 Search & Filter
- **Merchant Search** - Find merchants and their CSM
- **Agent Filter** - View agent-specific metrics
- **Category Breakdown** - Analyze by ticket type

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning) - [Download](https://git-scm.com/)

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git
   cd ai-ticket-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Dashboard: http://localhost:3000
   - Upload: http://localhost:3000/upload.html

For detailed setup instructions, see [SETUP.md](SETUP.md)

## 📁 Project Structure

```
ai-ticket-dashboard/
├── index.html              # Main dashboard
├── upload.html             # File upload interface
├── server.js               # Express backend
├── analyzer.js             # Data processing module
├── package.json            # Dependencies
├── README.md               # This file
├── SETUP.md                # Setup guide for others
├── FEATURES.md             # Complete feature docs
├── QUICKSTART.md           # Quick reference
└── My-FD-Dashboard-/       # Sample resources
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Excel Processing** | ExcelJS |
| **CSV Processing** | csv-parser |
| **File Upload** | Multer |
| **Charts** | Chart.js |

## 📊 Supported File Formats

✅ **Excel Files:**
- .xlsx (Excel 2007+)
- .xls (Excel 2003-2007)

✅ **CSV Files:**
- .csv (Comma-Separated Values)

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - How to run on another PC
- **[FEATURES.md](FEATURES.md)** - Complete feature documentation
- **[QUICKSTART.md](QUICKSTART.md)** - Quick reference guide

## 🔧 Available Commands

```bash
npm start              # Start the dashboard server
npm run analyze        # Run original analysis script
npm install            # Install dependencies
npm list               # Show installed packages
npm update             # Update all packages
```

## 📊 Expected Excel/CSV Columns

For best results, your files should include:

**Required:**
- Status
- Priority
- Agent
- Created time

**Recommended:**
- Merchant
- CSM
- Type (category)
- First response time (in mins/hrs)
- Resolution time (in hrs)
- First response status (Within SLA/SLA Violated)
- Resolution status (Within SLA/SLA Violated)
- CSAT Rating
- Agent interactions

## 🚀 How to Share on GitHub

1. **Create Repository**
   - Go to https://github.com/new
   - Name it "ai-ticket-dashboard"
   - Click "Create repository"

2. **Initialize Git (if not done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Ticket Dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git
   git push -u origin main
   ```

3. **Push Future Changes**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

4. **Others can then clone:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git
   cd ai-ticket-dashboard
   npm install
   npm start
   ```

## 🔒 Important Files

- **`.gitignore`** - Prevents uploading large folders (node_modules, etc.)
- **`package.json`** - Lists all dependencies
- **`package-lock.json`** - Locks dependency versions (auto-generated)

## 📈 Metrics Calculated

The dashboard automatically calculates:

### Overall Metrics
- Total tickets
- Resolved percentage
- Average FRT
- Average Resolution Time
- CSAT Score
- SLA Compliance %

### Per-Agent Metrics
- Total tickets handled
- FRT performance
- Resolution time
- CSAT average
- SLA compliance
- Top categories

### Trends
- Weekly ticket volume
- Status breakdown
- Priority distribution
- Category distribution

## 🔄 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/data` | GET | Get current dashboard data |
| `/api/upload` | POST | Upload and analyze files |
| `/api/refresh` | POST | Re-analyze existing data |
| `/api/refresh-status` | GET | Check analysis status |
| `/api/search-merchant` | GET | Search merchant info |
| `/api/agent-dashboard` | GET | Get agent metrics |

## 🐛 Troubleshooting

**Problem:** Port 3000 is already in use
```bash
npm install -g lsof
lsof -i :3000
kill -9 <PID>
```

**Problem:** Dependencies not installing
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

**Problem:** Dashboard shows no data
- Ensure Excel/CSV files are properly formatted
- Upload files via the upload interface
- Check browser console (F12) for errors

## 📝 Notes for Sharing

When sharing via GitHub:
1. ✅ Include `package.json` and `package-lock.json`
2. ✅ Include `SETUP.md` for easy setup by others
3. ✅ Include `.gitignore` (prevents large folders)
4. ❌ Don't commit `node_modules/` folder
5. ❌ Don't commit `dashboard-results.json` 
6. ❌ Don't commit `uploads/` folder

**Others will install dependencies with:** `npm install`

## 🤝 Contributing

Contributors can:
1. Clone the repository
2. Make changes locally
3. Test the dashboard
4. Submit pull requests

## 📄 License

ISC License

## 👤 Author

Your Name/Team

## 🔗 Links

- **GitHub:** https://github.com/YOUR-USERNAME/ai-ticket-dashboard
- **Node.js:** https://nodejs.org/
- **Express.js:** https://expressjs.com/
- **ExcelJS:** https://github.com/exceljs/exceljs
- **Chart.js:** https://www.chartjs.org/

---

## 🆘 Support

For detailed setup instructions for running on another PC, see [SETUP.md](SETUP.md)

For all features and documentation, see [FEATURES.md](FEATURES.md)

For quick reference, see [QUICKSTART.md](QUICKSTART.md)

---

**Version 2.0** - Full feature dashboard with multi-file support
Last Updated: March 27, 2026

