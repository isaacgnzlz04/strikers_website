# League Configuration System

## Overview
Complete league management system that allows bowling alley admins to configure all league details without touching code.

## Features

### For Administrators

**League Management Page (`/admin-leagues.html`)**
- ➕ Add new leagues
- ✏️ Edit existing leagues  
- 🔒 Activate/Deactivate leagues
- 🗑️ Delete leagues (with all data)
- View all league configurations

**Configurable League Properties:**
- **Name**: League display name
- **Day**: Day of the week
- **Time**: Start time
- **Format**: Open, Men's, Ladies, Mixed, Youth, Seniors, Other
- **Total Weeks**: Number of weeks in season (1-52)
- **Description**: Brief description
- **Active Status**: Show/hide from public

### For Users

**Standings Page**
- Only shows active leagues
- Dynamically updates when leagues change
- Week selector per league
- Download/View PDFs

## Database Structure

### Leagues Store
```javascript
{
  name: "Monday Night Open",        // Primary key
  day: "Monday",
  time: "7:00 PM",
  format: "Open",
  totalWeeks: 30,
  description: "Open to all bowlers",
  active: true
}
```

## Usage Guide

### Initial Setup

1. **Access Admin Panel**
   - Go to `/admin.html`
   - Login with password: `strikers2025`
   
2. **Configure Leagues**
   - Click "⚙️ Manage Leagues" button
   - Default 5 leagues are pre-configured
   - Edit, add, or remove as needed

### Adding a New League

1. Click "➕ Add New League"
2. Fill in all required fields:
   - League Name (required)
   - Day of Week (required)
   - Start Time (required)
   - Format (required)
   - Total Weeks (required, 1-52)
   - Description (optional)
   - Active status (checkbox)
3. Click "Save League"

### Editing a League

1. Find the league card
2. Click "✏️ Edit"
3. Modify fields (name cannot be changed)
4. Click "Save League"

### Deactivating a League

- Click "🔒 Deactivate" on league card
- League hidden from public but data preserved
- Can reactivate later with "✅ Activate"

### Deleting a League

1. Click "🗑️ Delete" on league card
2. Confirm twice (permanent action)
3. All PDFs and standings data deleted
4. Cannot be undone

## Default Leagues

The system includes 5 pre-configured leagues:

1. **Monday Night Open**
   - Day: Monday, 7:00 PM
   - Format: Open
   - 30 weeks

2. **Tuesday Night Ladies**
   - Day: Tuesday, 6:30 PM
   - Format: Ladies
   - 30 weeks

3. **Wednesday Night Mixed**
   - Day: Wednesday, 7:00 PM
   - Format: Mixed
   - 30 weeks

4. **Church League**
   - Day: Thursday, 6:00 PM
   - Format: Mixed
   - 24 weeks

5. **Youth**
   - Day: Saturday, 10:00 AM
   - Format: Youth
   - 20 weeks

## Integration

### Admin Standings Page

- Loads active leagues from database
- Shows "No Active Leagues" if none configured
- Direct link to league management
- Only shows active leagues in selector

### Public Standings Modal

- Dynamically loads active leagues
- League selector updates automatically
- Shows league info from configuration
- Filters out inactive leagues

## Technical Details

### Files Modified

1. **src/utils/standingsDB.js**
   - Added `getAllLeagues()`
   - Added `getLeague(name)`
   - Added `saveLeague(config)`
   - Added `deleteLeague(name)`
   - Database version bumped to 2

2. **public/admin.html**
   - Dynamic league loading
   - Link to league management
   - Default leagues initialization
   - Migrated from hardcoded array

3. **public/admin-leagues.html** (NEW)
   - Full league CRUD interface
   - Modal-based editing
   - Responsive grid layout
   - Status indicators

4. **src/components/StandingsPage.jsx**
   - Dynamic league loading
   - Uses league configurations
   - Filters active leagues only

### Database Schema

**Version 2** adds:
- `leagues` object store
  - Key: `name` (string)
  - Indexed by: name (primary key)

### Data Flow

```
1. Admin adds/edits league → IndexedDB leagues store
2. Admin uploads PDF → IndexedDB pdfs store
3. User opens standings → Load active leagues from IndexedDB
4. User selects league → Load weeks from IndexedDB
5. User selects week → Load PDF from IndexedDB
```

## Customization Examples

### Add Summer League
```javascript
{
  name: "Summer Special",
  day: "Friday",
  time: "8:00 PM",
  format: "Mixed",
  totalWeeks: 12,
  description: "Summer fun league",
  active: true
}
```

### Add Kids League
```javascript
{
  name: "Junior Bowlers",
  day: "Saturday",
  time: "9:00 AM",
  format: "Youth",
  totalWeeks: 16,
  description: "Ages 8-12",
  active: true
}
```

### Seasonal Leagues
- Set `active: false` during off-season
- Reactivate when season starts
- Data persists year-round

## Benefits

✅ **No Code Changes**: All changes through admin panel
✅ **Flexible**: Add unlimited leagues
✅ **Safe**: Confirmation on destructive actions
✅ **Organized**: Clear visual interface
✅ **Scalable**: Handles dozens of leagues
✅ **Maintainable**: Easy for non-technical staff

## Maintenance

### Adding Formats
Edit dropdown in `admin-leagues.html`:
```html
<option value="NewFormat">New Format</option>
```

### Backup Leagues
Use browser dev tools:
```javascript
// Export all leagues
const leagues = await getAllLeagues();
console.log(JSON.stringify(leagues, null, 2));

// Import leagues
leagues.forEach(league => await saveLeague(league));
```

### Reset to Defaults
1. Go to `/admin-leagues.html`
2. Delete all existing leagues
3. Refresh page - defaults restore automatically

## Security Notes

- Admin access protected by password
- Password: `strikers2025` (change in both admin files)
- All data stored client-side (IndexedDB)
- No server authentication needed
- Data persists in user's browser

## Future Enhancements

- 🔄 Import/Export league configurations
- 📊 League statistics dashboard
- 📅 Schedule management
- 👥 Team management per league
- 📧 Email notification configuration
- 🏆 Championship tracking
