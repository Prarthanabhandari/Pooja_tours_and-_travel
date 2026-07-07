import React from 'react';

export default function CityZipLanding({ 
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
    <div className="bg-white min-h-screen font-sans selection:bg-[#0055FF] selection:text-white">
      {/* 2. HEADER / NAVIGATION BAR */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo block */}
          <div 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Blue location pin with 'Z' icon */}
            <div className="relative w-10 h-10 bg-[#0055FF] rounded-full flex items-center justify-center shadow-md shadow-blue-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
              </svg>
              <span className="absolute text-white font-extrabold text-xs mt-[-5px]">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#0055FF] text-xl font-extrabold tracking-tight leading-none">CityZip</span>
              <span className="text-gray-400 text-[9px] font-bold tracking-[2.5px] uppercase mt-0.5">Rent A Car</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-[#0055FF] font-semibold text-sm relative py-2 border-b-2 border-[#0055FF] transition-colors"
            >
              Home
            </button>
            {['Our Cars', 'Pricing', 'Locations', 'How It Works', 'About Us', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => {
                  if (link === 'Contact') {
                    setCurrentPage('contact');
                  } else {
                    setCurrentPage('home');
                    const targetId = link.toLowerCase().replace(/\s+/g, '-');
                    setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }}
                className="text-gray-600 hover:text-[#0055FF] font-medium text-sm transition-colors py-2"
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Right Side: Hotline & Sign In */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 text-gray-700">
              <span className="text-xl">📞</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1A1A1A]">+1 555 248 7000</span>
                <span className="text-[10px] text-gray-400 mt-[-2px]">Mon-Sun: 7AM - 10PM</span>
              </div>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className="bg-[#0055FF] text-white px-5 py-2.5 rounded-md font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
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
                className="bg-[#0055FF] text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-blue-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text Content & Feature Badges */}
            <div className="lg:col-span-5 flex flex-col z-10">
              <h1 className="text-[#1A1A1A] text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                City Drives.<br />
                Zip Into <span className="text-[#0055FF]">Freedom.</span>
              </h1>
              <p className="text-[#666666] text-lg font-medium leading-relaxed mb-10 max-w-md">
                Budget-friendly cars for every ride. Book in minutes and hit the road!
              </p>

              {/* 4. FEATURE BADGES */}
              <div className="flex items-center gap-6 border-t border-gray-100 pt-8">
                {/* Feature 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center text-lg shadow-sm">
                    🏷️
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#1A1A1A] font-bold text-xs">Best Prices</span>
                    <span className="text-gray-400 text-[10px]">Low price promise</span>
                  </div>
                </div>

                <div className="h-8 w-px bg-gray-200"></div>

                {/* Feature 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg text-[#0055FF] shadow-sm">
                    🛡️
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#1A1A1A] font-bold text-xs">Trusted & Safe</span>
                    <span className="text-gray-400 text-[10px]">Well-maintained cars</span>
                  </div>
                </div>

                <div className="h-8 w-px bg-gray-200"></div>

                {/* Feature 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center text-lg shadow-sm">
                    ⏱️
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#1A1A1A] font-bold text-xs">Quick & Easy</span>
                    <span className="text-gray-400 text-[10px]">Book in 2 minutes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Single high-quality photo of hatchback cars on city street */}
            <div className="lg:col-span-7 relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-2xl bg-white">
              <img 
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80" 
                alt="CityZip Hatchback Car" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-[20px] left-[20px] bg-white/95 border border-gray-300 text-gray-800 text-[10px] font-black px-2 py-0.5 rounded shadow-sm z-20">
                PREMIUM CITY HATCHBACK
              </div>
            </div>
          </div>
        </div>

        {/* 5. FLOATING INSTANT BOOKING CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-30">
          <div className="bg-[#0055FF] rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-200">
            {/* Header with yellow lightning bolt */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg bg-[#FFCC00] rounded-full w-7 h-7 flex items-center justify-center text-xs">⚡</span>
              <span className="text-white font-extrabold text-sm uppercase tracking-wider">Instant Booking</span>
            </div>

            {/* Input Form Card */}
            <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl p-5 shadow-inner">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* 1. Pick-up Location */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">📍 Pick-up Location</label>
                  <select 
                    value={searchParams.fromCity}
                    onChange={(e) => setSearchParams({ ...searchParams, fromCity: e.target.value })}
                    className="w-full text-[#1A1A1A] font-bold text-sm bg-gray-50 border border-gray-100 rounded-lg h-11 px-3 focus:border-[#0055FF] focus:bg-white outline-none transition-all"
                    required
                  >
                    <option value="">Select location</option>
                    <option value="Pune, Maharashtra, India">Pune City</option>
                    <option value="Mumbai, Maharashtra, India">Mumbai City</option>
                    <option value="Mumbai Airport, Maharashtra, India">Mumbai Airport Drop</option>
                    <option value="Nashik, Maharashtra, India">Nashik City</option>
                  </select>
                </div>

                {/* 2. Pick-up Date */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">📅 Pick-up Date</label>
                  <input 
                    type="date"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full text-[#1A1A1A] font-bold text-sm bg-gray-50 border border-gray-100 rounded-lg h-11 px-3 focus:border-[#0055FF] focus:bg-white outline-none transition-all"
                    required
                  />
                </div>

                {/* 3. Pick-up Time */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">🕒 Pick-up Time</label>
                  <input 
                    type="text"
                    value={searchParams.pickupTime || '10:00 AM'}
                    onChange={(e) => setSearchParams({ ...searchParams, pickupTime: e.target.value })}
                    className="w-full text-[#1A1A1A] font-bold text-sm bg-gray-50 border border-gray-100 rounded-lg h-11 px-3 focus:border-[#0055FF] focus:bg-white outline-none transition-all"
                    required
                  />
                </div>

                {/* 4. Drop-off Date */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">📅 Drop-off Date</label>
                  <input 
                    type="date"
                    value={searchParams.returnDate || ''}
                    onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                    className="w-full text-[#1A1A1A] font-bold text-sm bg-gray-50 border border-gray-100 rounded-lg h-11 px-3 focus:border-[#0055FF] focus:bg-white outline-none transition-all"
                  />
                </div>

                {/* 5. Drop-off Time / CTA Button */}
                <div className="flex items-end h-full">
                  <button 
                    type="submit"
                    className="w-full h-11 bg-[#FFCC00] hover:bg-[#FFD200] text-[#1A1A1A] font-extrabold text-sm rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Find My Car
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* 6. TRUST FOOTER / TRUST BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-100 pb-10">
            {/* Props Row */}
            <div className="flex flex-wrap items-center gap-8">
              {/* Prop 1 */}
              <div className="flex items-center gap-2">
                <span className="text-[#0055FF] text-lg">✔</span>
                <div className="flex flex-col">
                  <span className="text-[#1A1A1A] font-bold text-xs">Free Cancellation</span>
                  <span className="text-gray-400 text-[10px]">Up to 24 hours</span>
                </div>
              </div>
              {/* Prop 2 */}
              <div className="flex items-center gap-2">
                <span className="text-[#0055FF] text-lg">💳</span>
                <div className="flex flex-col">
                  <span className="text-[#1A1A1A] font-bold text-xs">No Hidden Charges</span>
                  <span className="text-gray-400 text-[10px]">What you see is what you pay</span>
                </div>
              </div>
              {/* Prop 3 */}
              <div className="flex items-center gap-2">
                <span className="text-[#0055FF] text-lg">🎧</span>
                <div className="flex flex-col">
                  <span className="text-[#1A1A1A] font-bold text-xs">24/7 Support</span>
                  <span className="text-gray-400 text-[10px]">We're here to help</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-3">
              <span className="text-[#1A1A1A] font-extrabold text-sm">4.8/5</span>
              <div className="flex text-[#FFCC00]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-gray-400 text-[10px]">from 2,000+ happy customers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
