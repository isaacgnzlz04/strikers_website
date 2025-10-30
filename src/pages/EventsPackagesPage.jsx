import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from '../components/TiltedCard';
import MagicButton from '../components/MagicButton';
import GradualBlur from '../components/GradualBlur';
import SEO from '../components/SEO';
import { generateEventSchema } from '../utils/schema';

gsap.registerPlugin(ScrollTrigger);

const EventsPackagesPage = ({ openBooking, onModalChange }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePackage, setActivePackage] = useState(null);

  // Notify parent when modal state changes
  useEffect(() => {
    if (onModalChange) {
      onModalChange(activePackage !== null);
    }
  }, [activePackage, onModalChange]);

  // Refs for animations
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const filtersRef = useRef([]);
  const packagesRef = useRef([]);
  const featuresRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animations
  useEffect(() => {
    // Hero animations
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(2)',
        }
      );
    }

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
        }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out',
        }
      );
    }

    // Filter animations
    filtersRef.current.forEach((filter, index) => {
      if (filter) {
        gsap.fromTo(
          filter,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.6 + index * 0.1,
            ease: 'power2.out',
          }
        );
      }
    });

    // Package card animations
    setTimeout(() => {
      packagesRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: 'back.out(1.2)',
            }
          );
        }
      });
    }, 100);

    // Features section animations
    featuresRef.current.forEach((feature, index) => {
      if (feature) {
        gsap.fromTo(
          feature,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.1 + index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: feature,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const eventPackages = [
    {
      id: 1,
      category: 'Birthday',
      icon: '🎂',
      name: 'Classic Birthday Bash',
      price: '$199',
      duration: '2 Hours',
      guests: 'Up to 10',
      popular: false,
      description: 'Perfect for intimate birthday celebrations with all the essentials',
      features: [
        '2 bowling lanes for 2 hours',
        'Up to 10 guests',
        'Bowling shoes included',
        'Reserved party area',
        'Party host assistance',
        'Birthday child bowls free',
        'Party invitations provided',
      ],
      addOns: [
        'Pizza package (+$40)',
        'Arcade cards (+$25)',
        'Goodie bags (+$30)',
      ],
    },
    {
      id: 2,
      category: 'Birthday',
      icon: '🎉',
      name: 'Ultimate Party Package',
      price: '$349',
      duration: '3 Hours',
      guests: 'Up to 20',
      popular: true,
      description: 'The complete birthday experience with food, games, and more!',
      features: [
        '4 bowling lanes for 3 hours',
        'Up to 20 guests',
        'Bowling shoes included',
        'Decorated party room',
        'Dedicated party host',
        '2 large pizzas included',
        'Pitcher of soda included',
        'Arcade game cards ($10 each)',
        'Birthday cake setup service',
        'Party favors for all kids',
      ],
      addOns: [
        'Additional pizza (+$15 each)',
        'Extra arcade cards (+$10 each)',
        'Premium goodie bags (+$50)',
      ],
    },
    {
      id: 3,
      category: 'Corporate',
      icon: '💼',
      name: 'Team Building Express',
      price: '$299',
      duration: '2 Hours',
      guests: 'Up to 15',
      popular: false,
      description: 'Quick team bonding session perfect for small teams',
      features: [
        '3 bowling lanes for 2 hours',
        'Up to 15 participants',
        'Bowling shoes included',
        'Semi-private area',
        'Team scoring system',
        'Light refreshments',
        'Event coordinator',
      ],
      addOns: [
        'Catering package (+$150)',
        'Trophy/awards (+$75)',
        'Extended time (+$50/hour)',
      ],
    },
    {
      id: 4,
      category: 'Corporate',
      icon: '🏆',
      name: 'Corporate Championship',
      price: '$599',
      duration: '4 Hours',
      guests: 'Up to 40',
      popular: true,
      description: 'Premium corporate event with full amenities and tournament format',
      features: [
        '8 bowling lanes for 4 hours',
        'Up to 40 participants',
        'Bowling shoes included',
        'Private event space',
        'Tournament organization',
        'Full catering service',
        'AV equipment & microphone',
        'Dedicated event manager',
        'Custom scoreboard display',
        'Trophy presentation ceremony',
        'Professional photos',
      ],
      addOns: [
        'Premium bar service (+$200)',
        'Live entertainment (+$300)',
        'Custom awards (+$150)',
      ],
    },
    {
      id: 5,
      category: 'Group',
      icon: '🎊',
      name: 'Mega Group Event',
      price: '$699',
      duration: '4 Hours',
      guests: 'Up to 60',
      popular: false,
      description: 'Perfect for large gatherings, church groups, or community events',
      features: [
        '10+ bowling lanes for 4 hours',
        'Up to 60 guests',
        'Bowling shoes included',
        'Large private space',
        'Full catering options',
        'Event coordinator',
        'Custom group activities',
        'Extended hours available',
        'Group photo opportunities',
      ],
      addOns: [
        'Full meal service (+$300)',
        'DJ & music (+$250)',
        'Custom decorations (+$100)',
      ],
    },
    {
      id: 6,
      category: 'Fundraiser',
      icon: '💝',
      name: 'Community Fundraiser',
      price: 'Custom',
      duration: 'Flexible',
      guests: 'Any Size',
      popular: false,
      description: 'Customizable fundraising event with special charity pricing',
      features: [
        'Flexible lane reservations',
        'Custom event duration',
        'Special charity rates',
        'Donation tracking support',
        'Marketing assistance',
        'Silent auction space',
        'Raffle ticket sales area',
        'Event coordination',
        'Community partnership',
      ],
      addOns: [
        'Custom packages available',
        'Contact for pricing',
      ],
    },
  ];

  const categories = ['All', 'Birthday', 'Corporate', 'Group', 'Fundraiser'];

  const filteredPackages = selectedCategory === 'All' 
    ? eventPackages 
    : eventPackages.filter(pkg => pkg.category === selectedCategory);

  const whyChooseUs = [
    {
      icon: '🎯',
      title: 'Professional Event Planning',
      description: 'Dedicated event coordinators to help plan every detail of your celebration',
    },
    {
      icon: '🍕',
      title: 'Full Catering Service',
      description: 'Pizza, snacks, drinks, and custom menu options available',
    },
    {
      icon: '🎮',
      title: 'Arcade & Entertainment',
      description: '30+ arcade games, pool tables, and more beyond bowling',
    },
    {
      icon: '📅',
      title: 'Flexible Scheduling',
      description: 'Available 7 days a week with morning, afternoon, and evening slots',
    },
  ];

  // Schema for party/event packages
  const eventPackageSchema = generateEventSchema(
    "Birthday Parties & Corporate Events at Mainlee Strikers",
    "Complete party packages for birthdays, corporate team building, group events, and fundraisers. Includes bowling lanes, food, arcade games, and dedicated party space.",
    "199"
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <SEO
        title="Party Packages & Corporate Events - Birthday Parties, Team Building"
        description="Book birthday parties, corporate events & group celebrations at Mainlee Strikers in Russellville, AR. Complete packages from $199 with bowling, food, arcade & private party rooms. Perfect for kids parties, team building & large groups!"
        keywords="birthday party venue Russellville AR, corporate events Russellville, bowling party packages, team building activities Arkansas, kids birthday party, adult party venue, group event space, private party rooms Russellville, company events Arkansas, fundraiser venue, bowling party prices"
        canonical="https://www.mainleestrikers.com/events"
        schema={eventPackageSchema}
      />
      
      {/* Hero Section */}
      <section
        style={{
          padding: isMobile ? '60px 20px' : '80px 40px',
          background: 'linear-gradient(135deg, rgba(var(--accent-primary-rgb), 0.1) 0%, rgba(var(--accent-secondary-rgb), 0.05) 100%)',
          borderBottom: '1px solid var(--border-color)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <GradualBlur position="top" height="3.5rem" strength={1.5} />
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <div
            ref={badgeRef}
            style={{
              display: 'inline-block',
              padding: '8px 24px',
              borderRadius: '30px',
              background: 'var(--accent-primary)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '20px',
              letterSpacing: '1px',
              opacity: 0,
            }}
          >
            EVENT PACKAGES
          </div>

          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: isMobile ? '2.5rem' : '4rem',
              color: 'var(--text-primary)',
              marginBottom: '20px',
              lineHeight: '1.2',
              opacity: 0,
            }}
          >
            Make Every Event Unforgettable 🎉
          </h1>

          <p
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: 'var(--text-secondary)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6',
              opacity: 0,
            }}
          >
            From birthday parties to corporate events, our comprehensive packages include everything you need for an amazing celebration. Professional service, flexible options, and memories that last a lifetime.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              justifyContent: 'center',
            }}
          >
            {categories.map((category, index) => (
              <button
                key={category}
                ref={(el) => (filtersRef.current[index] = el)}
                onClick={() => setSelectedCategory(category)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  padding: isMobile ? '12px 24px' : '14px 32px',
                  border: selectedCategory === category
                    ? '2px solid var(--accent-primary)'
                    : '2px solid var(--border-color)',
                  borderRadius: '50px',
                  background: selectedCategory === category
                    ? 'var(--accent-primary)'
                    : 'var(--bg-secondary)',
                  color: selectedCategory === category
                    ? '#ffffff'
                    : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.borderColor = 'var(--accent-primary)';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {category} {category !== 'All' && `(${eventPackages.filter(p => p.category === category).length})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section style={{ padding: isMobile ? '40px 20px' : '50px 40px', position: 'relative', overflow: 'hidden' }}>
        <GradualBlur position="top" height="3.5rem" strength={1.5} />
        <GradualBlur position="bottom" height="3.5rem" strength={1.5} />
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: isMobile ? '20px' : '25px',
            }}
          >
            {filteredPackages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                isMobile={isMobile}
                cardRef={(el) => (packagesRef.current[index] = el)}
                openBooking={openBooking}
                onViewDetails={() => setActivePackage(pkg)}
              />
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1.2rem',
              }}
            >
              No packages found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        style={{
          padding: isMobile ? '60px 20px' : '80px 40px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: isMobile ? '2rem' : '3rem',
              color: 'var(--text-primary)',
              textAlign: 'center',
              marginBottom: isMobile ? '40px' : '60px',
            }}
          >
            Why Choose Strikers for Your Event? 🌟
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '30px' : '40px',
            }}
          >
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                ref={(el) => (featuresRef.current[index] = el)}
                style={{
                  padding: isMobile ? '30px' : '40px',
                  borderRadius: '20px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  opacity: 0,
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '1.5rem',
                    color: 'var(--text-primary)',
                    marginBottom: '15px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        style={{
          padding: isMobile ? '60px 20px' : '80px 40px',
          opacity: 0,
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            padding: isMobile ? '40px 30px' : '60px 50px',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: isMobile ? '2rem' : '3rem',
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            Ready to Book Your Event?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '30px',
              lineHeight: '1.6',
            }}
          >
            Our event coordinators are standing by to help you plan the perfect celebration. Call us or book online to get started!
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            <MagicButton
              onClick={openBooking}
              enableSpotlight={true}
              enableBorderGlow={true}
              spotlightRadius={300}
              glowColor="255, 255, 255"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: '700',
                padding: '16px 40px',
                backgroundColor: '#ffffff',
                color: 'var(--accent-primary)',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
              }}
            >
              📅 Book Now
            </MagicButton>
            <a
              href="tel:479-968-0877"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: '700',
                padding: '16px 40px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                borderRadius: '50px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.color = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ffffff';
              }}
            >
              📞 Call (479) 968-0877
            </a>
          </div>
        </div>
      </section>

      {/* Package Details Modal */}
      {activePackage && (
        <PackageModal
          package={activePackage}
          isMobile={isMobile}
          onClose={() => setActivePackage(null)}
          openBooking={openBooking}
        />
      )}
    </div>
  );
};

// Package Card Component
const PackageCard = ({ package: pkg, isMobile, cardRef, openBooking, onViewDetails }) => {
  return (
    <TiltedCard scaleOnHover={1.03} rotateAmplitude={8}>
      <div
        ref={cardRef}
        style={{
          opacity: 0,
          position: 'relative',
          padding: isMobile ? '20px 18px' : '24px 20px',
          borderRadius: '16px',
          background: 'var(--bg-secondary)',
          border: pkg.popular
            ? '2px solid var(--accent-primary)'
            : '1px solid var(--border-color)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Popular Badge */}
        {pkg.popular && (
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '4px 14px',
              borderRadius: '16px',
              background: 'var(--accent-primary)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: '700',
              letterSpacing: '0.5px',
            }}
          >
            POPULAR
          </div>
        )}

        {/* Icon */}
        <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '10px' }}>
          {pkg.icon}
        </div>

        {/* Package Name */}
        <h3
          style={{
            fontFamily: 'var(--font-header)',
            fontSize: '1.3rem',
            color: 'var(--text-primary)',
            marginBottom: '8px',
            textAlign: 'center',
            lineHeight: '1.2',
          }}
        >
          {pkg.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            textAlign: 'center',
            lineHeight: '1.4',
          }}
        >
          {pkg.description}
        </p>

        {/* Price Info */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '12px',
            borderRadius: '12px',
            background: 'var(--bg-primary)',
            marginBottom: '15px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                marginBottom: '3px',
              }}
            >
              Price
            </div>
            <div
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: '1.3rem',
                color: 'var(--accent-primary)',
                fontWeight: 'bold',
              }}
            >
              {pkg.price}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                marginBottom: '3px',
              }}
            >
              Duration
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                fontWeight: '600',
              }}
            >
              {pkg.duration}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                marginBottom: '3px',
              }}
            >
              Guests
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                fontWeight: '600',
              }}
            >
              {pkg.guests}
            </div>
          </div>
        </div>

        {/* Features List (show first 3) */}
        <div style={{ marginBottom: '15px', flex: 1 }}>
          {pkg.features.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '8px',
              }}
            >
              <span style={{ color: 'var(--accent-primary)', marginRight: '8px', fontSize: '1rem' }}>
                ✓
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  lineHeight: '1.3',
                }}
              >
                {feature}
              </span>
            </div>
          ))}
          {pkg.features.length > 3 && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--accent-secondary)',
                fontStyle: 'italic',
                marginTop: '6px',
              }}
            >
              + {pkg.features.length - 3} more features
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MagicButton
            onClick={openBooking}
            enableSpotlight={true}
            enableBorderGlow={true}
            spotlightRadius={200}
            glowColor="150, 51, 60"
            style={{
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: '600',
              padding: '10px 16px',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Book Package
          </MagicButton>
          <button
            onClick={onViewDetails}
            style={{
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: '600',
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: 'var(--accent-secondary)',
              border: '2px solid var(--accent-secondary)',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--accent-secondary)';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'var(--accent-secondary)';
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </TiltedCard>
  );
};

// Package Details Modal
const PackageModal = ({ package: pkg, isMobile, onClose, openBooking }) => {
  const modalContentRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Animation effect when modal opens
  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in backdrop
    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Modal entrance - scale and slide
    tl.fromTo(
      modalContentRef.current,
      { scale: 0.8, opacity: 0, y: -50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.15'
    );

    // Content fade in
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });

    // Fade out content
    if (contentRef.current) {
      tl.to(contentRef.current, { y: 20, opacity: 0, duration: 0.18, ease: 'power2.in' });
    }

    // Modal scale down
    tl.to(modalContentRef.current, { scale: 0.8, opacity: 0, y: -30, duration: 0.28, ease: 'back.in(1.7)' }, '-=0.12');

    // Fade out backdrop
    tl.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.18');
  };

  return (
    <div
      ref={backdropRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: isMobile ? '20px' : '40px',
        overflow: 'auto',
      }}
      onClick={handleClose}
    >
      <div
        ref={modalContentRef}
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '20px',
          border: '2px solid var(--accent-primary)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(90deg) scale(1.2)';
            e.currentTarget.style.color = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          ×
        </button>

        <div ref={contentRef} style={{ padding: isMobile ? '30px 25px' : '40px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{pkg.icon}</div>
            <h2
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: isMobile ? '2rem' : '2.5rem',
                color: 'var(--text-primary)',
                marginBottom: '10px',
              }}
            >
              {pkg.name}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
              }}
            >
              {pkg.description}
            </p>
          </div>

          {/* Package Info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                padding: '20px',
                borderRadius: '15px',
                background: 'var(--bg-primary)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                }}
              >
                Price
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '2rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 'bold',
                }}
              >
                {pkg.price}
              </div>
            </div>
            <div
              style={{
                padding: '20px',
                borderRadius: '15px',
                background: 'var(--bg-primary)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                }}
              >
                Duration
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.3rem',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                }}
              >
                {pkg.duration}
              </div>
            </div>
            <div
              style={{
                padding: '20px',
                borderRadius: '15px',
                background: 'var(--bg-primary)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                }}
              >
                Guests
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.3rem',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                }}
              >
                {pkg.guests}
              </div>
            </div>
          </div>

          {/* All Features */}
          <div style={{ marginBottom: '30px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                marginBottom: '20px',
              }}
            >
              What's Included ✨
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {pkg.features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'var(--bg-primary)',
                  }}
                >
                  <span style={{ color: 'var(--accent-primary)', marginRight: '12px', fontSize: '1.3rem' }}>
                    ✓
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      lineHeight: '1.5',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Add-Ons */}
          {pkg.addOns && pkg.addOns.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '20px',
                }}
              >
                Available Add-Ons 🎁
              </h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {pkg.addOns.map((addOn, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'var(--bg-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    • {addOn}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <MagicButton
            onClick={() => {
              onClose();
              openBooking();
            }}
            enableSpotlight={true}
            enableBorderGlow={true}
            spotlightRadius={300}
            glowColor="150, 51, 60"
            style={{
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              fontWeight: '700',
              padding: '18px',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
            }}
          >
            📅 Book This Package Now
          </MagicButton>
        </div>
      </div>
    </div>
  );
};

export default EventsPackagesPage;
