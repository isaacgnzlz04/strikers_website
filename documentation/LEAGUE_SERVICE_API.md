# League Service API Reference

## Quick Start

```javascript
import { leagueService } from '../services/leagueService';

// Get all active leagues
const leagues = await leagueService.getAllLeagues(true);

// Get specific league
const league = await leagueService.getLeague('Monday Night Mixed');

// Get weeks for a league
const weeks = await leagueService.getWeeksForLeague('Monday Night Mixed');

// Get PDF for a specific week
const pdf = await leagueService.getPDF('Monday Night Mixed', 15);

// Get standings
const standings = await leagueService.getStandings('Monday Night Mixed', 15);
```

## Methods

### `getAllLeagues(activeOnly = false)`
Fetches all leagues from Airtable.

**Parameters:**
- `activeOnly` (boolean) - If true, only returns active leagues

**Returns:** `Promise<Array<League>>`

**Example:**
```javascript
const activeLeagues = await leagueService.getAllLeagues(true);
```

**League Object Structure:**
```javascript
{
  id: 'rec123',
  name: 'Monday Night Mixed',
  format: 'Mixed',
  day: 'Monday',
  time: '6:30 PM',
  totalWeeks: 32,
  currentWeek: 15,
  season: 'Fall 2025',
  active: true,
  description: 'Competitive mixed league...',
  entryFee: 250,
  maxTeams: 24,
  photo: 'https://...'
}
```

---

### `getLeague(leagueName)`
Fetches a single league by name.

**Parameters:**
- `leagueName` (string) - The exact name of the league

**Returns:** `Promise<League|null>`

**Example:**
```javascript
const league = await leagueService.getLeague('Tuesday Women\'s Classic');
```

---

### `getWeeksForLeague(leagueName)`
Fetches all weeks for a specific league.

**Parameters:**
- `leagueName` (string) - The name of the league

**Returns:** `Promise<Array<Week>>`

**Example:**
```javascript
const weeks = await leagueService.getWeeksForLeague('Monday Night Mixed');
```

**Week Object Structure:**
```javascript
{
  id: 'rec456',
  leagueName: 'Monday Night Mixed',
  week: 15,
  weekNumber: 15,
  weekDate: '2025-10-27',
  pdfUrl: 'https://dl.airtable.com/...',
  fileName: 'Week 15.pdf',
  notes: 'Special tournament week'
}
```

---

### `getPDF(leagueName, weekNumber)`
Fetches PDF data for a specific league and week.

**Parameters:**
- `leagueName` (string) - The name of the league
- `weekNumber` (number) - The week number

**Returns:** `Promise<PDF|null>`

**Example:**
```javascript
const pdf = await leagueService.getPDF('Monday Night Mixed', 15);
if (pdf) {
  window.open(pdf.pdfData, '_blank'); // Open PDF in new tab
}
```

**PDF Object Structure:**
```javascript
{
  id: 'rec789',
  league: 'Monday Night Mixed',
  week: 15,
  pdfData: 'https://dl.airtable.com/...', // Direct URL to PDF
  fileName: 'Monday-Night-Mixed-Week-15.pdf'
}
```

---

### `getStandings(leagueName, weekNumber = null)`
Fetches standings for a specific league and optionally a specific week.

**Parameters:**
- `leagueName` (string) - The name of the league
- `weekNumber` (number|null) - The week number (optional, gets all if null)

**Returns:** `Promise<Array<Standing>>`

**Example:**
```javascript
// Get standings for specific week
const weekStandings = await leagueService.getStandings('Monday Night Mixed', 15);

// Get all standings for league
const allStandings = await leagueService.getStandings('Monday Night Mixed');
```

**Standing Object Structure:**
```javascript
{
  id: 'rec101',
  leagueName: 'Monday Night Mixed',
  weekNumber: 15,
  teamName: 'Strike Force',
  teamPosition: 1,
  gamesPlayed: 60,
  wins: 45,
  losses: 15,
  points: 90,
  pins: 54320,
  highGame: 289,
  highSeries: 789,
  average: 205.5,
  notes: 'Season leaders'
}
```

---

### `getDefaultLeagues()`
Returns hardcoded default leagues (fallback data).

**Returns:** `Array<League>`

**Example:**
```javascript
const defaults = leagueService.getDefaultLeagues();
```

---

## Error Handling

All methods include built-in error handling and logging. If Airtable is unavailable:

- `getAllLeagues()` returns default leagues
- `getLeague()` returns `null`
- `getWeeksForLeague()` returns empty array `[]`
- `getPDF()` returns `null`
- `getStandings()` returns empty array `[]`

**Example with Error Handling:**
```javascript
try {
  const leagues = await leagueService.getAllLeagues(true);
  
  if (leagues.length === 0) {
    console.log('No active leagues found');
    // Use defaults
    const defaults = leagueService.getDefaultLeagues();
  }
} catch (error) {
  console.error('Failed to fetch leagues:', error);
  // Fallback to defaults
  const defaults = leagueService.getDefaultLeagues();
}
```

---

## Caching

All Airtable requests are cached for 30 minutes by default. To force a refresh:

```javascript
// Clear all Airtable cache
import { clearAirtableCache } from '../lib/airtable';
clearAirtableCache();

// Then fetch fresh data
const leagues = await leagueService.getAllLeagues();
```

---

## Usage in Components

### Example: Display Leagues List

```jsx
import { useState, useEffect } from 'react';
import { leagueService } from '../services/leagueService';

function LeaguesList() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeagues() {
      try {
        const data = await leagueService.getAllLeagues(true);
        setLeagues(data);
      } catch (error) {
        console.error('Error loading leagues:', error);
      } finally {
        setLoading(false);
      }
    }
    loadLeagues();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {leagues.map(league => (
        <div key={league.id}>
          <h3>{league.name}</h3>
          <p>{league.day} at {league.time}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example: Display Standings with PDF

```jsx
import { useState, useEffect } from 'react';
import { leagueService } from '../services/leagueService';

function StandingsViewer({ leagueName }) {
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    async function loadWeeks() {
      const data = await leagueService.getWeeksForLeague(leagueName);
      setWeeks(data);
      if (data.length > 0) {
        setSelectedWeek(data[data.length - 1].weekNumber);
      }
    }
    loadWeeks();
  }, [leagueName]);

  const viewPDF = async () => {
    const pdf = await leagueService.getPDF(leagueName, selectedWeek);
    if (pdf) {
      window.open(pdf.pdfData, '_blank');
    }
  };

  return (
    <div>
      <select onChange={(e) => setSelectedWeek(Number(e.target.value))}>
        {weeks.map(week => (
          <option key={week.id} value={week.weekNumber}>
            Week {week.weekNumber}
          </option>
        ))}
      </select>
      <button onClick={viewPDF}>View PDF</button>
    </div>
  );
}
```

---

## Migration from standingsDB

**Old Code:**
```javascript
import { getAllLeagues, getPDF, getWeeksForLeague } from '../utils/standingsDB';

const leagues = await getAllLeagues();
const activeLeagues = leagues.filter(l => l.active);
```

**New Code:**
```javascript
import { leagueService } from '../services/leagueService';

const activeLeagues = await leagueService.getAllLeagues(true);
```

---

## Testing

To test without Airtable configured:

1. The service will automatically fall back to default leagues
2. Check browser console for error messages
3. Verify fallback data displays correctly

**Testing Checklist:**
- [ ] Leagues display correctly
- [ ] Week selection works
- [ ] PDF viewing works
- [ ] Fallback to defaults works
- [ ] Error handling is graceful
- [ ] Loading states display properly

---

## Environment Variables

Required in `.env.local`:

```env
VITE_AIRTABLE_API_KEY=your_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_ENABLE_AIRTABLE=true
```

---

## Related Documentation

- `AIRTABLE_BACKEND_SETUP.md` - Complete setup guide
- `LEAGUE_AIRTABLE_MIGRATION.md` - Migration overview
- `STANDINGS_GUIDE.md` - User guide for standings
