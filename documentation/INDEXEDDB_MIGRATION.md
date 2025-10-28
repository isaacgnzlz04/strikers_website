# IndexedDB Migration for League Standings

## Overview
Migrated from localStorage to IndexedDB to support unlimited weeks per league (30+ weeks).

## Why IndexedDB?

### localStorage Limitations:
- **Size**: 5-10MB total across all data
- **Issue**: With 5 leagues × 30 weeks × ~500KB per PDF = ~75MB needed ❌

### IndexedDB Benefits:
- **Size**: 50MB+ guaranteed, can request hundreds of MB
- **Performance**: Better for large binary data
- **Reliability**: Proper database with transactions
- **Scalability**: Can handle 30+ weeks per league easily ✅

## Storage Capacity

**Previous (localStorage):**
- ~5-10MB total
- Enough for ~10-20 PDFs max

**Current (IndexedDB):**
- 50MB+ guaranteed minimum
- Can store 100+ PDFs easily
- Auto-requests more storage if needed

## Implementation Details

### Database Structure
- **Database Name**: `StrikersStandingsDB`
- **Version**: 1

### Object Stores:

1. **pdfs** - Stores PDF files
   - Key: `{league}_{week}` (e.g., "Monday Night Open_Week 1")
   - Fields:
     - `id`: Primary key
     - `league`: League name
     - `week`: Week label
     - `fileName`: Original filename
     - `pdfData`: Base64 encoded PDF
     - `uploadDate`: ISO timestamp

2. **weeks** - Stores week metadata per league
   - Key: `league` name
   - Fields:
     - `league`: Primary key (league name)
     - `weeks`: Array of week objects
       - `week`: Week label
       - `fileName`: PDF filename
       - `uploadDate`: ISO timestamp

### Migration Process
- Automatic on first load after update
- Moves data from `localStorage` → `IndexedDB`
- Cleans up old localStorage entries
- Sets `migrated_to_indexeddb` flag

## File Size Limits
- **Recommended**: < 10MB per PDF
- **Reason**: Browser performance and storage quotas
- Most standings PDFs: 200KB - 2MB (plenty of room!)

## Admin Panel Features

### New Features:
1. **Storage Usage Display**
   - Shows: Used MB / Total MB
   - Shows: Percentage used
   - Color coded: Blue (normal), Red (>80%)

2. **Week Management**
   - Text input for week labels (flexible naming)
   - Upload multiple PDFs per league
   - Preview/Remove individual weeks
   - Natural sorting (Week 1, Week 2, etc.)

3. **Clear All Data**
   - Emergency cleanup button
   - Double confirmation
   - Removes all PDFs and metadata

### User Interface:
```
Storage Used: 12.5 MB / 100 MB (12.5%)

[League Selector Buttons]

Week Label: [Week 1     ]
[Upload Area - Drag & Drop]

📋 Uploaded Standings:
- Week 1: standings.pdf [Preview] [Remove]
- Week 2: week2.pdf [Preview] [Remove]
- Week 3: finals.pdf [Preview] [Remove]

[🗑️ Clear All League Data]
```

## User-Facing Changes

### StandingsPage.jsx
- Week selector dropdown (if multiple weeks exist)
- Auto-selects most recent week
- Smooth transitions when switching weeks
- Same View/Download functionality

### Week Selection UI:
```
[Monday Night] [Tuesday Ladies] [Wednesday Mixed]...

Select Week: [Week 1] [Week 2] [Week 3] [Finals]

📄 Monday Night Open - Week 3
standings-week3.pdf

[👁️ View PDF] [📥 Download PDF]
```

## Browser Compatibility
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support (iOS 10+)
- ✅ All modern browsers (2015+)

## Technical Notes

### API Functions:
- `initDB()` - Initialize database connection
- `getWeeksForLeague(league)` - Get weeks array
- `saveWeeksForLeague(league, weeks)` - Save weeks metadata
- `savePDF(league, week, fileName, pdfData)` - Store PDF
- `getPDF(league, week)` - Retrieve PDF
- `removePDF(league, week)` - Delete PDF
- `getStorageUsage()` - Get quota usage

### Error Handling:
- Graceful fallback messages
- Console logging for debugging
- User-friendly error messages
- Automatic cleanup on failures

## Testing Checklist
- [x] Migration from localStorage
- [x] Upload PDF with week label
- [x] View PDF in new tab
- [x] Download PDF
- [x] Remove individual PDF
- [x] Switch between leagues
- [x] Switch between weeks
- [x] Storage usage display
- [x] Clear all data
- [x] Handle no PDFs state
- [x] Handle single week (no selector)
- [x] Handle multiple weeks (show selector)

## Deployment Notes
1. No server changes needed (client-side only)
2. Existing localStorage data auto-migrates
3. Users keep existing PDFs on update
4. No data loss during migration
5. Backward compatible

## Future Enhancements
- Export/Import all standings
- Bulk upload (multiple PDFs at once)
- PDF compression before storage
- Cloud backup option
- Search functionality across weeks
