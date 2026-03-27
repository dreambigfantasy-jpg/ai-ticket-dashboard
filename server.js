const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { analyzeExcelFiles } = require('./analyzer');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads with extension preservation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const csvMime = 'text/csv';
    const excelMimes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    const isExcel = excelMimes.includes(file.mimetype) || 
                    file.originalname.toLowerCase().endsWith('.xlsx') || 
                    file.originalname.toLowerCase().endsWith('.xls');
    const isCSV = file.mimetype === csvMime || file.originalname.toLowerCase().endsWith('.csv');
    
    if (isExcel || isCSV) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel (.xlsx, .xls) and CSV (.csv) files are allowed'), false);
    }
  }
});

// Analysis state
let analysisInProgress = false;
let lastAnalysisTime = null;
let analysisError = null;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// API endpoint to get dashboard data
app.get('/api/data', (req, res) => {
  try {
    const data = fs.readFileSync('dashboard-results.json', 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Dashboard data not available. Run the analysis first.' });
  }
});

// API endpoint to get refresh status
app.get('/api/refresh-status', (req, res) => {
  res.json({
    analysisInProgress,
    lastAnalysisTime,
    hasError: !!analysisError,
    error: analysisError
  });
});

// API endpoint to upload and analyze Excel files
app.post('/api/upload', upload.array('files'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  analysisInProgress = true;
  analysisError = null;

  try {
    // Get newly uploaded file paths
    const newFilePaths = req.files.map(file => file.path);
    
    // Get existing uploaded files to combine with new ones
    let allFilePaths = [...newFilePaths];
    
    // Include existing uploaded files
    if (fs.existsSync('uploads')) {
      const existingFiles = fs.readdirSync('uploads')
        .filter(f => f.endsWith('.xlsx') || f.endsWith('.xls') || f.endsWith('.csv'))
        .map(f => path.join('uploads', f));
      allFilePaths = [...new Set([...allFilePaths, ...existingFiles])];
    }
    
    // Always include default file if it exists (your 150 base records)
    if (fs.existsSync('My tickets JFMM.xlsx')) {
      allFilePaths.unshift('My tickets JFMM.xlsx');
    }
    
    console.log(`Analyzing ${allFilePaths.length} file(s) total (including base file and previous uploads)...`);

    const results = await analyzeExcelFiles(allFilePaths);
    
    // Save combined results
    fs.writeFileSync('dashboard-results.json', JSON.stringify(results, null, 2));
    
    // Keep uploaded files in uploads folder for future refreshes and accumulation
    lastAnalysisTime = new Date().toISOString();
    analysisInProgress = false;
    
    res.json({
      success: true,
      message: `Analyzed ${results.totalTickets} total tickets from ${results.sourceFiles.length} file(s)`,
      data: results
    });
  } catch (error) {
    analysisError = error.message;
    analysisInProgress = false;
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to refresh/re-analyze existing files
app.post('/api/refresh', async (req, res) => {
  if (analysisInProgress) {
    return res.status(400).json({ error: 'Analysis already in progress' });
  }

  analysisInProgress = true;
  analysisError = null;

  try {
    // Get list of Excel files to analyze (combine default file + uploaded files)
    let filePaths = [];
    
    // Always include default file if it exists (your 150 base records)
    if (fs.existsSync('My tickets JFMM.xlsx')) {
      filePaths.push('My tickets JFMM.xlsx');
    }
    
    // Also include any uploaded files (for accumulation)
    if (fs.existsSync('uploads')) {
      const uploadedFiles = fs.readdirSync('uploads')
        .filter(f => f.endsWith('.xlsx') || f.endsWith('.xls') || f.endsWith('.csv'))
        .map(f => path.join('uploads', f));
      filePaths = [...filePaths, ...uploadedFiles];
    }

    if (filePaths.length === 0) {
      throw new Error('No Excel files found. Please upload a file first.');
    }

    console.log(`Refreshing analysis with ${filePaths.length} file(s)...`);
    const results = await analyzeExcelFiles(filePaths);
    
    fs.writeFileSync('dashboard-results.json', JSON.stringify(results, null, 2));
    lastAnalysisTime = new Date().toISOString();
    analysisInProgress = false;
    
    res.json({
      success: true,
      message: `Re-analyzed ${results.totalTickets} tickets from ${results.sourceFiles.length} file(s)`,
      data: results
    });
  } catch (error) {
    analysisError = error.message;
    analysisInProgress = false;
    console.error('Refresh error:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to search CSM by merchant name
app.get('/api/search-merchant', (req, res) => {
  try {
    const merchantName = req.query.merchant;
    if (!merchantName) {
      res.status(400).json({ error: 'Merchant name is required' });
      return;
    }

    const data = fs.readFileSync('dashboard-results.json', 'utf8');
    const parsedData = JSON.parse(data);
    const merchantCSM = parsedData.merchantCSM || {};

    // Search for exact match or partial match
    const matches = {};
    Object.entries(merchantCSM).forEach(([merchant, csm]) => {
      if (merchant && merchant.toLowerCase() === merchantName.toLowerCase()) {
        matches[merchant] = csm;
      }
    });

    if (Object.keys(matches).length === 0) {
      res.status(404).json({ error: 'No merchants found matching that name' });
    } else {
      res.json(matches);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error searching merchants' });
  }
});

// API endpoint to get agent-specific data
app.get('/api/agent-dashboard', (req, res) => {
  try {
    const agentName = req.query.agent;
    if (!agentName) {
      res.status(400).json({ error: 'Agent name is required' });
      return;
    }

    const data = fs.readFileSync('dashboard-results.json', 'utf8');
    const parsedData = JSON.parse(data);
    const agentData = parsedData.agentData || {};

    // Search for exact match or partial match
    const matches = {};
    Object.entries(agentData).forEach(([agent, details]) => {
      if (agent && agent.toLowerCase() === agentName.toLowerCase()) {
        matches[agent] = details;
      }
    });

    if (Object.keys(matches).length === 0) {
      res.status(404).json({ error: 'No agents found matching that name' });
    } else {
      res.json(matches);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error searching agents' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`AI Ticket Dashboard running at http://localhost:${PORT}`);
  console.log(`Upload files at http://localhost:${PORT}/upload.html`);
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try another port with PORT=<port> npm start.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});