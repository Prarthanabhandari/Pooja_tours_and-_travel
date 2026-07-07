import React from 'react';

export default function HowItWorks() {
  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '10px' }}>How it Works</h2>
      <p style={{ color: '#475569', textAlign: 'center', marginBottom: '50px', fontSize: '1.1rem', fontWeight: 600 }}>
        4 Simple Steps to Book Your Car
      </p>
      
      <div className="glass-panel" style={{ padding: '45px 30px', position: 'relative' }}>
        <div className="steps-line">
          <div className="steps-line-progress" style={{ background: '#2563eb' }}></div>
        </div>
        
        <div className="steps-container">
          {[
            { step: '1', title: 'Select Destination', desc: 'Choose your pick-up point, outstation destination, and date.', icon: '📍' },
            { step: '2', title: 'Select Your Car', desc: 'Choose between Hatchback, Sedan, SUV, or a 17-Seater Luxury Bus.', icon: '🚗' },
            { step: '3', title: 'Define Your Booking', desc: 'Provide contact info and trip specifics to register your request.', icon: '📝' },
            { step: '4', title: 'Payment', desc: 'Pay securely online or complete payment with driver after the journey.', icon: '💳' }
          ].map((node, idx) => (
            <div key={idx} className="step-node">
              <div className="step-circle">
                <span style={{ fontSize: '2.2rem' }}>{node.icon}</span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Step {node.step}
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>{node.title}</h4>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.4', maxWidth: '185px' }}>{node.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
