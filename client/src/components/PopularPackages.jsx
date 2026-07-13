import React, { useState, useEffect } from 'react';

export default function PopularPackages({ 
  searchParams, 
  setSearchParams,
  setCurrentPage
}) {
  const packages = [
    {
      title: 'Pune ⇄ Kokan Coast',
      desc: 'Discover beautiful coconut groves, pristine beaches, and delicious coastal cuisine in Konkan.',
      image: '/kokan.jpg',
      to: 'Konkan, Maharashtra, India',
      includes: 'Coastal Sightseeing, Tolls, Driver Allowance',
      days: '3-4 Days Tour',
      badge: 'Coastal Special',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about a package for Pune to Konkan Coastal Tour.'
    },
    {
      title: 'Pune ⇄ Diveagar Beach',
      desc: 'Enjoy the pristine sand beaches, coastal temples, and serene waters of Diveagar.',
      image: '/Diveghar.jpg',
      to: 'Diveagar, Maharashtra, India',
      includes: 'Local Sightseeing, Tolls, Driver Allowance',
      days: '2 Days / 1 Night',
      badge: 'Coastal Getaway',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about a package for Pune to Diveagar Beach.'
    },
    {
      title: 'Pune ⇄ Harihareshwar',
      desc: 'Visit the holy Shiva temple and pristine rocky beaches of Dakshin Kashi.',
      image: '/harihareshwar.jpg',
      to: 'Harihareshwar, Maharashtra, India',
      includes: 'Sightseeing Tour, Tolls, Driver Allowance',
      days: '2 Days Trip',
      badge: 'Pilgrimage & Beach',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about a package for Pune to Harihareshwar.'
    },
    {
      title: 'Pune ⇄ Ujjain Mahakal',
      desc: 'Spiritual trip to Ujjain Mahakaleshwar Jyotirlinga temple and holy sites in Madhya Pradesh.',
      image: '/ujjen.jpg',
      to: 'Ujjain, Madhya Pradesh, India',
      includes: 'Interstate Permit, Expressway Tolls, Driver Support',
      days: '3-4 Days Tour',
      badge: 'Mahakal Darshan',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about a package for Pune to Ujjain.'
    },
    {
      title: 'Pune ⇄ Trimbakeshwar',
      desc: 'Spiritual Jyotirlinga Darshan tour near Nashik, includes route support.',
      image: '/trambkeshwer.jpg',
      to: 'Trimbakeshwar, Maharashtra, India',
      includes: 'Jyotirlinga Darshan, Tolls, Driver Allowance',
      days: '1-2 Days Tour',
      badge: 'Jyotirlinga',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about a package for Pune to Trimbakeshwar.'
    },
    {
      title: 'Pune ⇄ Nashik Tour',
      desc: 'Visit historical temples, Trimbakeshwar, Panchavati, and local vineyards in Nashik.',
      image: '/nashik.jpg',
      to: 'Nashik, Maharashtra, India',
      includes: 'Sightseeing Tour, Tolls, Driver Allowance',
      days: '2 Days Trip',
      badge: 'Temple & Winery',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about a package for Pune to Nashik.'
    },
    {
      title: 'Pune ⇄ Hampi Ruins',
      desc: 'Explore the UNESCO World Heritage site of Hampi historical monuments and stone temples.',
      image: '/hamppi.jpg',
      to: 'Hampi, Karnataka, India',
      includes: 'Heritage Tour, Interstate Permit, Tolls, Driver',
      days: '3-4 Days Tour',
      badge: 'Heritage Tour',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about a package for Pune to Hampi.'
    },
    {
      title: 'Pune ⇄ Khatu Shyam Darshan',
      desc: 'Spiritual pilgrimage tour to the famous Khatu Shyam Ji temple in Rajasthan.',
      image: '/khatusham.jpg',
      to: 'Khatu, Rajasthan, India',
      includes: 'Long Distance Route, Permit, Tolls, Driver',
      days: '5-6 Days Tour',
      badge: 'Devotional',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about a package for Pune to Khatu Shyam Darshan.'
    },
    {
      title: 'Pune ⇄ Mumbai Tour',
      desc: 'Assured outstation drops, business transfers, or sightseeing trips to Mumbai.',
      image: '/mumbai.jpg',
      to: 'Mumbai, Maharashtra, India',
      includes: 'Expressway Tolls, Punctual Driver Drop',
      days: 'One-Way / Round-Trip',
      badge: 'Business & Travel',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about a package for Pune to Mumbai.'
    }
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive logic for cards visible
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, packages.length - cardsToShow);

  // Autoplay Logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [maxIndex, isHovered]);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section id="packages-section" className="pt-24 pb-0 bg-gradient-to-b from-[#ffffff] to-[#f8fafc] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="text-left max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-4">
              Popular Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              Our Bestselling Tour Packages
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-semibold mt-3 leading-relaxed">
              Handpicked itineraries designed for clean, comfortable, and memorable road journeys with Pooja Tours & Travels.
            </p>
          </div>
          
          {/* Arrow Controls */}
          <div className="flex gap-2 mt-6 md:mt-0">
            <button 
              type="button"
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
                startIndex === 0 
                  ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-200 text-[#0f172a] hover:border-[#00b4d8] hover:text-[#00b4d8] hover:scale-105 active:scale-95 shadow-sm'
              }`}
              title="Previous Package"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              type="button"
              onClick={handleNext}
              disabled={startIndex >= maxIndex}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
                startIndex >= maxIndex 
                  ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-200 text-[#0f172a] hover:border-[#00b4d8] hover:text-[#00b4d8] hover:scale-105 active:scale-95 shadow-sm'
              }`}
              title="Next Package"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Slider Track */}
        <div 
          className="overflow-hidden w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${startIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className="w-full shrink-0 px-3"
                style={{ width: `${100 / cardsToShow}%` }}
              >
                <a 
                  href={`https://wa.me/919623324139?text=${encodeURIComponent(pkg.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-[#0f172a] rounded-2xl overflow-hidden h-[440px] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  
                  {/* Top Image area (Bright, Fresh, Clearly Visible) */}
                  <div className="relative h-[220px] w-full overflow-hidden bg-slate-800">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500 ease-out" 
                    />
                    {/* Glowing badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[0.65rem] font-black uppercase tracking-wider bg-[#00b4d8] text-white px-3 py-1.5 rounded-full shadow-md">
                        {pkg.badge}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content Area (Dark theme styling container) */}
                  <div className="p-6 flex flex-col justify-between flex-1 bg-[#0f172a]">
                    <div>
                      <span className="text-[0.7rem] font-bold text-[#ea580c] uppercase tracking-wider mb-1.5 block">
                        {pkg.days}
                      </span>
                      <h3 className="text-base font-extrabold text-white mb-2 leading-tight group-hover:text-[#00b4d8] transition-colors duration-300">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-gray-300 mb-4 line-clamp-2 leading-relaxed font-medium">
                        {pkg.desc}
                      </p>
                    </div>

                    {/* Included features */}
                    <div className="text-[0.65rem] text-[#00b4d8] font-bold mb-4 leading-normal bg-white/5 border border-white/10 px-2.5 py-2 rounded-xl flex items-center gap-1.5 backdrop-blur-sm">
                      <svg className="w-3.5 h-3.5 text-[#00b4d8] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="truncate">{pkg.includes}</span>
                    </div>

                    {/* Booking action (Price-free & Car-free) */}
                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <span className="text-xs font-bold text-gray-400">Inquire Now</span>
                      <div className="bg-[#00b4d8] group-hover:bg-[#ea580c] text-white p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Read More Section with Car Icon */}
        <div className="flex justify-center mt-8">
          <button 
            type="button"
            onClick={() => { setCurrentPage && setCurrentPage('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2.5 px-6 py-2 text-slate-500 font-extrabold hover:text-[#00b4d8] transition-colors duration-300 text-sm"
          >
            <svg className="w-5 h-5 text-[#00b4d8]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.17-2.707a1.95 1.95 0 0 0-1.903-1.829h-9.716a2.125 2.125 0 0 0-2.115 1.905L2.125 18v-4.5m17.25 0V9a3 3 0 0 0-3-3H7.5A3 3 0 0 0 4.5 9v4.5m15 0h-15" />
            </svg>
            <span>Read more</span>
          </button>
        </div>

      </div>
    </section>
  );
}
