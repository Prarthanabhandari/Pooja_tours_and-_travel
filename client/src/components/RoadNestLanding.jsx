import React from 'react';

export default function RoadNestLanding({ 
  searchParams, 
  setSearchParams, 
  handleSearchSubmit,
  setCurrentPage,
  setShowAuthModal,
  setAuthMode,
  currentUser,
  handleLogout
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between font-sans selection:bg-[#F26A1B] selection:text-white bg-white overflow-x-hidden">
      
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="bg-white border-b border-gray-150 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo block */}
          <div 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Dark car vector outline inside house shape */}
            <div className="w-11 h-11 bg-[#0B1B3D] rounded-lg flex items-center justify-center text-white shadow-md">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 22V12h6v10" />
                <circle cx="12" cy="9" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[#0B1B3D] text-xl font-extrabold tracking-tight leading-none">POOJA</span>
              <span className="text-gray-400 text-[7px] font-black tracking-[2.5px] uppercase mt-0.5">Tours & Travel</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-[#0B1B3D] font-bold text-sm relative py-2 border-b-2 border-[#F26A1B] transition-colors"
            >
              Home
            </button>
            {['Our Fleet', 'Packages', 'Why Us', 'Reviews', 'FAQs', 'Contact Us'].map((link) => (
              <button
                key={link}
                onClick={() => {
                  if (link === 'Contact Us') {
                    setCurrentPage('contact');
                  } else if (link === 'Packages') {
                    setCurrentPage('packages');
                  } else {
                    setCurrentPage('home');
                    const targetId = link.toLowerCase().replace(/\s+/g, '-');
                    setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }}
                className="text-[#0B1B3D] hover:text-[#F26A1B] font-bold text-sm transition-colors py-2"
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Right Side Section: Hotline & CTA Button */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-2xl text-[#F26A1B]">📞</span>
              <div className="flex flex-col">
                <span className="text-sm font-black text-[#0B1B3D]">+1 (888) 742-6837</span>
                <span className="text-[10px] text-gray-400 mt-[-2px] font-bold">Mon-Sun: 7AM - 10PM</span>
              </div>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className="bg-[#0B1B3D] text-white px-5 py-2.5 rounded-md font-bold text-sm hover:bg-[#1a2d54] transition-all shadow-md"
                >
                  👤 {currentUser.name.split(' ')[0]}
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 text-sm font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                className="bg-[#0B1B3D] text-white px-5 py-2.5 rounded-md font-bold text-sm hover:bg-[#1a2d54] transition-all flex items-center gap-2 shadow-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. HERO / BACKGROUND CONTAINER */}
      <section className="relative flex-1 min-h-[82vh] w-full flex items-center overflow-visible py-12">
        {/* Full-Screen Immersive Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80" 
            alt="Pooja Travels 17-Seater Bus in Nature" 
            className="w-full h-full object-cover"
          />
          {/* Subtle light background gradient overlay on the left to make text/widget highly readable */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-white via-white/85 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Typography & Floating Booking Widget */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              {/* Typography block */}
              <div className="mb-6">
                <h2 className="text-[#0B1B3D] text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] mb-1">
                  More Space.
                </h2>
                <h2 className="text-[#0B1B3D] text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] mb-1">
                  More Memories.
                </h2>
                <h2 className="text-[#F26A1B] text-5xl font-bold font-script mt-2 font-cursive" style={{ fontFamily: "'Caveat', cursive" }}>
                  Better Together.
                </h2>
                <p className="text-[#475569] text-sm md:text-base font-semibold leading-relaxed mt-4 max-w-md">
                  Premium SUVs and family cars for comfortable journeys and unforgettable road trip experiences.
                </p>
              </div>

              {/* Floating Booking Widget Card */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_20px_50px_rgba(11,27,61,0.18)] border border-gray-100 w-full max-w-xl transition-all">
                <h3 className="text-[#0B1B3D] font-extrabold text-sm mb-4">Book Your Perfect Ride</h3>
                
                {/* Internal Tabs */}
                <div className="flex gap-2 mb-4 border-b border-gray-100 pb-3">
                  <button 
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-50 border border-gray-200 text-[#0B1B3D]"
                  >
                    <span>🚗</span> Pick-up & Return
                  </button>
                  <button 
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:text-[#0B1B3D] hover:bg-gray-50 transition-all"
                  >
                    One Way
                  </button>
                  <button 
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:text-[#0B1B3D] hover:bg-gray-50 transition-all"
                  >
                    Airport Transfer
                  </button>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  {/* Row 1: Pick-up & Return Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 relative">
                      <label className="text-gray-400 text-[9px] font-black uppercase tracking-wider">📍 Pick-up Location</label>
                      <select 
                        value={searchParams.fromCity}
                        onChange={(e) => setSearchParams({ ...searchParams, fromCity: e.target.value })}
                        className="w-full text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg h-9 px-3 outline-none focus:border-[#F26A1B] focus:bg-white transition-all"
                        required
                      >
                        <option value="">City, Airport, or Location</option>
                        <option value="Pune, Maharashtra, India">Pune City</option>
                        <option value="Mumbai, Maharashtra, India">Mumbai City</option>
                        <option value="Mumbai Airport, Maharashtra, India">Mumbai Airport</option>
                        <option value="Nashik, Maharashtra, India">Nashik City</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 relative">
                      <label className="text-gray-400 text-[9px] font-black uppercase tracking-wider">📍 Return Location</label>
                      <select 
                        value={searchParams.toCity}
                        onChange={(e) => setSearchParams({ ...searchParams, toCity: e.target.value })}
                        className="w-full text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg h-9 px-3 outline-none focus:border-[#F26A1B] focus:bg-white transition-all"
                        required
                      >
                        <option value="">Same as pick-up</option>
                        <option value="Mahabaleshwar, Maharashtra, India">Mahabaleshwar</option>
                        <option value="Mumbai, Maharashtra, India">Mumbai City</option>
                        <option value="Shirdi, Maharashtra, India">Shirdi Temple</option>
                        <option value="Pune, Maharashtra, India">Pune City</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Date & Time Picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 text-[9px] font-black uppercase tracking-wider">📅 Pick-up Date</label>
                      <div className="flex gap-2">
                        <input 
                          type="date"
                          value={searchParams.date}
                          onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg h-9 px-2 outline-none focus:border-[#F26A1B] transition-all"
                          required
                        />
                        <input 
                          type="text"
                          placeholder="10:00 AM"
                          value={searchParams.pickupTime || '10:00 AM'}
                          onChange={(e) => setSearchParams({ ...searchParams, pickupTime: e.target.value })}
                          className="w-[110px] text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg h-9 px-2 outline-none focus:border-[#F26A1B] transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 text-[9px] font-black uppercase tracking-wider">📅 Return Date</label>
                      <div className="flex gap-2">
                        <input 
                          type="date"
                          value={searchParams.returnDate || ''}
                          onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                          className="w-full text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg h-9 px-2 outline-none focus:border-[#F26A1B] transition-all"
                        />
                        <input 
                          type="text"
                          placeholder="10:00 AM"
                          className="w-[110px] text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg h-9 px-2 outline-none focus:border-[#F26A1B] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Driver Age, Passengers & Submit */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 text-[9px] font-black uppercase tracking-wider">👤 Driver Age</label>
                      <select 
                        className="w-full text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg h-9 px-2 outline-none focus:border-[#F26A1B] transition-all"
                      >
                        <option>25+ years</option>
                        <option>18-24 years</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 text-[9px] font-black uppercase tracking-wider">👥 Passengers</label>
                      <select 
                        className="w-full text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg h-9 px-2 outline-none focus:border-[#F26A1B] transition-all"
                      >
                        <option>1 Passenger</option>
                        <option>2 Passengers</option>
                        <option>3-4 Passengers</option>
                        <option>5+ Passengers</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full h-9 bg-[#F26A1B] hover:bg-[#d85513] text-white font-extrabold text-xs rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider"
                    >
                      Search Cars
                    </button>
                  </div>
                </form>

                {/* Card Footer props */}
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 text-[10px] font-black text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="text-[#F26A1B]">✓</span> No Hidden Fees
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#F26A1B]">✓</span> Free Cancellation
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#F26A1B]">✓</span> 24/7 Support
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Empty on desktop since background fills layout */}
            <div className="hidden lg:block lg:col-span-6"></div>

          </div>
        </div>
      </section>

      {/* 3. DEEP NAVY BOTTOM TRUST BAR */}
      <footer className="bg-[#0B1B3D] py-5 text-white z-20 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#F26A1B] bg-white/5 w-11 h-11 rounded-full flex items-center justify-center">🚗</span>
              <div className="flex flex-col">
                <h4 className="text-xs font-black tracking-tight leading-tight">Wide Range of SUVs</h4>
                <p className="text-[10px] text-gray-300 font-medium">Perfect for families & groups</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#F26A1B] bg-white/5 w-11 h-11 rounded-full flex items-center justify-center">💰</span>
              <div className="flex flex-col">
                <h4 className="text-xs font-black tracking-tight leading-tight">Best Price Guarantee</h4>
                <p className="text-[10px] text-gray-300 font-medium">Competitive rates always</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#F26A1B] bg-white/5 w-11 h-11 rounded-full flex items-center justify-center">📅</span>
              <div className="flex flex-col">
                <h4 className="text-xs font-black tracking-tight leading-tight">Flexible Booking</h4>
                <p className="text-[10px] text-gray-300 font-medium">Change or cancel anytime</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#F26A1B] bg-white/5 w-11 h-11 rounded-full flex items-center justify-center">📞</span>
              <div className="flex flex-col">
                <h4 className="text-xs font-black tracking-tight leading-tight">24/7 Customer Support</h4>
                <p className="text-[10px] text-gray-300 font-medium">We're here to help</p>
              </div>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
