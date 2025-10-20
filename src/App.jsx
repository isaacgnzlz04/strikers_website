import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CardNav, ThemeToggle, FluidBackground, Footer, BookingModal, LeagueSignupModal } from './components';
import EventModal from './components/EventModal';
import StandingsPage from './components/StandingsPage';
import HomePage from './pages/HomePage';
import LeaguePage from './pages/LeaguePage';
import EventsPackagesPage from './pages/EventsPackagesPage';
import AboutPage from './pages/AboutPage';
import logo from './assets/logo.svg';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLeagueSignupModalOpen, setIsLeagueSignupModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [showStandings, setShowStandings] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openLeagueSignup = (leagueName = '') => {
    setSelectedLeague(leagueName);
    setIsLeagueSignupModalOpen(true);
  };

  const scrollToSection = (sectionId) => {
    // Check if the section exists on the current page
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Section exists on current page, just scroll
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Section doesn't exist on current page, navigate to home page
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation, then scroll
        setTimeout(() => {
          if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }, 100);
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
          label: 'Our Story', 
          ariaLabel: 'About Our Story', 
          href: '/about', 
          onClick: (e) => { 
            e.preventDefault(); 
            navigate('/about');
            // Scroll to top when navigating to About page
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          } 
        },
        { 
          label: 'Facilities', 
          ariaLabel: 'Facilities & Amenities', 
          href: '/about#facilities', 
          onClick: (e) => { 
            e.preventDefault(); 
            if (location.pathname === '/about') {
              // Already on about page, just scroll
              scrollToSection('facilities');
            } else {
              // Navigate to about page, then scroll to facilities
              navigate('/about');
              setTimeout(() => {
                const element = document.getElementById('facilities');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }
          } 
        },
        { 
          label: 'Meet the Team', 
          ariaLabel: 'Meet Our Team', 
          href: '/about#team', 
          onClick: (e) => { 
            e.preventDefault(); 
            if (location.pathname === '/about') {
              // Already on about page, just scroll
              scrollToSection('team');
            } else {
              // Navigate to about page, then scroll to team
              navigate('/about');
              setTimeout(() => {
                const element = document.getElementById('team');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }
          } 
        },
        { 
          label: 'Gallery', 
          ariaLabel: 'Community Gallery', 
          href: '#gallery', 
          onClick: (e) => { 
            e.preventDefault(); 
            scrollToSection('gallery'); 
          } 
        }
      ]
    },
    {
      label: "Get Started", 
      bgColor: "var(--accent-primary)",
      textColor: "#fff",
      links: [
        { 
          label: "Join a League", 
          ariaLabel: "Join a Bowling League",
          href: "/leagues",
          onClick: (e) => { e.preventDefault(); navigate('/leagues'); }
        },
        { 
          label: "Plan an Event", 
          ariaLabel: "Plan Your Event",
          href: "/events",
          onClick: (e) => { e.preventDefault(); navigate('/events'); }
        },
        { 
          label: "Hours & Pricing", 
          ariaLabel: "View Hours and Pricing",
          href: "#hours-pricing",
          onClick: (e) => { e.preventDefault(); scrollToSection('hours-pricing'); }
        },
        { 
          label: "League Standings", 
          ariaLabel: "View League Standings",
          href: "#standings",
          onClick: (e) => { e.preventDefault(); setShowStandings(true); }
        }
      ]
    },
    {
      label: "Contact",
      bgColor: "var(--bg-tertiary)", 
      textColor: "var(--text-primary)",
      links: [
        { 
          label: "Contact Us", 
          ariaLabel: "Contact Information",
          href: "#contact",
          onClick: (e) => { e.preventDefault(); scrollToSection('contact'); }
        },
        { 
          label: "Book Lanes Now", 
          ariaLabel: "Book Your Lanes",
          href: "#book",
          onClick: (e) => { e.preventDefault(); setIsBookingModalOpen(true); }
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

      {/* Event Modal */}
      <EventModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
      />

      {/* Fluid Background Animation */}
      <FluidBackground />
      
      {/* Card Navigation Bar */}
      <CardNav
        logo={logo}
        logoAlt="Strikers Logo"
        logoOnClick={() => {
          if (location.pathname === '/') {
            // Already on home page, scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            // Navigate to home page, then scroll to top
            navigate('/');
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }
        }}
        items={navItems}
        baseColor="rgba(255, 255, 255, 0.15)"
        menuColor="var(--text-primary)"
        buttonBgColor="var(--accent-primary)"
        buttonTextColor="#fff"
        ease="power3.out"
        onButtonClick={() => setIsBookingModalOpen(true)}
        currentPath={location.pathname}
        modalOpen={isBookingModalOpen || isLeagueSignupModalOpen || isEventModalOpen || showStandings}
        style={{ 
          display: (isBookingModalOpen || isLeagueSignupModalOpen || isEventModalOpen) ? 'none' : 'block'
        }}
      />

      {/* Theme Toggle Button */}
      <ThemeToggle />
      
      {/* Routes */}
      <Routes location={location}>
        <Route path="/" element={
          <div 
            key="home-page" 
            style={{ 
              position: 'relative', 
              zIndex: 1,
              animation: 'fadeInPage 0.5s ease-in-out'
            }}
          >
            <HomePage openBooking={() => setIsBookingModalOpen(true)} />
          </div>
        } />
        <Route path="/leagues" element={
          <div 
            key="leagues-page" 
            style={{ 
              position: 'relative', 
              zIndex: 1,
              animation: 'fadeInPage 0.5s ease-in-out'
            }}
          >
            <LeaguePage 
              openLeagueSignup={openLeagueSignup} 
              openStandings={() => setShowStandings(true)} 
            />
          </div>
        } />
        <Route path="/events" element={
          <div 
            key="events-page" 
            style={{ 
              position: 'relative', 
              zIndex: 1,
              animation: 'fadeInPage 0.5s ease-in-out'
            }}
          >
            <EventsPackagesPage 
              openBooking={() => setIsEventModalOpen(true)} 
            />
          </div>
        } />
        <Route path="/about" element={
          <div
            key="about-page"
            style={{ position: 'relative', zIndex: 1, animation: 'fadeInPage 0.5s ease-in-out' }}
          >
            <AboutPage openBooking={() => setIsBookingModalOpen(true)} />
          </div>
        } />
      </Routes>

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
