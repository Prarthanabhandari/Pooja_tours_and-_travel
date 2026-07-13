import React, { useState } from 'react';

export default function RoadNestLanding({ 
  searchParams, 
  setSearchParams, 
  handleSearchSubmit,
  setCurrentPage,
  setShowAuthModal,
  setAuthMode,
  currentUser,
  handleLogout
}) {
  const [activeTab, setActiveTab] = useState('roundtrip');

  const navLinks = [
    { label: 'Home', action: () => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'Our Fleet', action: () => { setCurrentPage('home'); setTimeout(() => document.getElementById('fleet-section')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { label: 'Packages', action: () => setCurrentPage('packages') },
    { label: 'Why Us', action: () => { setCurrentPage('home'); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { label: 'Reviews', action: () => { setCurrentPage('home'); setTimeout(() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { label: 'FAQs', action: () => { setCurrentPage('home'); setTimeout(() => document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { label: 'Contact Us', action: () => setCurrentPage('contact') },
  ];

  const trustFeatures = [
    { icon: '🚗', title: 'Wide Range of SUVs', desc: 'Perfect for families & groups' },
    { icon: '💰', title: 'Best Price Guarantee', desc: 'Competitive rates always' },
    { icon: '📅', title: 'Flexible Booking', desc: 'Change or cancel anytime' },
    { icon: '📞', title: '24/7 Customer Support', desc: "We're here to help" },
  ];

  const tabs = [
    { id: 'roundtrip', label: '🚗 Pick-up & Return' },
    { id: 'oneway', label: 'One Way' },
    { id: 'airport', label: '✈️ Airport Transfer' },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 28px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>

          {/* Logo */}
          <div
            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
          >
            <div style={{
              width: '42px', height: '42px',
              background: '#0B1B3D',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(11,27,61,0.18)'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 22V12h6v10" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '-0.5px' }}>
                Road<span style={{ color: '#F26A1B' }}>Nest</span>
              </span>
              <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '1px' }}>RENTALS</span>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 10px',
                  fontSize: '0.83rem',
                  fontWeight: 700,
                  color: '#1e293b',
                  borderRadius: '6px',
                  transition: 'color 0.15s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#F26A1B'}
                onMouseLeave={e => e.currentTarget.style.color = '#1e293b'}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Phone + Login */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(242,106,27,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F26A1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.4 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0B1B3D' }}>+91 73871 29287</span>
                <span style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: 600, marginTop: '2px' }}>Mon-Sun: 7AM – 10PM</span>
              </div>
            </div>

            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  style={{
                    background: '#0B1B3D', color: '#fff', border: 'none', cursor: 'pointer',
                    padding: '9px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  👤 {currentUser.name.split(' ')[0]}
                </button>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: 700, fontSize: '0.82rem' }}>
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                style={{
                  background: '#0B1B3D', color: '#fff', border: 'none', cursor: 'pointer',
                  padding: '10px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0 2px 8px rgba(11,27,61,0.18)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1a2d54'}
                onMouseLeave={e => e.currentTarget.style.background = '#0B1B3D'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '580px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background photo */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=85"
          alt="Family SUV road trip at mountain lake"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
            zIndex: 0
          }}
        />

        {/* White gradient overlay — left side for readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 38%, rgba(255,255,255,0.4) 58%, rgba(255,255,255,0) 75%)',
          zIndex: 1
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '1280px', margin: '0 auto',
          padding: '60px 28px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '40px'
        }}>
          {/* Left column: headline + booking widget */}
          <div style={{ flex: '0 0 auto', width: '100%', maxWidth: '520px' }}>

            {/* Headline */}
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{
                fontSize: '3.2rem', fontWeight: 900, lineHeight: 1.1,
                color: '#0B1B3D', margin: 0, letterSpacing: '-1.5px',
                fontFamily: "'Outfit', sans-serif"
              }}>
                More Space.<br />
                More Memories.
              </h1>
              <h1 style={{
                fontSize: '3.4rem', fontWeight: 700, lineHeight: 1.1,
                color: '#F26A1B', margin: '4px 0 0 0',
                fontFamily: "'Caveat', cursive",
                letterSpacing: '0px'
              }}>
                Better Together.
              </h1>
              <p style={{
                color: '#475569', fontSize: '0.95rem', fontWeight: 500,
                lineHeight: 1.65, marginTop: '14px', maxWidth: '400px'
              }}>
                Premium SUVs and family cars for comfortable journeys and unforgettable road trip experiences.
              </p>
            </div>

            {/* Booking Widget */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '22px 22px 18px',
              boxShadow: '0 20px 50px rgba(11,27,61,0.18)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0B1B3D', marginBottom: '14px' }}>
                Book Your Perfect Ride
              </h3>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', borderBottom: '1px solid #f0f0f0', paddingBottom: '12px' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSearchParams({ ...searchParams, tripType: tab.id });
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: activeTab === tab.id ? '1px solid #e2e8f0' : '1px solid transparent',
                      background: activeTab === tab.id ? '#f8fafc' : 'transparent',
                      color: activeTab === tab.id ? '#0B1B3D' : '#94a3b8',
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSearchSubmit}>
                {/* Row 1: Locations */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={labelStyle}>📍 Pick-up Location</label>
                    <select
                      value={searchParams.fromCity}
                      onChange={e => setSearchParams({ ...searchParams, fromCity: e.target.value })}
                      style={inputStyle}
                      required
                    >
                      <option value="">City, Airport, or Location</option>
                      <option value="Pune, Maharashtra, India">Pune City</option>
                      <option value="Mumbai, Maharashtra, India">Mumbai City</option>
                      <option value="Mumbai Airport, Maharashtra, India">Mumbai Airport</option>
                      <option value="Nashik, Maharashtra, India">Nashik City</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>📍 Return Location</label>
                    <select
                      value={searchParams.toCity}
                      onChange={e => setSearchParams({ ...searchParams, toCity: e.target.value })}
                      style={inputStyle}
                      required
                    >
                      <option value="">Same as pick-up</option>
                      <option value="Mahabaleshwar, Maharashtra, India">Mahabaleshwar</option>
                      <option value="Mumbai, Maharashtra, India">Mumbai City</option>
                      <option value="Shirdi, Maharashtra, India">Shirdi Temple</option>
                      <option value="Pune, Maharashtra, India">Pune City</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Dates + times */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={labelStyle}>📅 Pick-up Date</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="date"
                        value={searchParams.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setSearchParams({ ...searchParams, date: e.target.value })}
                        style={{ ...inputStyle, flex: 1 }}
                        required
                      />
                      <select style={{ ...inputStyle, width: '90px', flex: 'none' }}>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>📅 Return Date</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="date"
                        value={searchParams.returnDate || ''}
                        onChange={e => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <select style={{ ...inputStyle, width: '90px', flex: 'none' }}>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 3: Driver Age + Passengers + CTA */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'flex-end' }}>
                  <div>
                    <label style={labelStyle}>👤 Driver Age</label>
                    <select style={inputStyle}>
                      <option>25+ years</option>
                      <option>18–24 years</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>👥 Passengers</label>
                    <select style={inputStyle}>
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3–4 Passengers</option>
                      <option>5+ Passengers</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    style={{
                      height: '36px',
                      background: '#F26A1B',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      padding: '0 20px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(242,106,27,0.3)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#d85513'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#F26A1B'; e.currentTarget.style.transform = 'none'; }}
                  >
                    Search Cars
                  </button>
                </div>

                {/* Trust pills */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: '14px', paddingTop: '12px',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: '0.7rem', fontWeight: 700, color: '#64748b'
                }}>
                  <span><span style={{ color: '#F26A1B' }}>✓</span> No Hidden Fees</span>
                  <span><span style={{ color: '#F26A1B' }}>✓</span> Free Cancellation</span>
                  <span><span style={{ color: '#F26A1B' }}>✓</span> 24/7 Support</span>
                </div>
              </form>
            </div>
          </div>

          {/* Right column: spacer — the background image fills this area */}
          <div style={{ flex: 1 }} />
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────────── */}
      <div style={{
        background: '#0B1B3D',
        borderTop: '3px solid #F26A1B',
        padding: '22px 0',
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}>
          {trustFeatures.map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem', flexShrink: 0
              }}>
                {feat.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>{feat.title}</h4>
                <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: '2px 0 0', fontWeight: 500 }}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Shared style tokens ──────────────────────────────────
const labelStyle = {
  display: 'block',
  fontSize: '0.65rem',
  fontWeight: 800,
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  marginBottom: '4px'
};

const inputStyle = {
  width: '100%',
  height: '36px',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: '#1e293b',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '0 10px',
  outline: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.15s'
};
