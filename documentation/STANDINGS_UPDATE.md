# League Standings System - Simplified Version

## Changes Made

### Overview
The League Standings system has been simplified. Instead of parsing PDF data, the system now:
1. **Admin Panel**: Allows admins to upload PDF files directly
2. **Standings Page**: Displays the uploaded PDFs using an embedded viewer

### Files Modified

#### 1. **admin.html** (Simplified)
- **Location**: `public/admin.html`
- **Backup**: Old version saved as `public/admin-old.html`

**Key Changes**:
- Removed PDF parsing logic (pdfjs-dist)
- Removed CSV manual entry
- Simplified to just PDF upload and storage
- PDFs are stored as base64 in localStorage
- Each league has its own PDF storage: `pdf_${leagueName}` and `pdf_name_${leagueName}`

**Features**:
- Password protection (strikers2025)
- League selector (5 leagues)
- Drag & drop PDF upload
- Preview uploaded PDF in new tab
- Remove PDF functionality
- Clean, modern UI

#### 2. **StandingsPage.jsx** (Updated)
- **Location**: `src/components/StandingsPage.jsx`

**Key Changes**:
- Removed table-based standings display
- Added embedded PDF viewer using `<embed>` tag
- Loads PDF from localStorage as base64 data
- Shows empty state when no PDF is uploaded

**Features**:
- GSAP animations (entrance, exit, league switching)
- MagicButton components for league selection
- Responsive PDF viewer (600px height)
- Professional "no data" state with icon
- Smooth transitions between leagues

### How It Works

#### For Admin Users:
1. Navigate to `/admin.html`
2. Login with password: `strikers2025`
3. Select a league from the buttons
4. Upload a PDF file (drag & drop or click)
5. Preview or remove PDFs as needed
6. PDFs are stored in browser localStorage

#### For End Users:
1. Click "Standings" in navigation or leagues section
2. Select a league from the modal
3. View the embedded PDF standings
4. If no PDF is uploaded, see a friendly empty state

### Storage Format

**localStorage Keys**:
- `pdf_Monday Night Open` - Base64 PDF data
- `pdf_name_Monday Night Open` - Original filename
- (Same pattern for all 5 leagues)

### Benefits of This Approach

1. **Simplicity**: No complex PDF parsing logic
2. **Reliability**: No parsing errors or format issues
3. **Flexibility**: Any PDF format works
4. **Maintainability**: Less code to maintain
5. **User Experience**: Direct PDF viewing, just like opening a file

### Browser Compatibility

- The `<embed>` tag is supported in all modern browsers
- Falls back gracefully if PDF viewer is not available
- Mobile devices may open PDF in native viewer

### Future Enhancements (Optional)

If needed, you could add:
- Server-side storage instead of localStorage
- PDF file size validation
- Multiple PDF pages support
- Download PDF button
- Print functionality

### Testing

To test the system:
1. Start the dev server
2. Navigate to `/admin.html`
3. Login and upload a test PDF for a league
4. Go back to main site
5. Open Standings modal
6. Select the league and verify PDF displays

### Notes

- localStorage has a ~5-10MB limit per domain
- Large PDFs may not store properly
- Consider server storage for production use
- The old admin.html is backed up as admin-old.html
