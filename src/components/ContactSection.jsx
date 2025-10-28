import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagicButton from './MagicButton';
import bowlingAlleyInfo from '../data/bowlingAlleyInfo';
import { useContactForm } from '../hooks/useContactForm';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const infoCardRef = useRef(null);

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

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Info card animation
    if (infoCardRef.current) {
      gsap.fromTo(
        infoCardRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoCardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { submitForm, loading, error, reset } = useContactForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await submitForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        subject: 'General'
      });
      
      alert('Thank you for contacting us! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert(err.message || 'Failed to submit contact form. Please try again.');
    }
  };

  return (
    <section 
      id="contact"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            ref={badgeRef}
            style={{
              display: 'inline-block',
              padding: '8px 24px',
              borderRadius: '30px',
              background: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '20px',
              letterSpacing: '1px',
              opacity: 0,
            }}
          >
            CONTACT US
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
            Get In Touch
          </h2>
          <p 
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
              opacity: 0,
            }}
          >
            Have questions or want to book a lane? We'd love to hear from you!
          </p>
        </div>

        <div 
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '4rem',
          }}
        >
          {/* Contact Form */}
          <div ref={formRef} style={{ flex: 1, opacity: 0 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label 
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label 
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label 
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label 
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <MagicButton
                type="submit"
                disabled={loading}
                enableSpotlight={!loading}
                enableBorderGlow={!loading}
                enableTilt={!loading}
                enableMagnetism={!loading}
                clickEffect={!loading}
                spotlightRadius={300}
                glowColor="150, 51, 60"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  padding: '1.2rem 3rem',
                  backgroundColor: loading ? '#999' : 'var(--accent-primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  width: '100%',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </MagicButton>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={infoCardRef} style={{ flex: 1, opacity: 0 }}>
            <div 
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                padding: '3rem',
                height: '100%',
              }}
            >
              <h3 
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '2rem',
                  color: 'var(--text-primary)',
                  marginBottom: '2rem',
                }}
              >
                Contact Information
              </h3>

              <div style={{ marginBottom: '2rem' }}>
                <div 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  📍 Address
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.6,
                  }}
                >
                  {bowlingAlleyInfo.address.street}<br />
                  {bowlingAlleyInfo.address.city}, {bowlingAlleyInfo.address.state} {bowlingAlleyInfo.address.zip}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  📞 Phone
                </div>
                <a
                  href="tel:+14799680877"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                  }}
                >
                  (479) 968-0877
                </a>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  ✉️ Email
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  info@mainleestrikers.com
                </div>
              </div>

              <div>
                <div 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  🕐 Hours
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.8,
                  }}
                >
                  {bowlingAlleyInfo.hoursFormatted.map((day, index) => (
                    <React.Fragment key={day.day}>
                      {day.day}: {day.hours}
                      {index < bowlingAlleyInfo.hoursFormatted.length - 1 && <><br /></>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
