# How to Add Resume PDF to Public Folder

## ✅ Best Practices

### 1. Copy Your PDF Correctly
```bash
# Replace /path/to/your/resume.pdf with the actual path to your valid PDF
cp /path/to/your/resume.pdf public/resume.pdf

# Or use rsync for better safety
rsync -a /path/to/your/resume.pdf public/resume.pdf
```

### 2. Verify the PDF is Valid
```bash
# Check file type
file public/resume.pdf
# Should output: "PDF document, version X.X, X page(s)"

# Check for corruption
pdftotext public/resume.pdf - 2>&1
# Should extract text without errors
```

### 3. Commit to Git
```bash
git add public/resume.pdf .gitattributes
git commit -m "Add resume PDF"
```

### 4. Test in Browser
```bash
npm run dev
# Visit http://localhost:3000/resume.pdf
```

## ❌ Common Mistakes to Avoid

1. **Don't** open the PDF in a code editor (like VS Code) and save it
2. **Don't** copy/paste binary data - always use file system commands
3. **Don't** use text editors - PDFs are binary files
4. **Do** use `cp` or `rsync` command-line tools
5. **Do** verify with `file` or `pdftotext` after copying

## 🔧 If PDF Gets Corrupted

The `.gitattributes` file ensures Git treats PDFs as binary. If corruption happens:

1. Delete the corrupted file: `rm public/resume.pdf`
2. Copy a fresh version from your source
3. Verify with `file public/resume.pdf`
4. Re-commit

## 📝 Notes

- The PDF file size is ~16KB
- It should be 1-2 pages
- Always test download functionality after adding the file

