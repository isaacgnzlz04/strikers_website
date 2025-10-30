import { bowlingAlleyInfo } from '../data/bowlingAlleyInfo';

/**
 * Generate LocalBusiness Schema.org structured data for Mainlee Strikers
 * This helps Google understand the business and show it properly in local search results
 */
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "BowlingAlley",
    "@id": "https://www.mainleestrikers.com/#bowlingalley",
    "name": bowlingAlleyInfo.name,
    "legalName": bowlingAlleyInfo.legalName,
    "url": "https://www.mainleestrikers.com",
    "logo": "https://www.mainleestrikers.com/logo.png",
    "image": "https://www.mainleestrikers.com/og-image.jpg",
    "description": bowlingAlleyInfo.about.description,
    "telephone": "(479) 968-0877",
    "email": "info@mainleestrikers.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": bowlingAlleyInfo.address.street,
      "addressLocality": bowlingAlleyInfo.address.city,
      "addressRegion": bowlingAlleyInfo.address.state,
      "postalCode": bowlingAlleyInfo.address.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.2784",
      "longitude": "-93.1338"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "13:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "16:30",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "16:30",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "13:00",
        "closes": "23:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/mainleestrikers",
      "https://www.instagram.com/mainleestrikers"
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Bowling Lanes",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Arcade Games",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Sports Bar",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Party Rooms",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Food Service",
        "value": true
      }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Birthday Party Packages",
          "description": "Complete birthday party packages with bowling, food, and party room"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Corporate Events",
          "description": "Team building and corporate event packages"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bowling Leagues",
          "description": "Youth, adult, and senior bowling leagues"
        }
      }
    ]
  };
};

/**
 * Generate Event Schema for specific events/packages
 */
export const generateEventSchema = (eventName, description, price) => {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventName,
    "description": description,
    "location": {
      "@type": "BowlingAlley",
      "name": bowlingAlleyInfo.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": bowlingAlleyInfo.address.street,
        "addressLocality": bowlingAlleyInfo.address.city,
        "addressRegion": bowlingAlleyInfo.address.state,
        "postalCode": bowlingAlleyInfo.address.zip,
        "addressCountry": "US"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.mainleestrikers.com/events"
    },
    "organizer": {
      "@type": "Organization",
      "name": bowlingAlleyInfo.name,
      "url": "https://www.mainleestrikers.com"
    }
  };
};

/**
 * Generate SportsActivityLocation Schema
 */
export const generateSportsLocationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": "https://www.mainleestrikers.com/#sportslocation",
    "name": bowlingAlleyInfo.name,
    "sport": "Bowling",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": bowlingAlleyInfo.address.street,
      "addressLocality": bowlingAlleyInfo.address.city,
      "addressRegion": bowlingAlleyInfo.address.state,
      "postalCode": bowlingAlleyInfo.address.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.2784",
      "longitude": "-93.1338"
    }
  };
};
