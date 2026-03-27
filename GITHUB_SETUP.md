# GitHub Setup & Sharing Guide

## 🚀 How to Push Your Project to GitHub

### Step 1: Create a GitHub Account
- Go to https://github.com/
- Sign up (free)

### Step 2: Create a New Repository
1. Go to https://github.com/new
2. Name it: `ai-ticket-dashboard`
3. Add description: "AI Ticket Dashboard for analyzing support tickets"
4. Choose **Public** (so others can access it)
5. Click "Create repository"

### Step 3: Copy Your Repository Link
After creating, you'll see something like:
```
https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git
```
Keep this link handy.

### Step 4: Initialize Git in Your Project
Open PowerShell or Command Prompt in your project folder:

```bash
cd c:\Users\JOSHI\Downloads\ai-ticket-dashboard-main
```

Then run these commands in order:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: AI Ticket Dashboard with multi-file support"

# Rename branch to main (GitHub standard)
git branch -M main

# Add your GitHub repository link
git remote add origin https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git

# Push your code to GitHub
git push -u origin main
```

**Replace** `YOUR-USERNAME` with your actual GitHub username.

### Step 5: Verify on GitHub
1. Go to your repository on GitHub: https://github.com/YOUR-USERNAME/ai-ticket-dashboard
2. You should see all your project files

---

## 👥 How Others Can Run It On Their PC

### They Need to Do This (One time only):

#### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git
cd ai-ticket-dashboard
```

#### Step 2: Install Node.js
If not already installed:
- Go to https://nodejs.org/
- Download **LTS version**
- Install it

#### Step 3: Install Dependencies
```bash
npm install
```

This reads `package.json` and installs:
- express
- exceljs
- csv-parser
- multer
- All other dependencies

#### Step 4: Start the Server
```bash
npm start
```

#### Step 5: Open in Browser
- Dashboard: http://localhost:3000
- Upload page: http://localhost:3000/upload.html

**That's it!** They can now use the dashboard.

---

## 📋 Sharing Checklist

Before pushing to GitHub, ensure:

✅ **Include these files:**
- ✓ package.json (defines dependencies)
- ✓ package-lock.json (locks versions)
- ✓ .gitignore (prevents uploading large folders)
- ✓ README.md (project overview)
- ✓ SETUP.md (setup instructions)
- ✓ All HTML, JS, and CSS files

❌ **Don't include these:**
- ✗ node_modules/ (too large, users install with npm install)
- ✗ uploads/ (temporary folder)
- ✗ dashboard-results.json (generated dynamically)
- ✗ .env files (if you have any)

---

## 🔄 After Pushing to GitHub

### Making Updates

When you make changes locally and want to push them:

```bash
# See what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Fixed upload bugs and improved UI"

# Push to GitHub
git push
```

### Others Updating Their Copy

When you push updates, others can get them with:
```bash
git pull
```

---

## 📚 What `.gitignore` Does

The `.gitignore` file tells GitHub to ignore:
- `node_modules/` → Too large to upload (users install it)
- `uploads/` → Temporary files
- `dashboard-results.json` → Auto-generated files
- `*.log` → Log files
- System files

**This keeps your repository small and clean!**

---

## 🎯 Complete Sharing Workflow

### For You (First Time):
```bash
cd c:\Users\JOSHI\Downloads\ai-ticket-dashboard-main

git init
git add .
git commit -m "Initial commit: AI Ticket Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git
git push -u origin main
```

### For Others (To Run):
```bash
git clone https://github.com/YOUR-USERNAME/ai-ticket-dashboard.git
cd ai-ticket-dashboard
npm install
npm start
```

### For You (To Update):
```bash
# Make changes...
git add .
git commit -m "Description of changes"
git push
```

### For Others (To Get Updates):
```bash
git pull
```

---

## 🔐 Important Notes

1. **Keep `.gitignore` in your repo** - It prevents uploading 1000+ MB of node_modules
2. **Don't manually delete `.gitignore`** - Or your repo will be huge
3. **One-time npm install** - Others only do this once
4. **No credentials in code** - Don't hardcode passwords/API keys

---

## 🚀 Quick Summary

```
YOU:
  1. Create GitHub repo
  2. git init + git push
  3. Share GitHub link

THEM:
  1. git clone YOUR-LINK
  2. npm install (once)
  3. npm start
  4. Open http://localhost:3000
```

---

## 📞 Helpful Links

- **GitHub Docs:** https://docs.github.com/
- **Git Commands:** https://git-scm.com/docs
- **Node.js Download:** https://nodejs.org/
- **npm Help:** https://docs.npmjs.com/

---

## ❓ Common Issues

### Issue: "git is not recognized"
**Solution:** Git not installed or not in PATH
- Install from https://git-scm.com/
- Restart Command Prompt

### Issue: "Permission denied" when pushing
**Solution:** Your SSH keys aren't set up
- Use HTTPS link instead of SSH
- Or follow: https://docs.github.com/en/authentication

### Issue: Repository is too large
**Solution:** You probably committed node_modules/
- Delete the repository on GitHub
- Run `git init` fresh with proper `.gitignore`
- Push again

---

**Now you're ready to share your dashboard with others!** 🎉

For detailed setup instructions others should follow, send them to [SETUP.md](SETUP.md)
