import React from 'react';

export default function PopularPackages({ 
  searchParams, 
  setSearchParams 
}) {
  const packages = [
    {
      title: 'Mountain Escape',
      desc: '3 Days / 4 Nights',
      price: 'From ₹4,500',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80',
      to: 'Mahabaleshwar, Maharashtra, India'
    },
    {
      title: 'Coastal Drive',
      desc: '4 Days / 5 Nights',
      price: 'From ₹6,200',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
      to: 'Mumbai, Maharashtra, India'
    },
    {
      title: 'City Explorer',
      desc: '2 Days / 3 Nights',
      price: 'From ₹3,100',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80',
      to: 'Mumbai Airport, Maharashtra, India'
    },
    {
      title: 'Countryside Retreat',
      desc: '3 Days / 4 Nights',
      price: 'From ₹3,900',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80',
      to: 'Nashik, Maharashtra, India'
    },
    {
      title: 'Family Adventure',
      desc: '5 Days / 6 Nights',
      price: 'From ₹8,500',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80',
      to: 'Shirdi, Maharashtra, India'
    }
  ];

  return (
    <div id="packages-section" className="container" style={{ marginTop: '80px', marginBottom: '40px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '6px', color: '#0b1329' }}>
        Popular Travel Packages
      </h2>
      <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '40px', fontSize: '0.95rem' }}>
        Handpicked packages for unforgettable road trips.
      </p>

      {/* Landscape Cards list */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {packages.map((pkg, idx) => (
          <div 
            key={idx}
            onClick={() => {
              setSearchParams({
                ...searchParams,
                fromCity: 'Pune, Maharashtra, India',
                toCity: pkg.to,
                bookingType: 'cab'
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              height: '240px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
              transition: 'transform 0.2s ease'
            }}
            className="pkg-card"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            {/* Background Image */}
            <img 
              src={pkg.image} 
              alt={pkg.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            {/* Dark overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, rgba(11, 19, 41, 0.95) 0%, rgba(11, 19, 41, 0.2) 60%, rgba(11, 19, 41, 0) 100%)',
              zIndex: 1
            }}></div>

            {/* Content floating on top */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '16px',
              zIndex: 2,
              color: '#ffffff'
            }}>
              <span style={{ fontSize: '0.72rem', color: '#f97316', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{pkg.desc}</span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '4px 0 8px 0', color: '#ffffff' }}>{pkg.title}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>{pkg.price}</span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.12)', padding: '2px 8px', borderRadius: '4px' }}>Book ➔</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          className="btn-secondary"
          style={{ padding: '8px 24px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Explore All Packages
        </button>
      </div>
    </div>
  );
}
