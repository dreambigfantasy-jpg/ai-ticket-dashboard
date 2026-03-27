# AI Ticket Dashboard - Updated Documentation

## 🚀 New Features

### 1. **Multiple File Support**
   - Upload and analyze data from multiple Excel files simultaneously
   - Combine data from different sources into a single dashboard
   - All files are processed together for comprehensive analysis

### 2. **Dashboard Refresh**
   - One-click refresh button to re-analyze existing data
   - Quick updates without manual Excel file re-processing
   - Real-time status indicators

### 3. **Auto-Refresh**
   - Enable automatic dashboard updates at configurable intervals
   - Choose from: 30 seconds, 1 minute, 5 minutes, or 10 minutes
   - Perfect for live monitoring of ticket metrics

### 4. **File Upload Interface**
   - Dedicated upload page with drag-and-drop support
   - File validation and preview
   - Progress indicators during analysis
   - Error handling and status messages

## 📋 Requirements

- Node.js (v14+)
- npm or yarn
- Excel files (.xlsx or .xls format)

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Verify all packages are installed:**
   - express
   - exceljs
   - multer

## 🎯 Quick Start

### Starting the Server
```bash
npm start
```
The dashboard will be available at `http://localhost:3000`

### Upload Page
Access the file upload interface at:
```
http://localhost:3000/upload.html
```

## 📊 How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (HTML/JS)                   │
│  - Dashboard View (index.html)                          │
│  - Upload Interface (upload.html)                       │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Express Server (server.js)                  │
│  - /api/data - Get dashboard data                       │
│  - /api/upload - Upload and analyze files               │
│  - /api/refresh - Refresh existing analysis             │
│  - /api/refresh-status - Check analysis status          │
│  - /api/search-merchant - Search merchant info          │
│  - /api/agent-dashboard - Get agent-specific data       │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│             Analyzer (analyzer.js)                       │
│  - Process Excel files                                  │
│  - Calculate metrics                                    │
│  - Generate analytics                                   │
│  - Export results to JSON                               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│            Excel Files & JSON Output                     │
│  - Input: .xlsx, .xls files                             │
│  - Output: dashboard-results.json                       │
└─────────────────────────────────────────────────────────┘
```

### Workflow

1. **Upload Files:**
   - Navigate to `/upload.html`
   - Select one or more Excel files
   - Files are uploaded to the `/uploads` directory (temporary)

2. **Analysis:**
   - Server processes files using `analyzer.js`
   - Extracts ticket data and calculations
   - Combines results from multiple files
   - Saves to `dashboard-results.json`
   - Cleans up temporary uploaded files

3. **Display:**
   - Dashboard loads data from `dashboard-results.json`
   - Charts and metrics are rendered
   - Real-time search filters available

4. **Refresh:**
   - Use "Refresh Data" button for quick re-analysis
   - Enable auto-refresh for continuous updates
   - Status messages confirm each operation

## 📁 Project Structure

```
.
├── index.html              # Main dashboard
├── upload.html             # File upload interface
├── index.js                # Original analysis script
├── server.js               # Express server with new endpoints
├── analyzer.js             # Reusable analysis module (NEW)
├── package.json            # Dependencies (updated)
├── dashboard-results.json  # Generated analytics output
├── uploads/                # Temporary file storage (auto-created)
└── My-FD-Dashboard-/       # Resources folder
```

## 🔧 API Endpoints

### GET `/api/data`
Returns the current dashboard data from the JSON file.

**Response:**
```json
{
  "totalTickets": 1234,
  "averageFRT": 45.5,
  "averageResolutionTime": 120.3,
  "statusBreakdown": { ... },
  "slaCompliance": { ... },
  "agentData": { ... },
  "sourceFiles": ["file1.xlsx", "file2.xlsx"],
  "lastUpdated": "2024-03-27T10:30:00Z"
}
```

### POST `/api/upload`
Upload and analyze new Excel files.

**Parameters:** multipart/form-data with files
```
Content-Type: multipart/form-data
files: [file1.xlsx, file2.xlsx, ...]
```

**Response:**
```json
{
  "success": true,
  "message": "Analyzed 500 tickets from 2 file(s)",
  "data": { ... }
}
```

### POST `/api/refresh`
Re-analyze existing files without uploading new ones.

**Response:**
```json
{
  "success": true,
  "message": "Re-analyzed 500 tickets from 1 file(s)",
  "data": { ... }
}
```

### GET `/api/refresh-status`
Check if analysis is in progress.

**Response:**
```json
{
  "analysisInProgress": false,
  "lastAnalysisTime": "2024-03-27T10:30:00Z",
  "hasError": false,
  "error": null
}
```

### GET `/api/search-merchant?merchant=name`
Search for a merchant and their CSM.

### GET `/api/agent-dashboard?agent=name`
Get specific agent's metrics and performance data.

## 📊 Metrics Calculated

The dashboard automatically calculates:

- **Ticket Metrics:**
  - Total tickets
  - Average First Response Time (FRT)
  - Average Resolution Time
  - Resolved percentage
  - CSAT score

- **SLA Compliance:**
  - FRT SLA met/violated
  - Resolution SLA met/violated
  - SLA breach count

- **Agent Performance:**
  - Tickets per agent
  - Individual FRT/Resolution times
  - Agent SLA compliance
  - Weekly volume per agent
  - Top categories by agent

- **Volume Analysis:**
  - Weekly ticket volume
  - Status breakdown
  - Priority breakdown
  - Top categories

## 🔄 Auto-Refresh Guide

1. **Enable Auto-Refresh:**
   - Check the "Auto-refresh every" checkbox
   - Select desired interval

2. **Available Intervals:**
   - 30 seconds: Near real-time updates
   - 1 minute: Frequent monitoring
   - 5 minutes: Standard refresh
   - 10 minutes: Low-frequency updates

3. **Disable:**
   - Uncheck the "Auto-refresh every" checkbox
   - Current refresh interval stops

## 📤 File Upload Requirements

### Excel File Format
Your Excel files should contain the following columns:

Required:
- Ticket ID / Ticket Number
- Status
- Priority
- Agent
- Created time

Time Metrics (any of these):
- First response time (in mins) / First response time (in hrs)
- Resolution time (in hrs)
- Resolution time (in hrs)_1

SLA Status:
- First response status (should contain "Within SLA" or "SLA Violated")
- Resolution status (same format)

Optional:
- Merchant
- CSM
- Type (category)
- CSAT Rating
- Agent interactions

## ❓ Troubleshooting

### Issue: "No Excel files found"
**Solution:** Ensure at least one .xlsx or .xls file is uploaded to the server.

### Issue: Analysis takes too long
**Solution:** Large files may take time to process. Check browser console for progress.

### Issue: Dashboard shows old data after upload
**Solution:** Wait for "Upload successful" message and refresh completes automatically.

### Issue: Port 3000 already in use
**Solution:** 
```bash
# Change port in server.js or kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

## 🔒 Security Notes

1. **File Upload:** Only .xlsx and .xls files are accepted
2. **File Cleanup:** Temporary files are deleted after analysis
3. **Data Processing:** All processing happens server-side
4. **No External Calls:** Dashboard works completely offline after startup

## 📝 Development

### Modify analyzer.js
To customize how data is processed, edit `analyzer.js`:
- Adjust metrics calculations
- Add new fields to output
- Modify data aggregation logic

### Customize Dashboard
Edit `index.html` to:
- Add new charts
- Modify styling
- Change dashboard layout

## 🔗 Related Files

- **Original Analysis Script:** `index.js` (can still be run with `npm run analyze`)
- **Server Configuration:** `server.js`
- **Module Analyzer:** `analyzer.js` (reusable analysis logic)

## 📈 Performance Tips

1. **Large Datasets:** Split files into smaller chunks for faster processing
2. **Network Speed:** Use auto-refresh intervals matching your needs
3. **Browser:** Use modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
4. **Server Resources:** Monitor server memory when processing very large files (1000+ rows)

## 🆘 Support

For issues or questions:
1. Check the browser console for error messages
2. Review the API response messages
3. Check server logs for detailed error information
4. Ensure Excel files are not corrupted

## 📄 License

ISC

## 👤 Author

Your Team

---

Last Updated: March 27, 2024
