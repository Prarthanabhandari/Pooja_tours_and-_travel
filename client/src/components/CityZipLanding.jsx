import React, { useState } from 'react';

// ==========================================
// 1. NAVBAR SUBCOMPONENT
// ==========================================
function Navbar({ setCurrentPage, setShowAuthModal, setAuthMode, currentUser, handleLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-150 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Left Side: Logo */}
        <div 
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          {/* Logo Mark */}
          <div className="w-10 h-10 bg-[#1D4ED8] rounded-full flex items-center justify-center text-white shadow-md font-black text-lg tracking-tighter">
            CZ
          </div>
          {/* Wordmark & Tagline */}
          <div className="flex flex-col">
            <span className="text-[#0F172A] text-2xl font-black tracking-tight leading-none">CityZip</span>
            <span className="text-[#64748B] text-[8px] font-black tracking-[3px] uppercase mt-0.5">FOR A CAR</span>
          </div>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-[#1D4ED8] hover:text-blue-700 transition-colors"
          >
            Home
          </button>
          {['Our Cars', 'Pricing', 'Locations', 'How It Works', 'About Us', 'Contact'].map((link) => (
            <button
              key={link}
              onClick={() => {
                if (link === 'Contact') {
                  setCurrentPage('contact');
                } else if (link === 'Pricing') {
                  setCurrentPage('packages');
                } else {
                  setCurrentPage('home');
                  const targetId = link.toLowerCase().replace(/\s+/g, '-');
                  setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 100);
                }
              }}
              className="hover:text-[#1D4ED8] transition-colors"
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Right: Phone & Auth Button */}
        <div className="hidden md:flex items-center gap-6">
          <a href="tel:+15552487000" className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#1D4ED8] transition-colors">
            {/* Phone Icon */}
            <svg className="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.557-5.12-3.853-6.677-6.677l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +1 555 248 7000
          </a>

          {currentUser ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="bg-[#1D4ED8] hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md transition-colors"
              >
                👤 {currentUser.name.split(' ')[0]}
              </button>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 text-xs font-bold transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
              className="bg-[#1D4ED8] hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 hover:text-[#1D4ED8] focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-150 px-6 py-4 flex flex-col gap-4 shadow-inner">
          {['Home', 'Our Cars', 'Pricing', 'Locations', 'How It Works', 'About Us', 'Contact'].map((link) => (
            <button
              key={link}
              onClick={() => {
                setMobileMenuOpen(false);
                if (link === 'Contact') {
                  setCurrentPage('contact');
                } else if (link === 'Pricing') {
                  setCurrentPage('packages');
                } else {
                  setCurrentPage('home');
                  const targetId = link.toLowerCase().replace(/\s+/g, '-');
                  setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 100);
                }
              }}
              className="text-left font-semibold text-gray-700 hover:text-[#1D4ED8] transition-colors py-1"
            >
              {link}
            </button>
          ))}
          <div className="h-px bg-gray-100 my-2"></div>
          <a href="tel:+15552487000" className="flex items-center gap-2 text-sm font-bold text-gray-700">
            📞 +1 555 248 7000
          </a>
          {currentUser ? (
            <div className="flex items-center justify-between">
              <button 
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('dashboard'); }}
                className="bg-[#1D4ED8] text-white px-5 py-2 rounded-full font-bold text-sm"
              >
                👤 {currentUser.name}
              </button>
              <button onClick={() => { setMobileMenuOpen(false); handleLogout(); }} className="text-red-500 font-bold text-sm">
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => { setMobileMenuOpen(false); setAuthMode('login'); setShowAuthModal(true); }}
              className="bg-[#1D4ED8] text-white py-2.5 rounded-full font-bold text-sm shadow-md w-full"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
}

// ==========================================
// 2. HERO SUBCOMPONENT
// ==========================================
function Hero() {
  return (
    <section className="pt-8 pb-20 lg:pt-12 lg:pb-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Typography & Badges */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Large Bold Headline */}
          <h1 className="text-[#0F172A] text-5xl sm:text-6.5xl font-black tracking-tight leading-[1.05] mb-4">
            City Drives. <br />
            <span className="text-[#0F172A]">Zip Into </span>
            <span className="text-[#1D4ED8] font-black">Freedom.</span>
          </h1>

          {/* Subtext */}
          <p className="text-[#64748B] text-lg font-medium leading-relaxed max-w-xl mb-6">
            Budget-friendly cars for every ride. <br className="hidden sm:inline" />
            Book in minutes and hit the road!
          </p>

          {/* Features Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-2">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-[#FACC15] rounded-full flex items-center justify-center mb-3.5 shadow-sm">
                {/* Tag Icon */}
                <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.5 1.5 0 002.122 0l4.318-4.318a1.5 1.5 0 000-2.122L11.16 3.659A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
                </svg>
              </div>
              <h3 className="text-[#0F172A] font-bold text-base mb-1">Best Prices</h3>
              <p className="text-[#64748B] text-xs font-semibold">Low price promise</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3.5 shadow-sm">
                {/* Shield Icon */}
                <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-[#0F172A] font-bold text-base mb-1">Trusted & Safe</h3>
              <p className="text-[#64748B] text-xs font-semibold">Well-maintained cars</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-[#FACC15] rounded-full flex items-center justify-center mb-3.5 shadow-sm">
                {/* Clock Icon */}
                <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-[#0F172A] font-bold text-base mb-1">Quick & Easy</h3>
              <p className="text-[#64748B] text-xs font-semibold">Book in 2 minutes</p>
            </div>

          </div>
        </div>

        {/* Right Column: Composite hatchback cars with city skyline */}
        <div className="lg:col-span-5 relative h-[280px] sm:h-[350px] w-full rounded-3xl overflow-hidden shadow-2xl bg-white lg:ml-6">
          {/* Blurred City Skyline Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-[1px] brightness-[1.02]"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')` }}
          ></div>
          {/* Fading left overlay */}
          <div className="absolute inset-y-0 left-0 w-[25%] bg-gradient-to-r from-white via-white/30 to-transparent z-10 pointer-events-none"></div>

          {/* Asphalt Road Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-gray-700 to-gray-500/70 border-t border-gray-400/20"></div>

          {/* Blue Hatchback (Left, slightly back) */}
          <img 
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80" 
            alt="Blue Hatchback" 
            className="absolute left-[2%] bottom-[12px] w-[52%] h-auto object-contain z-10 transform scale-x-[-1]"
            style={{ mixBlendMode: 'multiply' }}
          />

          {/* White Hatchback (Right, front overlay) */}
          <img 
            src="https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&w=600&q=80" 
            alt="White Hatchback" 
            className="absolute right-[2%] bottom-[6px] w-[56%] h-auto object-contain z-20"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 3. INSTANT BOOKING BAR SUBCOMPONENT
// ==========================================
function InstantBookingBar({ searchParams, setSearchParams, handleSearchSubmit }) {
  return (
    <section className="relative z-30 max-w-7xl mx-auto px-6 -mt-16 sm:-mt-20 lg:-mt-24">
      <div className="bg-[#1D4ED8] rounded-2xl p-6 shadow-[0_15px_35px_rgba(29,78,216,0.25)]">
        
        {/* Header inside bar */}
        <div className="flex items-center gap-2 text-white font-extrabold text-sm mb-4">
          {/* Lightning Bolt Icon */}
          <svg className="w-4 h-4 text-yellow-300 fill-current" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Instant Booking
        </div>

        {/* White Inner Inputs Strip */}
        <form onSubmit={handleSearchSubmit} className="bg-white rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          
          {/* 1. Pick-up Location */}
          <div className="flex-1 flex flex-col gap-1 justify-center min-w-[140px]">
            <label className="text-[9px] font-black uppercase tracking-wider text-[#64748B] flex items-center gap-1">
              📍 Pick-up Location
            </label>
            <select
              value={searchParams.fromCity}
              onChange={(e) => setSearchParams({ ...searchParams, fromCity: e.target.value })}
              className="text-xs font-bold text-[#0F172A] bg-transparent outline-none h-8 w-full border-b border-gray-150 py-1"
              required
            >
              <option value="">Select location</option>
              <option value="Pune, Maharashtra, India">Pune City</option>
              <option value="Mumbai, Maharashtra, India">Mumbai City</option>
              <option value="Mumbai Airport, Maharashtra, India">Mumbai Airport</option>
              <option value="Nashik, Maharashtra, India">Nashik City</option>
            </select>
          </div>

          <div className="hidden lg:block w-px bg-gray-200 h-10 self-center"></div>

          {/* 2. Pick-up Date */}
          <div className="flex-1 flex flex-col gap-1 justify-center min-w-[120px]">
            <label className="text-[9px] font-black uppercase tracking-wider text-[#64748B] flex items-center gap-1">
              📅 Pick-up Date
            </label>
            <input 
              type="date"
              value={searchParams.date}
              onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="text-xs font-bold text-[#0F172A] bg-transparent outline-none h-8 w-full border-b border-gray-150 py-1"
              required
            />
          </div>

          <div className="hidden lg:block w-px bg-gray-200 h-10 self-center"></div>

          {/* 3. Pick-up Time */}
          <div className="flex-1 flex flex-col gap-1 justify-center min-w-[100px]">
            <label className="text-[9px] font-black uppercase tracking-wider text-[#64748B] flex items-center gap-1">
              🕒 Pick-up Time
            </label>
            <select
              value={searchParams.pickupTime || '10:00 AM'}
              onChange={(e) => setSearchParams({ ...searchParams, pickupTime: e.target.value })}
              className="text-xs font-bold text-[#0F172A] bg-transparent outline-none h-8 w-full border-b border-gray-150 py-1"
            >
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>02:00 PM</option>
              <option>04:00 PM</option>
            </select>
          </div>

          <div className="hidden lg:block w-px bg-gray-200 h-10 self-center"></div>

          {/* 4. Drop-off Date */}
          <div className="flex-1 flex flex-col gap-1 justify-center min-w-[120px]">
            <label className="text-[9px] font-black uppercase tracking-wider text-[#64748B] flex items-center gap-1">
              📅 Drop-off Date
            </label>
            <input 
              type="date"
              value={searchParams.returnDate || ''}
              onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
              className="text-xs font-bold text-[#0F172A] bg-transparent outline-none h-8 w-full border-b border-gray-150 py-1"
              required
            />
          </div>

          <div className="hidden lg:block w-px bg-gray-200 h-10 self-center"></div>

          {/* 5. Drop-off Time */}
          <div className="flex-1 flex flex-col gap-1 justify-center min-w-[100px]">
            <label className="text-[9px] font-black uppercase tracking-wider text-[#64748B] flex items-center gap-1">
              🕒 Drop-off Time
            </label>
            <select
              className="text-xs font-bold text-[#0F172A] bg-transparent outline-none h-8 w-full border-b border-gray-150 py-1"
            >
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>02:00 PM</option>
              <option>04:00 PM</option>
            </select>
          </div>

          {/* Search Button */}
          <button 
            type="submit"
            className="bg-[#FACC15] hover:bg-yellow-500 text-[#0F172A] font-extrabold text-sm rounded-lg px-8 py-3.5 transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            Find My Car
          </button>
        </form>

      </div>
    </section>
  );
}

// ==========================================
// 4. TRUST STRIP SUBCOMPONENT
// ==========================================
function TrustStrip() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Checkmark item */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[#0F172A] text-sm font-bold">Free Cancellation</h4>
              <p className="text-[#64748B] text-xs font-semibold">Up to 24 hours</p>
            </div>
          </div>

          {/* Shield/Lock item */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[#0F172A] text-sm font-bold">No Hidden Charges</h4>
              <p className="text-[#64748B] text-xs font-semibold">What you see is what you pay</p>
            </div>
          </div>

          {/* Headset support item */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[#0F172A] text-sm font-bold">24/7 Support</h4>
              <p className="text-[#64748B] text-xs font-semibold">We're here to help</p>
            </div>
          </div>

          {/* Stars ratings item */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[#0F172A] text-sm font-bold">4.8/5 ★★★★★</h4>
              <p className="text-[#64748B] text-xs font-semibold">from 2,000+ happy customers</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN COMPOSED COMPONENT
// ==========================================
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
    <div className="w-full min-h-screen bg-white flex flex-col font-sans selection:bg-[#1D4ED8] selection:text-white">
      
      {/* 1. Navbar Subcomponent */}
      <Navbar 
        setCurrentPage={setCurrentPage}
        setShowAuthModal={setShowAuthModal}
        setAuthMode={setAuthMode}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

      {/* 2. Hero Subcomponent */}
      <Hero />

      {/* 3. Instant Booking Bar Subcomponent */}
      <InstantBookingBar 
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleSearchSubmit={handleSearchSubmit}
      />

      {/* 4. Trust Strip Subcomponent */}
      <TrustStrip />

    </div>
  );
}
