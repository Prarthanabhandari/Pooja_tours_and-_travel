import React from 'react';

export default function FleetSection({ 
  searchParams, 
  setSearchParams 
}) {
  const categories = [
    {
      title: 'Compact SUVs',
      desc: 'Great for small families',
      rate: 'From ₹11/km',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Midsize SUVs',
      desc: 'Extra comfort & space',
      rate: 'From ₹13/km',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Full-Size SUVs',
      desc: 'More space for more fun',
      rate: 'From ₹15/km',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Luxury SUVs',
      desc: 'Premium comfort rides',
      rate: 'From ₹18/km',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: '17-Seater Luxury Traveller',
      desc: 'Ideal for family & corporate groups',
      rate: 'From ₹22/km',
      image: '/17-seat-tempo-traveller.png'
    }
  ];

  return (
    <div id="fleet-section" className="container" style={{ marginTop: '80px', marginBottom: '40px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '6px', color: '#0b1329' }}>
        Our Fleet Categories
      </h2>
      <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '40px', fontSize: '0.95rem' }}>
        Spacious. Reliable. Comfortable. Choose the perfect ride for your journey.
      </p>
      
      {/* 5-Column Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            style={{ 
              background: '#ffffff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              padding: '16px', 
              textAlign: 'center', 
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)'
            }}
            className="fleet-cat-card"
          >
            <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '12px' }}>
              <img 
                src={cat.image} 
                alt={cat.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: '0 0 4px 0', color: '#0b1329' }}>{cat.title}</h4>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 10px 0' }}>{cat.desc}</p>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f97316' }}>{cat.rate}</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          className="btn-secondary"
          style={{ padding: '8px 24px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
          onClick={() => {
            setSearchParams({ ...searchParams, bookingType: 'bus' });
            document.getElementById('search-panel')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          View Full Fleet
        </button>
      </div>
    </div>
  );
}
