# PDF Upload Feature - Technical Details

## 📄 How It Works

### PDF Processing Flow
1. User uploads PDF file
2. PDF.js library reads and extracts text from all pages
3. Smart parsing algorithms detect standings data
4. Data is formatted into CSV format
5. Auto-fills the text area for review
6. User can edit if needed and save

### Parsing Methods

The system uses **multiple parsing strategies** to handle different PDF formats:

#### Method 1: Pattern Matching
Looks for common patterns like:
- `1. Team Name 12 3 36 215`
- `1 Team Name 12 3 36 215`
- Number followed by name and stats

#### Method 2: Delimiter Detection
Handles various delimiters:
- Multiple spaces (2 or more)
- Tab characters
- Mixed spacing

#### Method 3: Column Detection
Identifies columns based on:
- Position in line
- Numeric vs. text patterns
- Consistent spacing across lines

### Supported Software

✅ **Tested with:**
- LeagueSecretary
- BLS (Bowling League Secretary)
- CDE Software TM-100
- Most standard bowling league PDFs

### What Gets Extracted

From each line, the system extracts:
1. **Rank** - Position (1, 2, 3, etc.)
2. **Team/Player Name** - Full name
3. **Wins** - Number of wins
4. **Losses** - Number of losses
5. **Points** - Total points
6. **Average** - Bowling average

### Fallback Options

If automatic extraction fails:
- User gets a clear error message
- Manual entry is still available
- Can copy/paste from PDF viewer
- Excel/Sheets import still works

## 🔧 Technical Implementation

### Libraries Used
- **pdfjs-dist** - Mozilla's PDF.js library
- Version: Latest stable
- Worker: CDN-hosted for performance

### Code Features
- Async/await for smooth processing
- Progress indicators during extraction
- Error handling with user feedback
- Multiple parsing attempts for accuracy
- Preserves original data if extraction fails

### Browser Compatibility
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Modern mobile browsers

## 📊 Example PDF Formats Handled

### Format 1 - LeagueSecretary Standard
```
Rank  Team Name          W   L   Pts  Avg
1     Strike Force      12   3   36   215
2     Pin Crushers      10   5   30   205
```

### Format 2 - Tabulated
```
1	Strike Force	12	3	36	215
2	Pin Crushers	10	5	30	205
```

### Format 3 - Spaced Columns
```
 1    Strike Force       12  3   36   215
 2    Pin Crushers       10  5   30   205
```

All these formats are automatically detected and parsed!

## 🚀 Future Enhancements

Potential upgrades:
- OCR support for scanned PDFs
- Multi-sheet extraction
- Historical comparison
- Direct software integration APIs
- Automatic scheduling

---

**Built with modern web technologies for maximum compatibility and ease of use!** 🎳
