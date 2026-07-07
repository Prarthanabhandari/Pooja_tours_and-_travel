import React from 'react';
import SearchConsole from './SearchConsole';

export default function HeroSection({ 
  searchParams, 
  setSearchParams, 
  handleSearchSubmit 
}) {
  return (
    <>
      <div style={{ 
        position: 'relative', 
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.15), rgba(15, 23, 42, 0.15)), url('/bus_tree.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundRepeat: 'no-repeat',
        height: '92vh',
        minHeight: '680px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'visible'
      }}>
        {/* Dark overlay specifically for text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.5) 0%, rgba(15, 23, 42, 0.2) 50%, rgba(15, 23, 42, 0) 100%)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ 
          position: 'relative', 
          zIndex: 5, 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: '40px',
          paddingTop: '40px',
          paddingBottom: '40px'
        }}>
          {/* Left Side Content & Cursive Text */}
          <div style={{ flex: '1.2', minWidth: '320px', color: '#ffffff' }}>
            <h2 style={{ 
              fontSize: '3.6rem', 
              fontWeight: 800, 
              lineHeight: '1.1', 
              letterSpacing: '-1.5px',
              marginBottom: '4px',
              color: '#ffffff'
            }}>
              More Space.<br />
              More Memories.
            </h2>
            <h2 style={{ 
              fontSize: '4rem', 
              fontFamily: "'Caveat', cursive", 
              color: '#f97316', 
              lineHeight: '1.1', 
              marginTop: '0px', 
              marginBottom: '15px' 
            }}>
              Better Together.
            </h2>
            <p style={{ 
              color: '#e2e8f0', 
              fontSize: '1.1rem', 
              lineHeight: '1.6', 
              marginBottom: '0px', 
              maxWidth: '460px' 
            }}>
              Premium SUVs and family coaches for comfortable journeys and unforgettable family road trip experiences.
            </p>
          </div>

          {/* Right Side: Floating Search Console Card */}
          <div style={{ 
            flex: '1', 
            minWidth: '320px', 
            display: 'flex', 
            justifyContent: 'flex-end',
            zIndex: 15
          }}>
            <SearchConsole 
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              handleSearchSubmit={handleSearchSubmit}
            />
          </div>
        </div>
      </div>

      {/* RoadNest Bottom Navy Features Banner */}
      <div style={{ background: '#0b1329', padding: '24px 0', borderTop: '4px solid #f97316', width: '100%' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', color: '#ffffff' }}>
          {[
            { title: 'Wide Range of SUVs', desc: 'Perfect for families & groups', icon: '🚗' },
            { title: 'Best Price Guarantee', desc: 'Competitive rates always', icon: '💰' },
            { title: 'Flexible Booking', desc: 'Change or cancel anytime', icon: '📅' },
            { title: '24/7 Customer Support', desc: 'We\'re here to help', icon: '📞' }
          ].map((feat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.8rem', background: 'rgba(255,255,255,0.06)', width: '46px', height: '46px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {feat.icon}
              </span>
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}>{feat.title}</h4>
                <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
