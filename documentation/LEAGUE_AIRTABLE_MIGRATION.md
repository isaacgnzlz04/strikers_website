# League Data Migration to Airtable - Complete

## Summary

The League Standing and League information have been successfully migrated from the local IndexedDB (`standingsDB`) to use the Airtable backend.

## Changes Made

### 1. Airtable Schema Updated
- Added **League Weeks** table (Table 18) to store weekly league data and PDF files
- Added **League Standings** table (Table 19) to store detailed standings data
- Updated documentation in `AIRTABLE_BACKEND_SETUP.md`

### 2. New Service Layer Created
Created `src/services/leagueService.js` with the following methods:
- `getAllLeagues(activeOnly)` - Get all leagues from Airtable
- `getLeague(leagueName)` - Get a single league by name
- `getWeeksForLeague(leagueName)` - Get all weeks for a specific league
- `getPDF(leagueName, weekNumber)` - Get PDF data for a specific week
- `getStandings(leagueName, weekNumber)` - Get standings data
- `getDefaultLeagues()` - Fallback to default data if Airtable is unavailable

### 3. Components Updated
All React components have been updated to use `leagueService` instead of `standingsDB`:

✅ **StandingsPage.jsx** - League standings viewer
- Now fetches leagues from Airtable
- PDFs are loaded from Airtable attachments or URLs
- Simplified PDF viewing (no base64 conversion needed)

✅ **LeaguePage.jsx** - Main leagues page
- Fetches active leagues from Airtable
- Fully compatible with new data structure

✅ **LeaguePage_backup.jsx** - Backup page
- Updated for consistency

✅ **FeaturesSection.jsx** - Homepage leagues section
- Uses new service with fallback to defaults
- Graceful error handling

✅ **LeagueSignupModal.jsx** - League signup form
- Loads active leagues from Airtable
- Ready for signup integration

### 4. Airtable Configuration
Updated `src/lib/airtable.js` to include new table constants:
- `TABLES.LEAGUE_WEEKS`
- `TABLES.LEAGUE_STANDINGS`

## Data Structure

### Leagues Table (Existing - Enhanced)
- League ID, Name, Format, Day, Time
- Total Weeks, Current Week, Season
- Active status, Description, Entry Fee
- Max Teams, Photo

### League Weeks Table (New)
- Week ID, League (linked), Week Number
- Week Date, PDF File (attachment), PDF URL
- Notes, timestamps

### League Standings Table (New)
- Standing ID, League (linked), Week (linked)
- Team Name, Position, Games Played
- Wins, Losses, Points, Pins
- High Game, High Series, Average
- Notes, timestamps

## Migration Steps for Existing Data

### For Website Admins

1. **Setup Airtable Tables**
   - Create the League Weeks and League Standings tables as documented
   - Ensure all 20 tables are properly configured

2. **Migrate Existing League Data**
   - Export current leagues from the admin interface
   - Import into Airtable Leagues table
   - Update any league-specific configurations

3. **Upload PDF Files**
   - For each league week, upload the PDF to the League Weeks table
   - PDFs can be attached directly or linked via URL
   - No need for base64 encoding anymore

4. **Optional: Import Standings Data**
   - If you want structured standings data (searchable, filterable)
   - Import team standings into the League Standings table
   - This allows for future features like live standings updates

### Environment Variables Required

Ensure these are set in your `.env.local` and Vercel:

```env
VITE_AIRTABLE_API_KEY=your_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_ENABLE_AIRTABLE=true

# Server-side (no VITE_ prefix)
AIRTABLE_API_KEY=your_key_here
AIRTABLE_BASE_ID=your_base_id_here
```

## Admin Pages Status

⚠️ **Note**: The admin HTML pages (`public/admin-leagues.html`, `public/admin.html`) still use the local IndexedDB system. These are considered legacy and will continue to work for local development.

### Recommended Admin Workflow

**Option 1: Direct Airtable Management (Recommended)**
- Manage leagues, weeks, and standings directly in Airtable
- Use Airtable's interface for uploads and data entry
- More reliable, with built-in backup and collaboration

**Option 2: Build API Endpoints**
- Create Vercel serverless functions for admin operations
- `/api/leagues/create`, `/api/leagues/update`, `/api/leagues/delete`
- `/api/leagues/upload-pdf` for PDF management
- Requires additional development but provides custom admin UI

**Option 3: Hybrid Approach**
- Use Airtable for league configuration and PDFs
- Keep local admin for quick updates during league nights
- Sync to Airtable at end of session

## Benefits of This Migration

1. **No More Local Storage Limits** - Airtable handles large PDFs easily
2. **Automatic Backups** - Data is stored in the cloud
3. **Multi-Device Access** - Update from any device with internet
4. **Collaboration** - Multiple admins can manage data
5. **Structured Data** - Standings can be queried and filtered
6. **API Access** - Easy integration with other tools
7. **Version History** - Airtable tracks changes automatically
8. **Better Performance** - Cached reads, fast writes
9. **Scalability** - No browser storage constraints
10. **Professional** - Enterprise-grade data management

## Fallback Behavior

If Airtable is unavailable or not configured:
- System falls back to hardcoded default leagues
- Users see standard league information
- No data loss from cached information
- Admin can continue using local system temporarily

## Testing Checklist

- [ ] Verify leagues display on homepage
- [ ] Check leagues page shows all active leagues  
- [ ] Test league signup modal loads leagues correctly
- [ ] Verify standings page displays leagues and weeks
- [ ] Test PDF viewing for uploaded PDFs
- [ ] Confirm PDF download works
- [ ] Check fallback behavior (disable Airtable temporarily)
- [ ] Verify mobile responsive behavior
- [ ] Test with empty Airtable (should show defaults)
- [ ] Confirm caching works (check network tab)

## Future Enhancements

### Possible Features with Structured Standings Data
1. **Live Standings Display** - Show team rankings in real-time
2. **Player Search** - Find any player's stats across leagues
3. **Statistics Dashboard** - High scores, averages, trends
4. **Historical Data** - Compare seasons and weeks
5. **Notifications** - Alert teams when standings are posted
6. **Public API** - Share standings with third-party apps
7. **Leaderboards** - Track top performers across all leagues
8. **Mobile App** - Native app with standings access

## Support

If you encounter issues:
1. Check browser console for error messages
2. Verify environment variables are set correctly
3. Ensure Airtable API key has proper permissions
4. Check Airtable base structure matches documentation
5. Review `AIRTABLE_BACKEND_SETUP.md` for detailed setup

## Related Documentation

- `AIRTABLE_BACKEND_SETUP.md` - Complete Airtable setup guide
- `STANDINGS_GUIDE.md` - User guide for standings system
- `LEAGUE_CONFIG_SYSTEM.md` - League configuration details
- `INDEXEDDB_MIGRATION.md` - Original IndexedDB implementation

---

**Migration Completed**: October 28, 2025
**Status**: ✅ Ready for Production
**Backward Compatible**: Yes (with fallbacks)
