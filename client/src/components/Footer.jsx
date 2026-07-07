import React from 'react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer style={{
      background: '#0b1329',
      padding: '40px 0 20px 0',
      borderTop: '1px solid #1e293b',
      color: '#94a3b8',
      width: '100%'
    }}>
      {/* Email Subscription Bar */}
      <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '30px', marginBottom: '30px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, margin: 0 }}>Get Exclusive Offers & Travel Tips</h4>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '4px 0 0 0' }}>Subscribe to our newsletter and never miss a deal!</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', minWidth: '280px', flex: '0.5' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={{
                background: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '0.85rem',
                color: '#ffffff',
                flex: 1
              }}
            />
            <button 
              type="button" 
              style={{
                background: '#f97316',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.82rem',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
        {/* Brand block */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>POOJA TRAVELS</h3>
          <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: '#94a3b8' }}>
            Your trusted partner for premium outstation cabs, family SUV bookings, and customized group traveler packages from Pune since 2018.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <li><button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', color: '#94a3b8' }}>Home</button></li>
            <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('fleet-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ cursor: 'pointer', color: '#94a3b8' }}>Our Fleet</button></li>
            <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ cursor: 'pointer', color: '#94a3b8' }}>Packages</button></li>
            <li><button onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', color: '#94a3b8' }}>Contact Us</button></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ cursor: 'pointer', color: '#94a3b8' }}>FAQs</button></li>
            <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ cursor: 'pointer', color: '#94a3b8' }}>Privacy Policy</button></li>
            <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ cursor: 'pointer', color: '#94a3b8' }}>Terms & Conditions</button></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Contact Info</h4>
          <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: '#94a3b8' }}>
            📍 Vishrantwadi, Tingre Nagar, Pune 411015<br />
            📞 Call Desk: +91 73871 29287<br />
            💬 WhatsApp: +91 96233 24139<br />
            ✉️ Support: booking@poojatravels.com
          </p>
        </div>
      </div>

      {/* Social links & Copyright */}
      <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', marginTop: '20px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '0.78rem' }}>
          <span>© 2026 Pooja Travels. All rights reserved. Registered under Maharashtra Travel Guidelines.</span>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="https://instagram.com/pooja_travels_official" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
