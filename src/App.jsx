import React, { useState } from 'react';
import { HeroSection, CardNav, ThemeToggle, FluidBackground, FeaturesSection, PricingSection, AboutSection, ContactSection, EventsSection, Footer, BookingModal, LeagueSignupModal } from './components';
import StandingsPage from './components/StandingsPage';
import logo from './assets/logo.svg';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLeagueSignupModalOpen, setIsLeagueSignupModalOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [showStandings, setShowStandings] = useState(false);

  const openLeagueSignup = (leagueName = '') => {
    setSelectedLeague(leagueName);
    setIsLeagueSignupModalOpen(true);
  };

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navItems = [
    {
      label: "About",
      bgColor: "var(--bg-secondary)",
      textColor: "var(--text-primary)",
      links: [
        { 
          label: "Our Story", 
          ariaLabel: "About Our Story",
          href: "#about",
          onClick: (e) => { e.preventDefault(); scrollToSection('about'); }
        },
        { 
          label: "Contact Us", 
          ariaLabel: "Contact Us",
          href: "#contact",
          onClick: (e) => { e.preventDefault(); scrollToSection('contact'); }
        }
      ]
    },
    {
      label: "Leagues", 
      bgColor: "var(--accent-primary)",
      textColor: "#fff",
      links: [
        { 
          label: "View Leagues", 
          ariaLabel: "View All Leagues",
          href: "#leagues",
          onClick: (e) => { e.preventDefault(); scrollToSection('leagues'); }
        },
        { 
          label: "Standings", 
          ariaLabel: "View League Standings",
          href: "#standings",
          onClick: (e) => { e.preventDefault(); setShowStandings(true); }
        },
        { 
          label: "Sign Up", 
          ariaLabel: "Sign Up for League",
          href: "#leagues",
          onClick: (e) => { e.preventDefault(); openLeagueSignup(); }
        }
      ]
    },
    {
      label: "Events",
      bgColor: "var(--bg-tertiary)", 
      textColor: "var(--text-primary)",
      links: [
        { 
          label: "Pricing", 
          ariaLabel: "View Pricing",
          href: "#pricing",
          onClick: (e) => { e.preventDefault(); scrollToSection('pricing'); }
        },
        { 
          label: "Event Packages", 
          ariaLabel: "View Event Packages",
          href: "#events",
          onClick: (e) => { e.preventDefault(); scrollToSection('events'); }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen custom-scrollbar" style={{ position: 'relative', transition: 'background-color 0.3s ease', overflowX: 'hidden', width: '100%' }}>
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />

      {/* League Signup Modal */}
      <LeagueSignupModal 
        isOpen={isLeagueSignupModalOpen} 
        onClose={() => setIsLeagueSignupModalOpen(false)}
        leagueName={selectedLeague}
      />

      {/* Fluid Background Animation */}
      <FluidBackground />
      
      {/* Card Navigation Bar */}
      <CardNav
        logo={logo}
        logoAlt="Strikers Logo"
        items={navItems}
        baseColor="rgba(255, 255, 255, 0.15)"
        menuColor="var(--text-primary)"
        buttonBgColor="var(--accent-primary)"
        buttonTextColor="#fff"
        ease="power3.out"
        onButtonClick={() => setIsBookingModalOpen(true)}
      />

      {/* Theme Toggle Button */}
      <ThemeToggle />
      
      {/* Hero Section with CTA */}
      <HeroSection openBooking={() => setIsBookingModalOpen(true)} />

      {/* Leagues Section - 5 Cards */}
      <FeaturesSection 
        openLeagueSignup={openLeagueSignup}
        openStandings={() => setShowStandings(true)}
      />

      {/* Pricing Section */}
      <PricingSection openBooking={() => setIsBookingModalOpen(true)} />

      {/* About Section */}
      <AboutSection />

      {/* Events Section */}
      <EventsSection openBooking={() => setIsBookingModalOpen(true)} />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Standings Modal */}
      {showStandings && (
        <StandingsPage 
          onClose={() => setShowStandings(false)}
        />
      )}
    </div>
  );
}

export default App;
