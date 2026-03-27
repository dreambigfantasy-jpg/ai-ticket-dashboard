# Quick Start Guide - New Features

## 🎯 3 Main Features Added

### 1️⃣ **Upload New Data** 
Upload and analyze Excel files from the dashboard

**How to use:**
- Click "📤 Upload Files" button in the dashboard
- Select one or more Excel files (.xlsx, .xls)
- Click "Upload & Analyze"
- Dashboard automatically updates with new data

**Or use dedicated upload page:**
- Visit: `http://localhost:3000/upload.html`
- Drag and drop files or click to select
- Click "Upload & Analyze"

---

### 2️⃣ **Refresh Dashboard**
Re-analyze existing files without uploading new ones

**How to use:**
- Click "🔄 Refresh Data" button
- Dashboard recalculates all metrics
- Useful when source Excel file has been updated

**Works with:**
- Existing data files
- Previous uploads
- Default Excel file

---

### 3️⃣ **Auto-Refresh**
Automatically update dashboard at set intervals

**How to enable:**
1. Check "Auto-refresh every" checkbox
2. Select interval:
   - 30 seconds
   - 1 minute
   - 5 minutes
   - 10 minutes
3. Dashboard updates automatically

**Use cases:**
- Monitor live ticket data
- Track real-time metrics
- Keep dashboard fresh during work

**How to disable:**
- Uncheck "Auto-refresh every" checkbox

---

## 📊 Dashboard Controls

```
┌─────────────────────────────────────────────────────┐
│ 🔄 Refresh Data  │  📤 Upload Files                │
│                                                      │
│ ☑ Auto-refresh every [30 seconds ▼]  ⟳ Analyzing...│
└─────────────────────────────────────────────────────┘
```

- **Refresh Data**: Updates dashboard instantly
- **Upload Files**: Opens file selection dialog
- **Auto-refresh Toggle**: Enable/disable automatic updates
- **Interval Selector**: Choose refresh frequency
- **Status Indicator**: Shows "Analyzing..." during refresh

---

## 🔄 Typical Workflow

### Scenario 1: New Data Arrives
```
1. Receive new Excel file
2. Click "📤 Upload Files"
3. Select the file
4. Dashboard updates automatically
5. View new metrics and charts
```

### Scenario 2: Ongoing Monitoring
```
1. Enable auto-refresh (5 minutes)
2. Go about your work
3. Dashboard updates every 5 minutes
4. Disable when done monitoring
```

### Scenario 3: Manual Updates
```
1. Update source Excel file on disk
2. Click "🔄 Refresh Data"
3. Dashboard recalculates metrics
4. Charts update instantly
```

---

## ✨ Key Features

| Feature | Benefit |
|---------|---------|
| **Multiple Files** | Combine data from different sources |
| **One-Click Refresh** | No need to re-run analysis manually |
| **Auto-Refresh** | Real-time monitoring without manual steps |
| **File Validation** | Only accepts Excel files (.xlsx, .xls) |
| **Status Messages** | Clear feedback on upload/refresh progress |
| **Background Processing** | Continue using dashboard during analysis |

---

## 📝 File Formats Supported

✅ **Supported:**
- Microsoft Excel (.xlsx)
- Excel 2003-2007 (.xls)

❌ **Not Supported:**
- CSV files
- Google Sheets (export as .xlsx first)
- PDF files
- Other formats

---

## 🚨 Common Issues & Solutions

### Issue: "Only Excel files are allowed"
**Solution:** Ensure file extension is .xlsx or .xls

### Issue: Upload appears to hang
**Solution:** Large files take time. Wait for completion message.

### Issue: Dashboard doesn't update after refresh
**Solution:** Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

### Issue: Old data still showing
**Solution:** Wait for "Dashboard refreshed!" message before checking

### Issue: Can't find Upload button
**Solution:** Look in the top control bar, click "📤 Upload Files"

---

## 🎓 Tips & Tricks

1. **Batch Upload:** Upload multiple files at once (they'll be combined)

2. **Quick Monitoring:** Enable 30-second auto-refresh while monitoring live tickets

3. **Schedule Updates:** Use auto-refresh at 5-10 minute intervals for regular updates

4. **Dedicated Upload Page:** Visit `/upload.html` for a full-screen upload interface

5. **Check Status:** Before uploading, verify at the top if analysis is in progress

---

## 📱 Best Practices

✅ **DO:**
- Upload files in batches for efficiency
- Enable auto-refresh during active monitoring
- Check status messages for feedback
- Wait for completion before navigating away

❌ **DON'T:**
- Upload duplicate files repeatedly
- Enable very frequent auto-refresh (consumes resources)
- Close browser during large file uploads
- Upload corrupted Excel files

---

## 🔗 Quick Links

- **Dashboard:** http://localhost:3000
- **Upload Page:** http://localhost:3000/upload.html
- **API Status:** http://localhost:3000/api/refresh-status

---

## 🆘 Need Help?

1. **Check Status Messages:** Look for green/red notifications
2. **Check Browser Console:** Press F12, see "Console" tab
3. **Server Logs:** Check terminal running `npm start`
4. **Try Refresh:** Hard refresh browser (Ctrl+F5)

---

**Version 2.0** - Updated March 27, 2024
