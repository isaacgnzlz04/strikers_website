# 📊 Standings Management Guide for Strikers Bowling Staff

## Overview
Your website now has an easy-to-use system for managing league standings. No coding required!

---

## 🔐 Admin Access

### Password
Default password: `strikers2025`

**IMPORTANT:** Change this password in the code for security!
- Open `src/components/AdminStandingsPage.jsx`
- Find line: `const ADMIN_PASSWORD = 'strikers2025';`
- Change to your secure password

### Admin URL
Access the admin panel at: **`/admin-standings`**

Or click the link at the bottom of the public standings page.

---

## 📝 How to Update Standings

### Step 1: Login
1. Navigate to `/admin-standings` or use the link
2. Enter the admin password
3. Click "Login"

### Step 2: Select League
Choose which league to update from the buttons at the top:
- Monday Night Open
- Tuesday Night Ladies
- Wednesday Night Mixed
- Church League
- Youth

### Step 3: Add Data (TWO EASY OPTIONS!)

#### 🎯 OPTION A: Upload PDF (Recommended for LeagueSecretary)
**If you use LeagueSecretary or have a PDF with standings:**

1. Click **"📤 Upload PDF"** button
2. Select your PDF file
3. Wait a few seconds while the system extracts the data
4. Review the extracted data in the text box
5. Make any needed adjustments
6. Click "Save Standings"

✨ **That's it!** The system automatically reads your PDF and fills in the standings.

#### 📝 OPTION B: Enter Manually
Enter standings in this simple format (one team/player per line):

```
Rank, Team/Player Name, Wins, Losses, Points, Average
```

**Example:**
```
1, Strike Force, 12, 3, 36, 215
2, Pin Crushers, 10, 5, 30, 205
3, Spare Me, 9, 6, 27, 198
4, Gutter Gang, 8, 7, 24, 192
5, Alley Cats, 6, 9, 18, 185
```

### Step 4: Save
Click "Save Standings" - Done! The standings are now live.

---

## 💡 Tips

### 🏆 Best Method: PDF Upload from LeagueSecretary
- Export standings from LeagueSecretary as PDF
- Upload directly - no typing needed!
- System automatically extracts all data
- Works with most bowling league software PDFs

### Easy Data Entry from Spreadsheets
1. Have your standings in Excel/Google Sheets? 
2. Format columns: Rank | Name | Wins | Losses | Points | Average
3. Copy all rows
4. Paste directly into the text box
5. Save!

### Updating Existing Standings
- When you select a league, existing standings will load automatically
- Edit the text and save to update
- No need to retype everything!

### Clearing Standings
- Click "Clear Standings" to remove all data for that league
- Useful for starting a new season

---

## 👀 How Users See Standings

Users can view standings by:
1. Clicking "View League Standings" button on the Leagues section
2. Selecting which league they want to see
3. Viewing a beautiful formatted table

The standings show:
- Rank
- Team/Player Name
- Wins
- Losses  
- Points
- Average

---

## 🔧 Technical Details (Optional)

### Data Storage
- Standings are stored in the browser's **localStorage**
- Data persists across visits
- Each league is stored separately
- No database or backend required

### Future Upgrades Available
Want to enhance the system? Options include:
- **Backend Integration:** Save to a database for multi-device access
- **Excel Upload:** Drag & drop Excel files
- **Automatic Calculations:** Auto-calculate points from wins/losses
- **Historical Data:** Track standings across multiple weeks/seasons
- **Authentication:** More secure login system
- **Email Notifications:** Alert players when standings update

---

## ❓ FAQ

**Q: Does this work with LeagueSecretary PDFs?**
A: Yes! Just upload the PDF and the system extracts the standings automatically.

**Q: What if the PDF doesn't parse correctly?**
A: The system will let you know. You can then manually enter or copy/paste the data.

**Q: What PDF formats are supported?**
A: Most standard PDF formats work, especially from LeagueSecretary, BLS (Bowling League Secretary), and similar software.

**Q: Can multiple staff members access this?**
A: Yes, anyone with the password can access the admin panel.

**Q: What if I make a mistake?**
A: Just edit the text and save again, or re-upload the PDF. Changes are instant.

**Q: Do I need to update all leagues at once?**
A: No, update one league at a time as needed.

**Q: Will old standings be deleted?**
A: No, standings persist until you manually clear or update them.

**Q: Can users edit standings?**
A: No, only staff with the admin password can edit. Users can only view.

---

## 🆘 Support

Need help or want to add features? Contact your web developer with this guide!

---

**Made for Strikers Bowling Alley** 🎳
