import React from 'react';

export default function GetApp() {
  return (
    <div style={{ background: '#0b1329', padding: '60px 0', borderTop: '4px solid #f97316', color: '#ffffff', width: '100%' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ flex: '1.2', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px', letterSpacing: '-0.8px' }}>
            Your Journey, Made Easy
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', maxWidth: '440px' }}>
            Manage your trips, unlock exclusive outstation cab offers, and connect with our 24/7 customer care desk in just a single tap.
          </p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <a href="https://apple.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', padding: '10px 16px', color: '#ffffff' }}>
              <span style={{ fontSize: '1.4rem' }}>🍎</span>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase' }}>Download on the</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>App Store</span>
              </div>
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', padding: '10px 16px', color: '#ffffff' }}>
              <span style={{ fontSize: '1.4rem' }}>🤖</span>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase' }}>Get it on</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Google Play</span>
              </div>
            </a>
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderLeft: '1.5px solid #1e293b', paddingLeft: '40px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>Need Help?</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <span style={{ fontSize: '2.2rem', background: 'rgba(255,255,255,0.06)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📞
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="tel:+917387129287" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f97316' }}>+91 73871 29287</a>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Calls & support desk (Mon-Sun: 7AM - 10PM)</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '2.2rem', background: 'rgba(255,255,255,0.06)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              💬
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="https://wa.me/919623324139" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22c55e' }}>+91 96233 24139</a>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>WhatsApp support chat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
