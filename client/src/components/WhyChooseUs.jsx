import React from 'react';

export default function WhyChooseUs() {
  const safetyFeatures = [
    {
      title: 'Well-Maintained Vehicles',
      desc: 'Regularly serviced for a smooth ride',
      icon: '🛡️'
    },
    {
      title: 'Advanced Safety',
      desc: 'ABS, GPS tracking & safety alerts',
      icon: '🔒'
    },
    {
      title: 'Clean & Sanitized',
      desc: 'Hygienic cars for your peace of mind',
      icon: '🧼'
    },
    {
      title: 'Roadside Assistance',
      desc: '24/7 support whenever you need',
      icon: '🛠️'
    },
    {
      title: 'GPS Navigation',
      desc: 'Stay on track wherever you go',
      icon: '📍'
    }
  ];

  return (
    <div id="why-us-section" style={{ background: '#f8fafc', padding: '60px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', width: '100%' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, color: '#0b1329', marginBottom: '6px' }}>
          Safety & Comfort, Always Our Priority
        </h2>
        <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '40px', fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 40px auto', lineHeight: '1.5' }}>
          Every journey matters. That's why we ensure top-notch safety and comfort standards in every vehicle.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {safetyFeatures.map((feat, idx) => (
            <div 
              key={idx} 
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px 16px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)'
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '14px' }}>{feat.icon}</span>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0b1329', marginBottom: '6px' }}>{feat.title}</h4>
              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, lineHeight: '1.4' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
