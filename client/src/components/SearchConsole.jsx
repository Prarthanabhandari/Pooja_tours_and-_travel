import React from 'react';

export default function SearchConsole({ 
  searchParams, 
  setSearchParams, 
  handleSearchSubmit 
}) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15)',
      width: '100%',
      maxWidth: '460px',
      border: '1px solid #cbd5e1'
    }}>
      {/* Search Type Tabs */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid #e2e8f0', pb: '12px', marginBottom: '16px' }}>
        {[
          { id: 'roundtrip', label: 'Pick-up & Return' },
          { id: 'oneway', label: 'One Way' },
          { id: 'local', label: 'Hourly Rental' }
        ].map(tab => {
          const isActive = searchParams.tripType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSearchParams({ ...searchParams, tripType: tab.id, bookingType: 'cab' })}
              style={{
                padding: '8px 12px',
                borderRadius: '8px 8px 0 0',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#f97316' : '#64748b',
                border: 'none',
                borderBottom: isActive ? '2px solid #f97316' : 'none'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Pick-up Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Pick-up Location</label>
          <select
            className="form-input"
            style={{ height: '38px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc', padding: '0 8px' }}
            value={searchParams.fromCity}
            onChange={(e) => setSearchParams({ ...searchParams, fromCity: e.target.value })}
            required
          >
            <option value="">City, Airport, or Location</option>
            <option value="Pune, Maharashtra, India">Pune, Maharashtra, India</option>
            <option value="Mumbai, Maharashtra, India">Mumbai, Maharashtra, India</option>
            <option value="Mumbai Airport, Maharashtra, India">Mumbai Airport Drop</option>
            <option value="Nashik, Maharashtra, India">Nashik, Maharashtra, India</option>
          </select>
        </div>

        {/* Return Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Return Location</label>
          <select
            className="form-input"
            style={{ height: '38px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc', padding: '0 8px' }}
            value={searchParams.toCity}
            onChange={(e) => setSearchParams({ ...searchParams, toCity: e.target.value })}
            required
          >
            <option value="">Same as pick-up or select destination</option>
            <option value="Pune, Maharashtra, India">Pune, Maharashtra, India</option>
            <option value="Mumbai, Maharashtra, India">Mumbai, Maharashtra, India</option>
            <option value="Mumbai Airport, Maharashtra, India">Mumbai Airport Drop</option>
            <option value="Shirdi, Maharashtra, India">Shirdi, Maharashtra, India</option>
            <option value="Mahabaleshwar, Maharashtra, India">Mahabaleshwar, Maharashtra, India</option>
            <option value="Nashik, Maharashtra, India">Nashik, Maharashtra, India</option>
          </select>
        </div>

        {/* Pick-up Date & Time */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Pick-up Date</label>
            <input
              type="date"
              className="form-input"
              style={{ height: '38px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc', padding: '0 8px' }}
              value={searchParams.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
              required
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Pick-up Time</label>
            <input
              type="text"
              placeholder="e.g. 10:00 AM"
              className="form-input"
              style={{ height: '38px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc', padding: '0 8px' }}
              value={searchParams.pickupTime || ''}
              onChange={(e) => setSearchParams({ ...searchParams, pickupTime: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Return Date (only if Round Trip) */}
        {searchParams.tripType === 'roundtrip' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Return Date</label>
            <input
              type="date"
              className="form-input"
              style={{ height: '38px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc', padding: '0 8px' }}
              value={searchParams.returnDate}
              onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
              required
            />
          </div>
        )}

        {/* Driver Age & Passengers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Driver Age</label>
            <select
              style={{ height: '38px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc', padding: '0 8px' }}
            >
              <option>25+ years</option>
              <option>Under 25</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Passengers</label>
            <select
              style={{ height: '38px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc', padding: '0 8px' }}
            >
              <option>1 Passenger</option>
              <option>2-4 Passengers</option>
              <option>5-7 Passengers</option>
              <option>8+ Passengers</option>
            </select>
          </div>
        </div>

        {/* Orange Search button */}
        <button
          type="submit"
          style={{
            height: '42px',
            background: '#f97316',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 800,
            fontSize: '0.92rem',
            cursor: 'pointer',
            marginTop: '10px',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#ea580c';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#f97316';
            e.target.style.transform = 'none';
          }}
        >
          Search Cars
        </button>
      </form>

      {/* Trust labels under search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', marginTop: '16px', paddingTop: '12px', fontSize: '0.72rem', color: '#64748b' }}>
        <span>✔ No Hidden Fees</span>
        <span>✔ Free Cancellation</span>
        <span>✔ 24/7 Support</span>
      </div>
    </div>
  );
}
