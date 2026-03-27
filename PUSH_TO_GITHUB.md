# ⚡ Quick Commands to Push to GitHub

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name it: `ai-ticket-dashboard`
3. Click "Create repository"
4. Copy your repository URL (something like: https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git)

---

## Step 2: Copy & Paste These Commands

Open PowerShell in your project folder and run:

```bash
# Configure git with your name and email (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: AI Ticket Dashboard with multi-file support and auto-refresh"

# Add your GitHub repository link
git remote add origin https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git

# Push to GitHub
git push -u origin main
```

**⚠️ Replace:**
- `Your Name` with your actual name
- `your.email@example.com` with your email
- `YOUR-USERNAME` with your GitHub username

---

## What Happens

After running these commands:
✅ All your files will be uploaded to GitHub
✅ Others can clone your repository
✅ You can track changes and collaborate

---

## Others Can Then Run It

Once you push to GitHub, anyone can run it with just 3 commands:

```bash
# 1. Clone
git clone https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git
cd ai-ticket-dashboard

# 2. Install dependencies (only once)
npm install

# 3. Start server
npm start
```

Then they open: http://localhost:3000

---

## After First Push - Updating GitHub

Whenever you make changes and want to update GitHub:

```bash
git add .
git commit -m "Your description of changes"
git push
```

---

## Files Included in GitHub Push

✅ **Will Upload:**
- index.html, upload.html
- server.js, analyzer.js
- package.json, package-lock.json
- README.md, SETUP.md, FEATURES.md, QUICKSTART.md, GITHUB_SETUP.md
- .gitignore, .git folder

❌ **Won't Upload (Ignored):**
- node_modules/ (auto-created, too large)
- uploads/ (temporary)
- dashboard-results.json (auto-generated)

Others will install dependencies with: `npm install`

---

## 📋 Summary

| Person | Action | Command |
|--------|--------|---------|
| **You (First Time)** | Push to GitHub | `git add . && git commit && git push -u origin main` |
| **You (Updates)** | Push changes | `git add . && git commit -m "msg" && git push` |
| **Others** | Clone & run | `git clone ... && npm install && npm start` |

---

**That's all they need!** No need to install Node.js separately if it's already installed.

See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed instructions.
See [SETUP.md](SETUP.md) for detailed setup guide for others.
