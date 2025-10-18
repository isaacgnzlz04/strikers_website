/**
 * Main Lee Strikers Bowling Alley Information
 * Imported from: www.mainleestrikers.com
 * Last Updated: October 15, 2025
 */

export const bowlingAlleyInfo = {
  // Basic Information
  name: "Strikers Bowling Alley",
  legalName: "Mainlee Strikers, LLC",
  tagline: "Come see why Strikers Bowling Alley is the best place in town for all of your entertainment needs.",
  
  // Contact Information
  address: {
    street: "3700 W. Main St.",
    city: "Russellville",
    state: "AR",
    zip: "72801",
    full: "3700 W. Main St. Russellville, AR 72801"
  },
  
  // Hours of Operation
  hours: {
    sunday: { open: "1:00 PM", close: "8:00 PM" },
    monday: { open: "4:30 PM", close: "10:00 PM" },
    tuesday: { open: "4:30 PM", close: "10:00 PM" },
    wednesday: { open: "4:30 PM", close: "10:00 PM" },
    thursday: { open: "4:30 PM", close: "10:00 PM" },
    friday: { open: "4:30 PM", close: "11:00 PM" },
    saturday: { open: "1:00 PM", close: "11:00 PM" }
  },
  
  // Formatted hours for display
  hoursFormatted: [
    { day: "Sunday", hours: "1:00 PM – 8:00 PM" },
    { day: "Monday", hours: "4:30 PM – 10:00 PM" },
    { day: "Tuesday", hours: "4:30 PM – 10:00 PM" },
    { day: "Wednesday", hours: "4:30 PM – 10:00 PM" },
    { day: "Thursday", hours: "4:30 PM – 10:00 PM" },
    { day: "Friday", hours: "4:30 PM – 11:00 PM" },
    { day: "Saturday", hours: "1:00 PM – 11:00 PM" }
  ],
  
  // Facilities & Amenities
  facilities: [
    {
      name: "Bowling Lanes",
      description: "Professional bowling lanes with bumpers available",
      features: [
        "Child-friendly bumper bowling",
        "Lightweight bowling balls",
        "Smaller shoe sizes available",
        "70+ million annual participants nationwide"
      ]
    },
    {
      name: "Strikers Arcade",
      description: "Over 30 games with card-based system",
      features: [
        "30+ arcade games",
        "Card swipe system (no tickets/tokens)",
        "Redemption counter",
        "Pool tables",
        "Race cars",
        "Skee-ball",
        "Basketball games",
        "Space Invaders",
        "Crane games",
        "Games for all age groups",
        "Frequent new additions"
      ]
    },
    {
      name: "Sports Bar & Grill",
      description: "Watch sports while you eat and drink",
      features: [
        "Multiple TVs for sports viewing",
        "Full food menu",
        "Bar service",
        "Family-friendly atmosphere"
      ]
    }
  ],
  
  // About / Description
  about: {
    mission: "Dedicated to providing the best in entertainment for bowlers of all ages and skill levels.",
    description: "Strikers Bowling Alley is the premier entertainment destination in Russellville, Arkansas. Whether you're watching sports, eating, drinking, bowling, or playing arcade games, we've got everything you need for a great time. With child-friendly options and activities for all ages, Strikers is perfect for families, leagues, parties, and events.",
    stats: [
      { label: "Lanes", value: "Multiple professional lanes" },
      { label: "Arcade Games", value: "30+" },
      { label: "Entertainment", value: "Bowling, Arcade, Food, Sports" }
    ]
  },
  
  // Special Programs
  specialPrograms: [
    {
      name: "Strikers Youth League",
      description: "Kids ages 5-17 learn bowling fundamentals in a fun environment! Season starts September 13th, 2025 (10 weeks). Parent meeting required September 6th. Contact: strikersyouthleague@gmail.com or 479-968-0877",
      link: "https://mainleestrikers.com/youth/",
      active: true,
      details: {
        startDate: "September 13th, 2025",
        duration: "10 weeks",
        parentMeeting: "September 6th, 2025 (Required)",
        ageRange: "5-17 years (18 if in high school)",
        email: "strikersyouthleague@gmail.com",
        phone: "479-968-0877"
      }
    },
    {
      name: "Bowlability",
      description: "Join us for an inclusive bowling experience! Hang out with friends in a welcoming community environment. One free game including shoes - all ages and abilities welcome. LIMITED ATTENDANCE, REGISTER TODAY!",
      partner: "Autism Ability Advocates Inc.",
      link: "https://www.autismabilityadvocatesinc.org/",
      active: true,
      details: {
        cost: "FREE (one game + shoes included)",
        focus: "Inclusive environment for all ages and abilities",
        capacity: "Limited attendance - registration required"
      }
    }
  ],
  
  // League Information
  leagueInfo: {
    description: "Whether you're new to the sport or a seasoned bowler, Strikers makes it easy to find the league to match your interests and skill level.",
    types: [
      "Traditional bowling leagues",
      "Senior leagues",
      "Mixed leagues",
      "Family leagues",
      "Kids leagues",
      "Specialty leagues",
      "Custom leagues"
    ],
    teamSizes: "3-5 members per team",
    formats: [
      { type: "All Men", description: "Men's only teams" },
      { type: "All Women", description: "Ladies only teams" },
      { type: "Mixed", description: "Co-ed teams" }
    ],
    handicapSystem: "Unique handicapping system evens the field so everyone has a shot at winning. Lower averages receive more handicap pins.",
    prizes: "Prizes, awards, and cash distributed at end of season",
    help: "Don't have a team? We can place you with others looking to make a team in the league format that best fits you.",
    exampleLeague: {
      name: "Monday Night Open League",
      weeks: 32,
      meeting: "August 25, 2025 at 6:30 PM",
      startDate: "September 8, 2025 at 6:20 PM",
      endDate: "May 2026"
    }
  },
  
  // Links
  links: {
    website: "https://www.mainleestrikers.com",
    leagues: "https://mainleestrikers.com/leagues/",
    standings: "https://mainleestrikers.com/league-standings/",
    honorScores: "https://mainleestrikers.com/honor-scores/",
    youth: "https://mainleestrikers.com/youth/",
    bowlability: "https://www.autismabilityadvocatesinc.org/"
  },
  
  // Social Media & Marketing
  marketing: {
    primaryMessage: "Watch sports, eat, drink, bowl, and play arcade.",
    callToAction: "Roll on over to Strikers for all your entertainment needs!",
    participation: "70+ million people bowl each year - America's #1 participation activity"
  },
  
  // Copyright
  copyright: `© ${new Date().getFullYear()} Strikers Bowling Alley | Mainlee Strikers, LLC`
};

// Helper function to get formatted address
export const getFormattedAddress = () => {
  return bowlingAlleyInfo.address.full;
};

// Helper function to get today's hours
export const getTodaysHours = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  return bowlingAlleyInfo.hours[today];
};

// Helper function to check if currently open
export const isCurrentlyOpen = () => {
  const todayHours = getTodaysHours();
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  
  // Parse hours (simplified - would need more robust parsing for production)
  // This is a basic implementation
  return true; // Placeholder - implement proper time comparison
};

// Helper function to get all amenities as flat list
export const getAllAmenities = () => {
  const amenities = [];
  bowlingAlleyInfo.facilities.forEach(facility => {
    amenities.push(facility.name);
    facility.features.forEach(feature => amenities.push(feature));
  });
  return amenities;
};

export default bowlingAlleyInfo;
