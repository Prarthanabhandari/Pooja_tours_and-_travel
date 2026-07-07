import React from 'react';

export default function PawarStyleLanding({ 
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
    <div className="bg-[#f0fdfa] min-h-screen font-sans relative selection:bg-[#00A3C4] selection:text-white">
      
      {/* 1. TOP HEADER STRIP & NAVIGATION */}
      <header className="bg-white border-b border-gray-150 sticky top-0 z-50 shadow-sm">
        {/* Contact Info bar at the top */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-100 py-2 flex justify-end gap-6 text-xs text-gray-600 font-semibold">
          <div className="flex items-center gap-1.5">
            <span>📞</span>
            <span>+91 73871 29287</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>✉️</span>
            <span>booking@poojatravels.com</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          {/* Logo block */}
          <div 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-gray-900 text-2xl font-black tracking-tight">POOJA</span>
                <span className="bg-[#00A3C4] text-white px-2 py-0.5 rounded ml-1 text-lg font-black tracking-wide">TRAVELS</span>
              </div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5 text-right mr-1">Cab Service</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-[#00A3C4] font-bold text-sm hover:underline"
            >
              Home
            </button>
            {['About Us', 'Packages', 'Gallery', 'Testimonials', 'Blog'].map((link) => (
              <button
                key={link}
                onClick={() => {
                  if (link === 'Gallery') {
                    setCurrentPage('gallery');
                  } else {
                    setCurrentPage('home');
                    const targetId = link.toLowerCase().replace(/\s+/g, '-');
                    setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }}
                className="text-gray-600 hover:text-[#00A3C4] font-bold text-sm transition-colors"
              >
                {link}
              </button>
            ))}
            {currentUser ? (
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="text-gray-600 hover:text-[#00A3C4] font-bold text-sm"
              >
                Profile
              </button>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                className="text-gray-600 hover:text-[#00A3C4] font-bold text-sm"
              >
                Login
              </button>
            )}
            
            {/* Contact Us orange-red button */}
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-[#D9383A] text-white font-bold text-sm px-4 py-2 rounded hover:bg-[#C22F31] transition-all"
            >
              Contact Us
            </button>
          </nav>
        </div>
      </header>

      {/* 2. HERO / SLIDER SECTION */}
      <section 
        className="relative pt-12 pb-24 border-b border-gray-150 overflow-visible bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(to right, rgba(240, 253, 250, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%), url('/bus_tree.jpg')" }}
      >
        {/* Dynamic Chevron/Wave background cutting from left */}
        <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#00A3C4]/15 via-[#00A3C4]/5 to-transparent skew-x-[-15deg] origin-top-left pointer-events-none z-0"></div>
        
        {/* Faint low-opacity city map watermark on the right side behind van */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] opacity-15 pointer-events-none z-0 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 400 300" className="stroke-gray-400 stroke-[1.5] fill-none">
            <path d="M 50,150 Q 150,50 250,200 T 350,100" />
            <path d="M 80,80 Q 200,220 300,50" />
            <path d="M 10,250 C 100,180 200,280 380,180" />
          </svg>
          <div className="absolute top-[20%] right-[35%] text-green-600 font-bold text-lg">📍</div>
          <div className="absolute bottom-[28%] right-[12%] text-green-600 font-bold text-lg">📍</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="z-10">
              <h2 className="text-[#1e293b] text-3.5xl sm:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
                No.1 Pune To Mumbai Airport Cab | Bus
              </h2>
              <button 
                onClick={() => {
                  setSearchParams({
                    ...searchParams,
                    bookingType: 'cab'
                  });
                  document.getElementById('booking-console')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#D9383A] text-white font-extrabold text-sm px-6 py-2.5 rounded shadow-md hover:bg-[#C22F31] transition-all"
              >
                Book Now
              </button>
            </div>

            {/* Right Car Image Column - Restricting height strictly to prevent vertical stretching */}
            <div className="relative w-full h-[400px] max-h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-150 z-10 bg-white flex justify-center items-center">
              {/* Soft circle/chevron overlay behind the image container (sibling block) */}
              <div className="absolute inset-0 bg-cyan-50/20 z-0"></div>
              
              {/* Image cleanly covering the strict height boundaries */}
              <img 
                src="/17-seat-tempo-traveller.png" 
                alt="Pooja Travels 17-Seater Luxury Force Tempo Traveller" 
                className="w-full h-full object-cover z-10"
              />
              
              {/* Simulated badge or label matching reference screenshot */}
              <div className="absolute bottom-[20px] left-[20px] bg-white/95 border border-gray-300 text-gray-800 text-[10px] font-black px-2 py-0.5 rounded shadow-sm z-20">
                17-SEATER TEMPO TRAVELLER
              </div>

              {/* Slider Arrows floating neatly inside transparent vehicle container */}
              <div className="absolute bottom-[16px] right-[16px] flex gap-2 z-20">
                <button className="w-8 h-8 rounded-full bg-[#00A3C4] text-white flex items-center justify-center font-bold text-xs shadow hover:bg-[#0089a4] transition-all">◀</button>
                <button className="w-8 h-8 rounded-full bg-[#00A3C4] text-white flex items-center justify-center font-bold text-xs shadow hover:bg-[#0089a4] transition-all">▶</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TRUE "ANTIGRAVITY" FLOATING BOOKING SEARCH CONSOLE */}
      <div id="booking-console" className="relative -mt-14 max-w-5xl mx-auto px-4 z-30 mb-16">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-gray-100 p-5">
          {/* Booking Mode Tabs */}
          <div className="flex gap-2 mb-4">
            {[
              { id: 'oneway', label: 'ONE WAY' },
              { id: 'roundtrip', label: 'ROUND TRIP' },
              { id: 'multicity', label: 'MULTICITY' },
              { id: 'local', label: 'LOCAL' }
            ].map(tab => {
              const isActive = searchParams.tripType === tab.id || (tab.id === 'oneway' && searchParams.tripType !== 'roundtrip');
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSearchParams({ ...searchParams, tripType: tab.id === 'oneway' ? 'oneway' : 'roundtrip' })}
                  className={`px-5 py-2 rounded text-xs font-extrabold transition-all border ${
                    isActive ? 'bg-[#00A3C4] border-[#00A3C4] text-white shadow-sm' : 'bg-[#006070] border-[#006070] text-white hover:bg-[#004f5d]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Inputs Row */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
            {/* From City */}
            <div>
              <select
                value={searchParams.fromCity}
                onChange={(e) => setSearchParams({ ...searchParams, fromCity: e.target.value })}
                className="w-full text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded h-10 px-3 outline-none focus:border-[#00A3C4] focus:ring-1 focus:ring-[#00A3C4] transition-all"
                required
              >
                <option value="">Select From City</option>
                <option value="Pune, Maharashtra, India">Pune City</option>
                <option value="Mumbai, Maharashtra, India">Mumbai City</option>
                <option value="Nashik, Maharashtra, India">Nashik City</option>
              </select>
            </div>

            {/* To City */}
            <div>
              <select
                value={searchParams.toCity}
                onChange={(e) => setSearchParams({ ...searchParams, toCity: e.target.value })}
                className="w-full text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded h-10 px-3 outline-none focus:border-[#00A3C4] focus:ring-1 focus:ring-[#00A3C4] transition-all"
                required
              >
                <option value="">Select To City</option>
                <option value="Mahabaleshwar, Maharashtra, India">Mahabaleshwar</option>
                <option value="Mumbai, Maharashtra, India">Mumbai City</option>
                <option value="Shirdi, Maharashtra, India">Shirdi Temple</option>
                <option value="Pune, Maharashtra, India">Pune City</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <input 
                type="date"
                value={searchParams.date}
                onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded h-10 px-3 outline-none focus:border-[#00A3C4] focus:ring-1 focus:ring-[#00A3C4] transition-all"
                required
              />
            </div>

            {/* Time */}
            <div>
              <input 
                type="text"
                placeholder="Pick Up At (e.g. 10:00 AM)"
                value={searchParams.pickupTime || ''}
                onChange={(e) => setSearchParams({ ...searchParams, pickupTime: e.target.value })}
                className="w-full text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded h-10 px-3 outline-none focus:border-[#00A3C4] focus:ring-1 focus:ring-[#00A3C4] transition-all"
                required
              />
            </div>

            {/* Submit CTA */}
            <div>
              <button
                type="submit"
                className="w-full h-10 bg-[#006070] hover:bg-[#004f5d] text-white text-xs font-bold rounded shadow-md transition-all uppercase"
              >
                Explore Cabs
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 4. BOTTOM FLOATING ACTION BUTTONS */}
      {/* Call Button (Left) */}
      <a 
        href="tel:+917387129287"
        className="fixed bottom-6 left-6 w-14 h-14 bg-[#D9383A] text-white rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 active:scale-95 transition-all z-50"
      >
        📞
      </a>

      {/* WhatsApp Button (Right) */}
      <a 
        href="https://wa.me/919623324139"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#22C55E] text-white rounded-full flex items-center justify-center text-3xl shadow-xl hover:scale-110 active:scale-95 transition-all z-50"
      >
        💬
      </a>
      
    </div>
  );
}
