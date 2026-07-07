import React from 'react';

export default function Header({ 
  currentPage, 
  setCurrentPage, 
  currentUser, 
  handleLogout, 
  setShowAuthModal, 
  setAuthMode 
}) {
  return (
    <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', width: '100%', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px' }}>
        {/* Logo block */}
        <div 
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {/* Logo badge representing sunset and palm trees */}
          <div style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(249, 115, 22, 0.15)' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, #f97316, #fbbf24)',
              zIndex: 1
            }}></div>
            <svg width="38" height="38" viewBox="0 0 100 100" style={{ position: 'relative', zIndex: 2 }}>
              <circle cx="50" cy="65" r="16" fill="rgba(255, 255, 255, 0.3)" />
              <path d="M22,85 C28,75 32,60 33,48 C30,48 26,50 22,54 C25,50 29,46 34,46 C35,42 33,38 31,34 C34,37 36,41 36,45 C41,41 47,38 52,37 C47,39 42,43 38,47 C39,52 38,58 35,63 C36,68 35,76 25,85" fill="#0b1329" />
              <path d="M78,85 C72,75 68,60 67,48 C70,48 74,50 78,54 C75,50 71,46 66,46 C65,42 67,38 69,34 C66,37 64,41 64,45 C59,41 53,38 48,37 C53,39 58,43 62,47 C61,52 62,58 65,63 C64,68 65,76 75,85" fill="#0b1329" />
              <path d="M0,80 Q50,75 100,80 L100,100 L0,100 Z" fill="#0b1329" />
              <text x="50" y="93" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle">PTT</text>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0b1329', letterSpacing: '-0.5px', margin: 0, display: 'flex', alignItems: 'center', gap: '2px' }}>
              POOJA <span style={{ color: '#f97316', fontWeight: 700 }}>TRAVELS</span>
            </h1>
            <span style={{ fontSize: '0.62rem', color: '#64748b', letterSpacing: '3px', fontWeight: 700, marginTop: '-2px', textTransform: 'uppercase' }}>Since 2018</span>
          </div>
        </div>

        {/* Menu Navigation links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: currentPage === 'home' ? '#f97316' : '#0b1329', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Home</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('fleet-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ color: '#0b1329', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Our Fleet</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ color: '#0b1329', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Packages</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ color: '#0b1329', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Why Us</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ color: '#0b1329', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Reviews</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ color: '#0b1329', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>FAQs</button>
          <button onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: currentPage === 'contact' ? '#f97316' : '#0b1329', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Contact Us</button>
        </nav>

        {/* Hotline block & Login button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid #cbd5e1', paddingLeft: '20px' }}>
            <span style={{ fontSize: '1.3rem' }}>📞</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0b1329' }}>+91 73871 29287</span>
              <span style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '-2px' }}>Mon-Sun: 7AM - 10PM</span>
            </div>
          </div>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button 
                onClick={() => setCurrentPage('dashboard')} 
                style={{ 
                  padding: '10px 18px', 
                  fontSize: '0.85rem', 
                  fontWeight: 700,
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: '#0b1329', 
                  color: '#ffffff', 
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                👤 {currentUser.name.split(' ')[0]}
              </button>
              <button onClick={handleLogout} style={{ color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>Logout</button>
            </div>
          ) : (
            <button 
              onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} 
              style={{
                background: '#0b1329',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                padding: '10px 22px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = '#1a2238'}
              onMouseLeave={(e) => e.target.style.background = '#0b1329'}
            >
              👤 Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
