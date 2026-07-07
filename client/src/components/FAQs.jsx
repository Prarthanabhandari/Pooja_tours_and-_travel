import React, { useState } from 'react';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What documents do I need to rent a car / bus?',
      a: 'You will need a valid government-issued ID proof (Aadhar Card/Passport) and driving license if opting for self-drive (where applicable). For chauffeured outstation tours, only a passenger ID proof is required.'
    },
    {
      q: 'Is there a mileage limit on trip bookings?',
      a: 'For outstation trips, we have a standard minimum limit of 250 km per day. Tolls, state tax, and parking charges are computed transparently based on actual travel.'
    },
    {
      q: 'Can I modify or cancel my travel booking?',
      a: 'Yes, you can modify or cancel your booking up to 24 hours before the scheduled departure time with zero cancellation charges.'
    },
    {
      q: 'Do you offer Pune / Mumbai airport pick-up and drop-off?',
      a: 'Yes, we provide 24/7 dedicated airport drop-offs and pick-ups between Pune and Mumbai International Airport (T2) at fixed, surge-free pricing.'
    },
    {
      q: 'Are your vehicles insured and safe?',
      a: 'All our tourist cabs and passenger traveler buses are fully insured, regularly serviced, and passenger safety features like GPS tracking are active.'
    }
  ];

  return (
    <div id="faqs-section" style={{ background: '#f8fafc', padding: '60px 0', borderTop: '1px solid #e2e8f0', width: '100%' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, color: '#0b1329', marginBottom: '6px' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '40px', fontSize: '0.95rem' }}>
          Answers to your common queries.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    textAlign: 'left',
                    background: 'transparent',
                    color: '#0b1329',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.2rem', color: '#f97316' }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px 20px',
                    fontSize: '0.85rem',
                    color: '#475569',
                    lineHeight: '1.6',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '12px'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
