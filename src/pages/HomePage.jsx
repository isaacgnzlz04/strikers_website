import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection, GradualBlur } from '../components';
import HoursAndPricingSection from '../components/HoursAndPricingSection';
import ServicesOverview from '../components/ServicesOverview';
import GallerySection from '../components/GallerySection';
import AdvertisersSection from '../components/AdvertisersSection';
import SpecialProgramsSection from '../components/SpecialProgramsSection';
import { ContactSection } from '../components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HomePage = ({ openBooking }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // Cleanup GSAP animations and ScrollTrigger instances when component unmounts
    // But DON'T kill nav/header animations
    return () => {
      // Kill all ScrollTrigger instances (they're only in page content)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clear the global timeline
      gsap.globalTimeline.clear();
      
      // Refresh ScrollTrigger to clear any cached data
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      {/* Hero Section with CTA - Book Now! */}
      <HeroSection openBooking={openBooking} />

      {/* Hours & Pricing - Quick Info */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GradualBlur position="top" height="3rem" strength={1} />
        <HoursAndPricingSection openBooking={openBooking} />
        <GradualBlur position="bottom" height="3rem" strength={1} />
      </div>

      {/* Services Overview - 4 cards → dedicated pages */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GradualBlur position="top" height="3rem" strength={1.5} />
        <ServicesOverview navigate={navigate} />
        <GradualBlur position="bottom" height="3rem" strength={1} />
      </div>

      {/* Community Gallery - Social proof + engagement */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GradualBlur position="top" height="3.5rem" strength={1.5} />
        <GallerySection />
        <GradualBlur position="bottom" height="3.5rem" strength={1.5} />
      </div>

      {/* Advertisers Section - Revenue generation */}
      <AdvertisersSection />

      {/* Special Programs - Youth/Bowlability */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GradualBlur position="top" height="3rem" strength={1} />
        <SpecialProgramsSection />
      </div>

      {/* Contact Section */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GradualBlur position="top" height="3rem" strength={1} />
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
