import React from 'react';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'No Hidden Charges',
      desc: 'Fixed outstation and airport drop rates with zero hidden charges. Pay exactly what is quoted, with no surprise costs.',
      icon: (
        <svg className="w-6 h-6 text-[#00b4d8] group-hover:text-white group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Official Lucide CirclePercent Icon */}
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6M9 9h.01M15 15h.01" />
        </svg>
      ),
      badge: 'Best Value'
    },
    {
      title: 'Customized Cab Packages',
      desc: 'Tailored travel packages for outstation tours, pilgrimage trips, corporate events, and family vacations.',
      icon: (
        <svg className="w-6 h-6 text-[#00b4d8] group-hover:text-white group-hover:-translate-y-1.5 group-hover:scale-110 transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Official Lucide Package Icon */}
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
          <path d="M12 22V12" />
        </svg>
      ),
      badge: 'Flexible'
    },
    {
      title: 'Fixed & Reliable Price',
      desc: 'Best-in-class pricing with guaranteed value for your money. Transparent rates that are easy on your pocket.',
      icon: (
        <svg className="w-6 h-6 text-[#00b4d8] group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Official Lucide Wallet Icon */}
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </svg>
      ),
      badge: 'Best Price'
    },
    {
      title: 'Experienced Drivers',
      desc: 'Courteous, highly experienced, and locally knowledgeable drivers ensuring smooth, safe, and stress-free navigation.',
      icon: (
        <svg className="w-6 h-6 text-[#00b4d8] group-hover:text-white group-hover:scale-115 group-hover:rotate-6 transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Official Lucide UserCheck Icon */}
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      ),
      badge: 'Expert Team'
    },
    {
      title: 'GPS Car Tracker',
      desc: 'Live vehicle tracking and real-time navigation updates for complete safety, coordination, and peace of mind.',
      icon: (
        <svg className="w-6 h-6 text-[#00b4d8] group-hover:text-white group-hover:-translate-y-1.5 group-hover:scale-110 transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Official Lucide MapPin Icon */}
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      badge: 'Safety First'
    },
    {
      title: '24 x 7 Support',
      desc: 'Dedicated round-the-clock support desk to assist you with bookings, modifications, and updates before, during, and after your trip.',
      icon: (
        <svg className="w-6 h-6 text-[#00b4d8] group-hover:text-white group-hover:rotate-[-15deg] group-hover:scale-110 transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Official Lucide Headphones Icon */}
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
      badge: 'Always Online'
    }
  ];

  return (
    <section id="why-us-section" className="py-24 bg-gradient-to-b from-[#f8fafc] to-[#ffffff] border-t border-b border-gray-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
            Why Choose Pooja Tours & Travels?
          </h2>
          <div className="w-16 h-1 bg-[#00b4d8] mx-auto rounded-full mb-5" />
          <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
            We are committed to delivering the safest, most reliable, and highly comfortable travel experience across Maharashtra. Here is what sets us apart.
          </p>
        </div>

        {/* Features Grid - Symmetric 6-card layout with premium Lucide SVGs & Hover transition effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white border border-slate-200/60 rounded-2xl p-9 shadow-[0_4px_20px_rgba(15,23,42,0.01)] hover:border-[#00b4d8]/40 hover:shadow-[0_20px_45px_rgba(0,180,216,0.06)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col items-start"
            >
              {/* Card Top Icon Box & Badge */}
              <div className="flex justify-between items-center w-full mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-[#00b4d8] group-hover:to-[#0083b0] group-hover:shadow-md group-hover:shadow-[#00b4d8]/20 transition-all duration-300">
                  {feat.icon}
                </div>
                <span className="text-[0.7rem] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                  {feat.badge}
                </span>
              </div>

              {/* Title & Description with Increased Font Sizes */}
              <h3 className="text-lg font-black text-slate-800 mb-3 group-hover:text-[#00b4d8] transition-colors duration-300">
                {feat.title}
              </h3>
              <p className="text-[0.8rem] text-slate-500 font-semibold leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
