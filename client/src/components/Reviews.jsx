import React from 'react';

export default function Reviews() {
  const customerReviews = [
    {
      name: 'James R.',
      location: 'New York, USA',
      text: '"Excellent service! The SUV was perfect for our family road trip. Clean, comfortable, and spacious."',
      rating: 5,
      avatar: '👨'
    },
    {
      name: 'Priya S.',
      location: 'Toronto, Canada',
      text: '"Booking was easy and the staff was super helpful. Highly recommended!"',
      rating: 5,
      avatar: '👩'
    },
    {
      name: 'Amit K.',
      location: 'New Jersey, USA',
      text: '"Traveled with kids and had a great experience. The car was in top condition."',
      rating: 5,
      avatar: '👨'
    },
    {
      name: 'Sophia L.',
      location: 'London, UK',
      text: '"Best rental experience ever! Will definitely choose RoadNest/Pooja Travels again."',
      rating: 5,
      avatar: '👩'
    }
  ];

  return (
    <div id="reviews-section" style={{ background: '#ffffff', padding: '60px 0', borderTop: '1px solid #e2e8f0', width: '100%' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, color: '#0b1329', marginBottom: '6px' }}>
          What Our Customers Say
        </h2>
        <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '40px', fontSize: '0.95rem' }}>
          Real feedback from our happy travelers.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {customerReviews.map((rev, idx) => (
            <div 
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ color: '#fbbf24', fontSize: '0.9rem', marginBottom: '12px' }}>
                  {Array.from({ length: rev.rating }).map((_, i) => '★').join('')}
                </div>
                <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: '1.6', fontStyle: 'italic', margin: '0 0 20px 0' }}>
                  {rev.text}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                <span style={{ fontSize: '1.4rem', background: '#e2e8f0', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {rev.avatar}
                </span>
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0b1329', margin: 0 }}>{rev.name}</h4>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
