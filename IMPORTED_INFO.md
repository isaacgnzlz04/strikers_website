# Main Lee Strikers Information Import

**Date:** October 15, 2025  
**Source:** www.mainleestrikers.com

## Imported Information

### 📍 Contact & Location
- **Name:** Strikers Bowling Alley (Mainlee Strikers, LLC)
- **Address:** 3700 W. Main St., Russellville, AR 72801
- **Website:** https://www.mainleestrikers.com

### 🕐 Hours of Operation
| Day | Hours |
|-----|-------|
| Sunday | 1:00 PM – 8:00 PM |
| Monday | 4:30 PM – 10:00 PM |
| Tuesday | 4:30 PM – 10:00 PM |
| Wednesday | 4:30 PM – 10:00 PM |
| Thursday | 4:30 PM – 10:00 PM |
| Friday | 4:30 PM – 11:00 PM |
| Saturday | 1:00 PM – 11:00 PM |

### 🎳 Facilities & Amenities

#### 1. Bowling Lanes
- Professional bowling lanes with bumpers
- Child-friendly equipment
- Lightweight bowling balls
- Smaller shoe sizes available
- Part of America's #1 participation activity (70+ million annually)

#### 2. Strikers Arcade
- **30+ arcade games** for all age groups
- **New card-based system** (no tickets or tokens)
- Games include:
  - Pool tables
  - Race cars
  - Skee-ball
  - Basketball
  - Space Invaders
  - Crane games
  - Redemption counter
- Frequent new game additions
- Open during all regular business hours

#### 3. Sports Bar & Grill
- Multiple TVs for sports viewing
- Full food menu
- Bar service
- Family-friendly atmosphere

### 🎯 Special Programs

#### Strikers Youth League
- Youth bowling league for kids
- Active program
- More info: https://mainleestrikers.com/youth/

#### Bowlability
- **Inclusive environment** for all ages and abilities
- **Free bowling** (one game + shoes included)
- Hang out with friends in community setting
- **Limited attendance** - registration required
- Partner: Autism Ability Advocates Inc.
- Info: https://www.autismabilityadvocatesinc.org/

### 🏆 League Information

**Philosophy:** "Whether you're new to the sport or a seasoned bowler, Strikers makes it easy to find the league to match your interests and skill level."

**League Types:**
- Traditional bowling leagues
- Senior leagues
- Mixed leagues
- Family leagues
- Kids leagues
- Specialty leagues
- Custom leagues (create your own!)

**Team Structure:**
- 3-5 members per team
- All men, all women, or mixed formats

**Handicap System:**
- Unique system that evens the field
- Lower averages get more handicap pins
- Everyone has a shot at winning

**End of Season:**
- Prizes and awards
- Cash prizes in some leagues

**Help Available:**
- Don't have a team? They'll match you with others
- Staff helps find the right league for you

**Example League - Monday Night Open:**
- 32 weeks
- Meeting: August 25, 2025 at 6:30 PM
- Start: September 8, 2025 at 6:20 PM
- End: May 2026

### 📊 Additional Resources
- League Standings: https://mainleestrikers.com/league-standings/
- Honor Scores: https://mainleestrikers.com/honor-scores/

## Where This Information Is Used

### Updated Components:
1. **src/data/bowlingAlleyInfo.js** (NEW)
   - Centralized data file with all bowling alley information
   - Includes helpers for formatting and display

2. **Footer.jsx**
   - Real address, hours, and description
   - Copyright with legal name

3. **ContactSection.jsx**
   - Real address broken down by street/city/state/zip
   - Website link instead of phone number
   - Full hours of operation

4. **AboutSection.jsx**
   - Real tagline and mission
   - Arcade game count
   - Participation statistics
   - Marketing messages

5. **FacilitiesSection.jsx** (NEW)
   - Complete facility showcase
   - 3 main amenities with features
   - Special programs section
   - Links to external resources

6. **App.jsx**
   - Added FacilitiesSection to page flow

## Data Structure

All information is exported from `src/data/bowlingAlleyInfo.js`:

```javascript
import bowlingAlleyInfo from '../data/bowlingAlleyInfo';

// Access examples:
bowlingAlleyInfo.address.full
bowlingAlleyInfo.hours.friday
bowlingAlleyInfo.facilities
bowlingAlleyInfo.specialPrograms
bowlingAlleyInfo.leagueInfo
```

## Benefits

✅ **Single source of truth** - All alley info in one file  
✅ **Easy updates** - Change once, updates everywhere  
✅ **Real data** - No more placeholder content  
✅ **Professional** - Matches actual business information  
✅ **Expandable** - Easy to add more info as needed  

## Next Steps

Consider adding:
- Phone number if available
- Social media links (Facebook, Instagram, etc.)
- Photos/images from the venue
- Menu items for the bar & grill
- Pricing details
- Event package information
- Staff bios
- Customer testimonials
