import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagicButton from '../components/MagicButton';
import { ContactSection } from '../components';
import ProfileCard from '../components/ProfileCard';
import TiltedCard from '../components/TiltedCard';
import GradualBlur from '../components/GradualBlur';
import SEO from '../components/SEO';
import { generateLocalBusinessSchema } from '../utils/schema';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = ({ openBooking }) => {
  const navigate = useNavigate();
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);

  const handleLeagueSignup = () => {
    navigate('/leagues');
    setTimeout(() => {
      const signupSection = document.getElementById('league-signup');
      if (signupSection) {
        signupSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If section not found, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  };

  useEffect(() => {
    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', scrollTrigger: { trigger: badgeRef.current, start: 'top 90%' } });
    }
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 90%' } });
    }
    sectionsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.15 + i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
  }, []);

  const setSecRef = i => el => { sectionsRef.current[i] = el; };

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <SEO
        title="About Us - 30+ Years of Bowling Entertainment"
        description="Learn about Mainlee Strikers, Russellville's premier bowling center for over 30 years. 32 lanes, arcade games, sports bar, and family-friendly entertainment. Our story, facilities, and community commitment."
        keywords="Mainlee Strikers, bowling alley history, Russellville AR entertainment, family bowling center, 32 lane bowling, community bowling, bowling facility Arkansas"
        canonical="https://www.mainleestrikers.com/about"
        schema={generateLocalBusinessSchema()}
      />
      
      <section className="section-title" style={{ padding: '120px 20px 60px', position: 'relative', overflow: 'hidden' }}>
        <GradualBlur position="top" height="4rem" strength={1.5} />
        <div className="section-content container-custom" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div ref={badgeRef} style={{ display: 'inline-block', padding: '6px 18px', borderRadius: '30px', background: 'var(--accent-primary)', color: '#fff', fontWeight: 700, marginBottom: '18px' }}>ABOUT</div>
            <h1 ref={titleRef} style={{ margin: '12px 0' }}>Our Story</h1>
          </div>
          
          <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '20px' }}>
              For over three decades, <strong style={{ color: 'var(--accent-primary)' }}>Mainlee Strikers</strong> has been the heart of bowling entertainment in our community. What started as a simple 16-lane bowling center has grown into a premier 32-lane facility that brings together families, friends, and bowling enthusiasts from all walks of life.
            </p>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '20px' }}>
              Our journey began with a simple mission: to create a welcoming space where people could come together, have fun, and create lasting memories. Over the years, we've witnessed countless birthday celebrations, league championships, first dates, family reunions, and corporate team-building events. Each strike, spare, and gutter ball has been part of the rich tapestry of stories that make Strikers special.
            </p>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '20px' }}>
              We've continuously evolved to meet the needs of our community. From installing state-of-the-art Brunswick lanes and automatic scoring systems to expanding our snack bar menu and adding modern arcade games, we're committed to providing the best bowling experience possible. Our pro shop has grown to offer a comprehensive selection of equipment, and our party rooms have hosted thousands of unforgettable celebrations.
            </p>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '20px' }}>
              But what truly sets us apart isn't just our facilities—it's our people. Our dedicated staff, many of whom have been with us for years, treat every guest like family. Whether you're a seasoned league bowler perfecting your game or a first-timer just looking for a fun night out, you'll find a warm welcome and helpful guidance at every turn.
            </p>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '30px' }}>
              Today, <strong style={{ color: 'var(--accent-primary)' }}>Mainlee Strikers</strong> continues to be more than just a bowling alley—we're a community hub where generations come together, friendships are forged, and memories are made one frame at a time. We're proud of our heritage and excited about our future as we continue to serve our community with <strong>lanes, laughs, and lasting memories</strong>.
            </p>
            
            <div style={{ 
              background: 'var(--bg-secondary)', 
              borderRadius: '12px', 
              padding: '30px', 
              border: '2px solid var(--accent-primary)',
              textAlign: 'center',
              marginTop: '40px'
            }}>
              <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.8rem', marginBottom: '15px', color: 'var(--accent-primary)' }}>
                Join Our Story
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '20px' }}>
                Whether you're here for competitive league play, a family outing, or a special celebration, we can't wait to welcome you and become part of your story too.
              </p>
              <MagicButton 
                onClick={openBooking} 
                className="btn-primary"
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                clickEffect={true}
              >
                Plan Your Visit
              </MagicButton>
            </div>
          </div>
        </div>
      </section>

      <section id="facilities" ref={setSecRef(0)} style={{ padding: '40px 20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <GradualBlur position="top" height="3.5rem" strength={1.5} />
        <GradualBlur position="bottom" height="3.5rem" strength={1.5} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '2.5rem', marginBottom: '15px' }}>Our Facilities</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
              Experience bowling at its finest with our state-of-the-art facility. From the moment you walk through our doors, you'll find everything you need for an unforgettable visit.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            {/* 32 Modern Lanes */}
            <TiltedCard>
              <div style={{ 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                padding: '24px',
                height: '100%'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎳</div>
                <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', marginBottom: '10px', color: 'var(--accent-primary)' }}>32 Modern Lanes</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  State-of-the-art Brunswick lanes with automatic scoring, ball returns, and comfortable seating areas. Perfect for casual play or competitive leagues.
                </p>
              </div>
            </TiltedCard>

            {/* Snack Bar */}
            <TiltedCard>
              <div style={{ 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                padding: '24px',
                height: '100%'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🍔</div>
                <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', marginBottom: '10px', color: 'var(--accent-primary)' }}>Full-Service Snack Bar</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Enjoy classic bowling alley favorites including pizza, burgers, nachos, and cold beverages. Perfect for keeping your energy up during long bowling sessions.
                </p>
              </div>
            </TiltedCard>

            {/* Party Rooms */}
            <TiltedCard>
              <div style={{ 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                padding: '24px',
                height: '100%'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</div>
                <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', marginBottom: '10px', color: 'var(--accent-primary)' }}>Private Party Rooms</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Multiple party rooms available for birthdays, corporate events, and special occasions. Each room includes dedicated lanes and customizable packages.
                </p>
              </div>
            </TiltedCard>

            {/* Pro Shop */}
            <TiltedCard>
              <div style={{ 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                padding: '24px',
                height: '100%'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛍️</div>
                <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', marginBottom: '10px', color: 'var(--accent-primary)' }}>Pro Shop</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Full selection of bowling balls, shoes, bags, and accessories. Our experienced staff can help you find the perfect equipment for your game.
                </p>
              </div>
            </TiltedCard>

            {/* Lounge Area */}
            <TiltedCard>
              <div style={{ 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                padding: '24px',
                height: '100%'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🪑</div>
                <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', marginBottom: '10px', color: 'var(--accent-primary)' }}>Comfortable Seating</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Spacious lounge areas with comfortable seating for spectators and bowlers. Watch the action on multiple screens while you wait for your turn.
                </p>
              </div>
            </TiltedCard>

            {/* Arcade */}
            <TiltedCard>
              <div style={{ 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                padding: '24px',
                height: '100%'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🕹️</div>
                <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', marginBottom: '10px', color: 'var(--accent-primary)' }}>Arcade Games</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Exciting arcade area featuring classic and modern games. Perfect entertainment for kids and adults while waiting between frames.
                </p>
              </div>
            </TiltedCard>
          </div>

          <div style={{ marginTop: '40px', background: 'var(--bg-secondary)', borderRadius: '16px', padding: '40px 30px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '2rem', marginBottom: '20px', textAlign: 'center', color: 'var(--accent-primary)' }}>
              Join A League Today!
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '25px', textAlign: 'center', maxWidth: '900px', margin: '0 auto 25px' }}>
              At Strikers we have many different bowling leagues including traditional bowling leagues, senior leagues, and mixed leagues. You can even form your own bowling league!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '30px' }}>
              <TiltedCard>
                <div style={{ background: 'var(--bg-tertiary)', borderRadius: '12px', padding: '25px', border: '1px solid var(--border-color)', height: '100%' }}>
                  <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', marginBottom: '15px', color: 'var(--accent-secondary)' }}>
                    What is a Bowling League?
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                    A group of teams that compete each week. Team size varies by league (usually 3-5 members) and can be all men, all women, or mixed. Each league sets its own rules and prizes – some are for serious bowlers while others are all about having a good time!
                  </p>
                </div>
              </TiltedCard>

              <TiltedCard>
                <div style={{ background: 'var(--bg-tertiary)', borderRadius: '12px', padding: '25px', border: '1px solid var(--border-color)', height: '100%' }}>
                  <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', marginBottom: '15px', color: 'var(--accent-secondary)' }}>
                    Fair Competition
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                    Bowling has a unique handicapping system that evens the field so everyone has a shot at winning. The lower your average, the more pins (handicap) added to your score. At season's end, leagues hand out prizes, awards, and sometimes even cash!
                  </p>
                </div>
              </TiltedCard>

              <TiltedCard>
                <div style={{ background: 'var(--bg-tertiary)', borderRadius: '12px', padding: '25px', border: '1px solid var(--border-color)', height: '100%' }}>
                  <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', marginBottom: '15px', color: 'var(--accent-secondary)' }}>
                    No Team? No Problem!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                    We can place you with others looking to make a team, in the league format that best fits you. Millions of Americans bowl in leagues every week – ready to give it a try?
                  </p>
                </div>
              </TiltedCard>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '20px' }}>
                Discover our league options and sign up today!
              </p>
              <MagicButton 
                onClick={() => navigate('/leagues')} 
                className="btn-primary"
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                clickEffect={true}
              >
                Learn More
              </MagicButton>
            </div>
          </div>
        </div>
      </section>

      <section id="team" ref={setSecRef(1)} style={{ padding: '40px 20px', borderTop: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
        <GradualBlur position="top" height="3rem" strength={1} />
        <div className="section-content container-custom" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '2.5rem', marginBottom: '15px' }}>Meet the Team</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
              Our staff are passionate bowlers and community members. From our friendly front-desk team to our experienced lane techs, everyone is here to make your visit great.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
            <ProfileCard
              name="John Martinez"
              title="General Manager"
              handle="johnm"
              status="15+ years experience"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              miniAvatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              enableTilt={true}
              showUserInfo={false}
            />
            <ProfileCard
              name="Sarah Chen"
              title="Event Coordinator"
              handle="sarach"
              status="Event Specialist"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
              miniAvatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
              enableTilt={true}
              showUserInfo={false}
            />
            <ProfileCard
              name="Mike Thompson"
              title="Head Lane Technician"
              handle="miket"
              status="20+ years experience"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
              miniAvatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
              enableTilt={true}
              showUserInfo={false}
            />
          </div>

          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '30px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.8rem', marginBottom: '15px', textAlign: 'center' }}>Hours & Pricing</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'center', maxWidth: '700px', margin: '0 auto 20px' }}>
              We offer competitive per-game pricing, hourly lane rentals, and discounted rates for children and students.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagicButton 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const pricingSection = document.getElementById('hours-pricing');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      // If section not found, scroll to top
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }, 300);
                }} 
                className="btn-primary"
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                clickEffect={true}
              >
                View Hours & Pricing
              </MagicButton>
              <MagicButton 
                onClick={openBooking} 
                className="btn-outline"
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                clickEffect={true}
              >
                Book Now
              </MagicButton>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

export default AboutPage;
