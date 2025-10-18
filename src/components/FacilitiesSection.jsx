import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bowlingAlleyInfo from '../data/bowlingAlleyInfo';
import TiltedCard from './TiltedCard';
import MagicButton from './MagicButton';

gsap.registerPlugin(ScrollTrigger);

const FacilitiesSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showYouthModal, setShowYouthModal] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showCoachForm, setShowCoachForm] = useState(false);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const formModalRef = useRef(null);
  const formContentRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Badge animation
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.3 + index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  // Modal animation effect
  useEffect(() => {
    if (showYouthModal && modalRef.current && modalContentRef.current) {
      // Animate modal opening
      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(modalContentRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        delay: 0.1,
        ease: 'back.out(1.7)',
      });
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showYouthModal]);

  // Form modal animation effect
  useEffect(() => {
    if ((showRegistrationForm || showCoachForm) && formModalRef.current && formContentRef.current) {
      // Animate modal opening
      gsap.to(formModalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(formContentRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        delay: 0.1,
        ease: 'back.out(1.7)',
      });
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (!showYouthModal) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [showRegistrationForm, showCoachForm, showYouthModal]);

  const handleCloseModal = () => {
    if (modalRef.current && modalContentRef.current) {
      // Animate modal closing
      gsap.to(modalContentRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.2,
        delay: 0.1,
        ease: 'power2.in',
        onComplete: () => {
          setShowYouthModal(false);
        },
      });
    } else {
      setShowYouthModal(false);
    }
  };

  const handleCloseFormModal = () => {
    if (formModalRef.current && formContentRef.current) {
      // Animate modal closing
      gsap.to(formContentRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
      });
      gsap.to(formModalRef.current, {
        opacity: 0,
        duration: 0.2,
        delay: 0.1,
        ease: 'power2.in',
        onComplete: () => {
          setShowRegistrationForm(false);
          setShowCoachForm(false);
        },
      });
    } else {
      setShowRegistrationForm(false);
      setShowCoachForm(false);
    }
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
    alert('Youth Registration submitted! We will contact you soon.');
    handleCloseFormModal();
  };

  const handleCoachSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
    alert('Coach Signup submitted! Thank you for volunteering!');
    handleCloseFormModal();
  };

  const facilityIcons = {
    'Bowling Lanes': '🎳',
    'Strikers Arcade': '🎮',
    'Sports Bar & Grill': '🍔'
  };

  return (
    <section
      id="facilities"
      style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            FACILITIES & AMENITIES
          </div>
          <h2
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              opacity: 0,
            }}
          >
            Everything You Need
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            {bowlingAlleyInfo.marketing.primaryMessage}
          </p>
        </div>

        {/* Facility Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {bowlingAlleyInfo.facilities.map((facility, index) => (
            <TiltedCard key={facility.name} scaleOnHover={1.03} rotateAmplitude={8}>
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  padding: '2.5rem',
                  opacity: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
              {/* Icon */}
              <div
                style={{
                  fontSize: '3.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                {facilityIcons[facility.name]}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '1.8rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                }}
              >
                {facility.name}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                {facility.description}
              </p>

              {/* Features List */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  flex: 1,
                }}
              >
                {facility.features.slice(0, 5).map((feature, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.75rem',
                      paddingLeft: '1.5rem',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--accent-primary)',
                        fontWeight: 'bold',
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
                {facility.features.length > 5 && (
                  <li
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      fontStyle: 'italic',
                      marginTop: '0.5rem',
                    }}
                  >
                    And {facility.features.length - 5} more!
                  </li>
                )}
              </ul>
            </div>
            </TiltedCard>
          ))}
        </div>

        {/* Special Programs */}
        <div
          style={{
            marginTop: '5rem',
            padding: isMobile ? '2.5rem 1.5rem' : '3rem 3rem',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            borderRadius: '20px',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: '#ffffff',
              marginBottom: '1.5rem',
            }}
          >
            Special Programs
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '2rem',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {bowlingAlleyInfo.specialPrograms.map((program, index) => (
              <div
                key={program.name}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  padding: '2rem',
                  textAlign: 'left',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '1.5rem',
                    color: '#ffffff',
                    marginBottom: '1rem',
                  }}
                >
                  {program.name}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  {program.description}
                </p>
                {program.name === "Strikers Youth League" ? (
                  <MagicButton
                    type="button"
                    onClick={() => setShowYouthModal(true)}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={150}
                    glowColor="255, 255, 255"
                    style={{
                      backgroundColor: '#ffffff',
                      color: 'var(--accent-primary)',
                      padding: '12px 24px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      borderRadius: '25px',
                    }}
                  >
                    Learn More
                  </MagicButton>
                ) : (
                  <MagicButton
                    type="button"
                    onClick={() => window.open(program.link, '_blank', 'noopener,noreferrer')}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={150}
                    glowColor="255, 255, 255"
                    style={{
                      backgroundColor: '#ffffff',
                      color: 'var(--accent-primary)',
                      padding: '12px 24px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      borderRadius: '25px',
                    }}
                  >
                    Learn More
                  </MagicButton>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Youth League Modal */}
      {showYouthModal && (
        <div
          ref={modalRef}
          onClick={(e) => {
            if (e.target === modalRef.current) {
              handleCloseModal();
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: isMobile ? '1rem' : '2rem',
            opacity: 0,
          }}
        >
          <div
            ref={modalContentRef}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '20px',
              border: '2px solid var(--accent-primary)',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              padding: isMobile ? '2rem' : '3rem',
              transform: 'scale(0.8)',
              opacity: 0,
            }}
            className="custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid var(--accent-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--accent-primary)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent-primary)';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--bg-secondary)';
                e.target.style.color = 'var(--accent-primary)';
                e.target.style.transform = 'rotate(0deg)';
              }}
            >
              ×
            </button>

            {/* Modal Content */}
            <div style={{ paddingRight: isMobile ? '0' : '1rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                  paddingRight: '2rem',
                }}
              >
                🎳 Strikers Youth League
              </h2>

              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '1.3rem',
                    color: 'var(--accent-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  Want a sport in a temperature-controlled environment?
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    marginBottom: '1.5rem',
                  }}
                >
                  Kids from ages 5 to 17 (18yrs bowl in youth league as long as they are in high school) 
                  can bowl in a league style play and learn basic bowling fundamentals in a fun and 
                  informative environment.
                </p>
              </div>

              {/* Important Dates */}
              <div
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  📅 Important Dates
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <strong style={{ color: 'var(--accent-primary)' }}>Parent Meeting (Required):</strong>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                      September 6th, 2025
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--accent-primary)' }}>League Starts:</strong>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                      September 13th, 2025
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--accent-primary)' }}>Season Length:</strong>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                      10 weeks
                    </span>
                  </div>
                </div>
              </div>

              {/* Volunteers Needed */}
              <div
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  👥 We Need You!
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  We are looking for parent volunteers and coaches to help make this league a success!
                </p>
              </div>

              {/* Contact Information */}
              <div
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  📞 Contact Information
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <strong style={{ color: 'var(--accent-primary)' }}>Phone:</strong>
                    <a
                      href="tel:479-968-0877"
                      style={{
                        color: 'var(--text-secondary)',
                        marginLeft: '0.5rem',
                        textDecoration: 'none',
                      }}
                    >
                      479-968-0877
                    </a>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--accent-primary)' }}>Email:</strong>
                    <a
                      href="mailto:strikersyouthleague@gmail.com"
                      style={{
                        color: 'var(--text-secondary)',
                        marginLeft: '0.5rem',
                        textDecoration: 'none',
                      }}
                    >
                      strikersyouthleague@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '1rem',
                  marginTop: '2rem',
                }}
              >
                <MagicButton
                  type="button"
                  onClick={() => {
                    setShowYouthModal(false);
                    setTimeout(() => setShowRegistrationForm(true), 300);
                  }}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  clickEffect={true}
                  spotlightRadius={150}
                  glowColor="150, 51, 60"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    padding: '14px 28px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '25px',
                    flex: 1,
                    textAlign: 'center',
                  }}
                >
                  📝 Youth Registration
                </MagicButton>
                <MagicButton
                  type="button"
                  onClick={() => {
                    setShowYouthModal(false);
                    setTimeout(() => setShowCoachForm(true), 300);
                  }}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  clickEffect={true}
                  spotlightRadius={150}
                  glowColor="150, 51, 60"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--accent-primary)',
                    padding: '14px 28px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '25px',
                    border: '2px solid var(--accent-primary)',
                    flex: 1,
                    textAlign: 'center',
                  }}
                >
                  🏆 Coach Signup
                </MagicButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Youth Registration Form Modal */}
      {showRegistrationForm && (
        <div
          ref={formModalRef}
          onClick={(e) => {
            if (e.target === formModalRef.current) {
              handleCloseFormModal();
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: isMobile ? '1rem' : '2rem',
            opacity: 0,
          }}
        >
          <div
            ref={formContentRef}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '20px',
              border: '2px solid var(--accent-primary)',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              padding: isMobile ? '2rem' : '3rem',
              transform: 'scale(0.8)',
              opacity: 0,
            }}
            className="custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseFormModal}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid var(--accent-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--accent-primary)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent-primary)';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--bg-secondary)';
                e.target.style.color = 'var(--accent-primary)';
                e.target.style.transform = 'rotate(0deg)';
              }}
            >
              ×
            </button>

            {/* Back Button */}
            <button
              onClick={() => {
                setShowRegistrationForm(false);
                setTimeout(() => setShowYouthModal(true), 300);
              }}
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '2px solid var(--accent-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--accent-primary)',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.3s ease',
                zIndex: 1,
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent-primary)';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--bg-secondary)';
                e.target.style.color = 'var(--accent-primary)';
              }}
            >
              ← Back
            </button>

            <h2
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: isMobile ? '1.8rem' : '2.2rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                paddingRight: '2rem',
                paddingTop: '2.5rem',
              }}
            >
              📝 Youth League Registration
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
              }}
            >
              Please fill out the form below to register your child for the Strikers Youth League.
            </p>

            <form onSubmit={handleRegistrationSubmit}>
              {/* Parent/Guardian Information */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Parent/Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              {/* Child Information */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Child's Full Name *
                </label>
                <input
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Child's Age *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="18"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              {/* Bowling Experience */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Bowling Experience
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                >
                  <option value="none">No Experience</option>
                  <option value="beginner">Beginner (1-2 years)</option>
                  <option value="intermediate">Intermediate (3-5 years)</option>
                  <option value="advanced">Advanced (5+ years)</option>
                </select>
              </div>

              {/* Additional Comments */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Additional Comments or Questions
                </label>
                <textarea
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Submit Button */}
              <MagicButton
                type="submit"
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                clickEffect={true}
                spotlightRadius={150}
                glowColor="150, 51, 60"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  padding: '14px 28px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '25px',
                  width: '100%',
                  marginTop: '2rem',
                }}
              >
                Submit Registration
              </MagicButton>
            </form>
          </div>
        </div>
      )}

      {/* Coach Signup Form Modal */}
      {showCoachForm && (
        <div
          ref={formModalRef}
          onClick={(e) => {
            if (e.target === formModalRef.current) {
              handleCloseFormModal();
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: isMobile ? '1rem' : '2rem',
            opacity: 0,
          }}
        >
          <div
            ref={formContentRef}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '20px',
              border: '2px solid var(--accent-primary)',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              padding: isMobile ? '2rem' : '3rem',
              transform: 'scale(0.8)',
              opacity: 0,
            }}
            className="custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseFormModal}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid var(--accent-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--accent-primary)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent-primary)';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--bg-secondary)';
                e.target.style.color = 'var(--accent-primary)';
                e.target.style.transform = 'rotate(0deg)';
              }}
            >
              ×
            </button>

            {/* Back Button */}
            <button
              onClick={() => {
                setShowCoachForm(false);
                setTimeout(() => setShowYouthModal(true), 300);
              }}
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '2px solid var(--accent-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--accent-primary)',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.3s ease',
                zIndex: 1,
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent-primary)';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--bg-secondary)';
                e.target.style.color = 'var(--accent-primary)';
              }}
            >
              ← Back
            </button>

            <h2
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: isMobile ? '1.8rem' : '2.2rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                paddingRight: '2rem',
                paddingTop: '2.5rem',
              }}
            >
              🏆 Coach Volunteer Signup
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
              }}
            >
              Thank you for your interest in volunteering as a coach! Please fill out the form below.
            </p>

            <form onSubmit={handleCoachSubmit}>
              {/* Personal Information */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              {/* Contact Information */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              {/* Bowling Experience */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Your Bowling Experience *
                </label>
                <select
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select experience level...</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="professional">Professional/League Bowler</option>
                </select>
              </div>

              {/* Coaching Experience */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Previous Coaching Experience
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                  }}
                >
                  <option value="none">No Experience</option>
                  <option value="youth">Youth Sports</option>
                  <option value="bowling">Bowling</option>
                  <option value="both">Both Youth Sports and Bowling</option>
                  <option value="other">Other Sports</option>
                </select>
              </div>

              {/* Availability */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Availability *
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="Please describe your weekly availability (days and times)"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Why do you want to coach */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Why do you want to volunteer as a coach?
                </label>
                <textarea
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Submit Button */}
              <MagicButton
                type="submit"
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                clickEffect={true}
                spotlightRadius={150}
                glowColor="150, 51, 60"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  padding: '14px 28px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '25px',
                  width: '100%',
                  marginTop: '2rem',
                }}
              >
                Submit Volunteer Application
              </MagicButton>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};


export default FacilitiesSection;
