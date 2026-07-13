import React from 'react';

export default function AboutUs({ setCurrentPage }) {
  return (
    <div 
      className="min-h-screen w-full pb-16 relative overflow-hidden selection:bg-[#00b4d8] selection:text-white"
      style={{
        background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 30%, #fffbeb 65%, #f8fafc 100%)'
      }}
    >
      {/* Keyframe Animations for Rotating Mandala Rings */}
      <style>{`
        @keyframes custom-spin-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes custom-spin-counter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: custom-spin-clockwise 35s linear infinite !important;
        }
        .animate-spin-slow-reverse {
          animation: custom-spin-counter 25s linear infinite !important;
        }
      `}</style>
      {/* Background Watermark Pattern Layer (Repeating transparent travel collage image) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{ 
          backgroundImage: `url('/travel-watermark-clean.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}
      />

      {/* Decorative Floating Blur Orbs */}
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-cyan-200/25 blur-3xl z-0 pointer-events-none" />
      <div className="absolute top-[40%] right-[-15%] w-[450px] h-[450px] rounded-full bg-amber-200/20 blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-teal-200/20 blur-3xl z-0 pointer-events-none" />

      {/* 1. Header Breadcrumbs Bar with Premium Gradient and Cyan Accent */}
      <div className="relative z-10 bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center border-l-4 border-[#00b4d8] pl-4">
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0f172a] tracking-tight">
            About Us
          </h1>
          <div className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-1.5">
            <button 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="hover:text-[#00b4d8] transition-colors"
            >
              Home
            </button>
            <span className="text-slate-350">»</span>
            <span className="text-slate-700">About Us</span>
          </div>
        </div>
      </div>

      {/* Left-side Peeking Travel Elements Glimpse (Confined strictly to the first paragraph section height, slightly extended to fill the gap) */}
      <div 
        className="absolute left-0 top-[64px] w-[230px] sm:w-[360px] h-[420px] sm:h-[620px] z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url('/travel-peek-bg.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'left top'
        }}
      />

      {/* 2. Main Content Blocks (Elevated to z-10 over background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">

        {/* BLOCK 1: Pune Heritage & Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 pr-0 lg:pr-6">
            <div className="bg-white/65 backdrop-blur-md border border-white/60 rounded-2xl p-6 sm:p-8 shadow-sm">
              <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed text-justify">
                Welcome to <span className="font-extrabold text-[#00b4d8]">Pooja Tours & Travels</span>, your trusted partner for premium road journeys in Pune since <span className="font-extrabold text-slate-800">2015</span>. As owner-operators, we specialize in organizing seamless outstation trips, tourist packages, and group tours. Our private, well-maintained fleet features <span className="font-extrabold text-slate-800">two luxury 17-seater buses</span> alongside a versatile range of comfortable family cars. We do not offer self-drive; instead, every trip is led by our own courteous, highly professional chauffeurs. We take care of all the route planning, navigation, and vehicle health, allowing you to simply sit back, relax, and create wonderful memories with your loved ones.
              </p>
            </div>
          </div>

          {/* Right Image Circle Column with Animated Concentric Mandala Rings */}
          <div className="lg:col-span-5 flex justify-center relative py-6">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Solid offset gray circle behind */}
              <div className="absolute right-[-15px] top-[15px] w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-slate-300/40 border border-slate-200/50 z-0" />
              
              {/* Clockwise rotating outer cyan decorative ring */}
              <div className="absolute left-[-16px] top-[-16px] w-[288px] h-[288px] sm:w-[320px] sm:h-[320px] z-0 pointer-events-none animate-spin-slow">
                <svg className="w-full h-full text-[#00b4d8]/40" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 3" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 4" />
                </svg>
              </div>

              {/* Counter-clockwise rotating inner amber decorative ring */}
              <div className="absolute left-[-8px] top-[-8px] w-[272px] h-[272px] sm:w-[304px] sm:h-[304px] z-0 pointer-events-none animate-spin-slow-reverse">
                <svg className="w-full h-full text-amber-500/30" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="8 6" />
                </svg>
              </div>

              {/* Main circular collage image of Ujjain Mahakaleshwar Temple */}
              <img 
                src="/ujjain-collage-clean.png" 
                alt="Ujjain Mahakaleshwar Temple Collage" 
                className="absolute left-0 top-0 w-64 h-64 sm:w-72 sm:h-72 rounded-full object-cover z-10 border-4 border-white shadow-lg"
              />
            </div>
          </div>

        </div>

        {/* BLOCK 2: Airport Transit & Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          
          {/* Left Image Circle Column with Animated Concentric Mandala Rings */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 relative py-6">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Solid offset gray circle behind */}
              <div className="absolute left-[-15px] top-[15px] w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-slate-300/40 border border-slate-200/50 z-0" />
              
              {/* Clockwise rotating outer cyan decorative ring */}
              <div className="absolute left-[-16px] top-[-16px] w-[288px] h-[288px] sm:w-[320px] sm:h-[320px] z-0 pointer-events-none animate-spin-slow">
                <svg className="w-full h-full text-[#00b4d8]/40" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 3" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 4" />
                </svg>
              </div>

              {/* Counter-clockwise rotating inner amber decorative ring */}
              <div className="absolute left-[-8px] top-[-8px] w-[272px] h-[272px] sm:w-[304px] sm:h-[304px] z-0 pointer-events-none animate-spin-slow-reverse">
                <svg className="w-full h-full text-amber-500/30" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="8 6" />
                </svg>
              </div>

              {/* Main circular collage image representing Door-to-Door Travel Service */}
              <img 
                src="/door-to-door-collage-clean.png" 
                alt="Door-to-Door Travel Service Collage" 
                className="absolute left-0 top-0 w-64 h-64 sm:w-72 sm:h-72 rounded-full object-cover z-10 border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2 pl-0 lg:pl-6">
            <div className="bg-white/65 backdrop-blur-md border border-white/60 rounded-2xl p-6 sm:p-8 shadow-sm">
              <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed text-justify">
                We believe that a truly majestic journey begins and culminates right at your front door. That is why we curate a signature, high-end <span className="font-extrabold text-[#00b4d8]">door-to-door travel experience</span>: our professional chauffeur greets you at your doorstep, assists with your luggage, and conveys you in absolute serenity directly to your destination, dropping you safely inside your home gate upon return. Whether you are embarking on a sacred pilgrimage or requiring prestigious Mumbai Airport transits, we elevate your journey with immaculate vehicle comfort and bespoke passenger convenience. By pairing rigorous mechanical audits with expert chauffeurs who navigate the local terrain with effortless precision, we guarantee that every mile you traverse is stress-free, luxurious, and memorable.
              </p>
            </div>
          </div>

        </div>

        {/* BLOCK 3: Footer Paragraph Blocks */}
        <div className="relative space-y-6 pt-12 border-t border-slate-200/60 max-w-5xl">
          <div className="relative z-10 bg-white/50 backdrop-blur-sm border border-white/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed text-justify">
              To accommodate every group size and travel preference, we maintain a versatile fleet of meticulously serviced vehicles. Whether you require a fuel-efficient hatchback for solo transits, a premium 6-to-7-seater SUV (such as the Maruti Ertiga, Kia Carens, or Toyota Innova Crysta) for family getaways, or one of our own <span className="font-extrabold text-slate-800">two signature 17-seater luxury minibuses</span> designed for corporate excursions and large family tours, we guarantee a vehicle tailored to your needs. For absolute reliability, every journey is backed by our active 24/7 customer support hotline, ensuring immediate backup vehicle dispatch and real-time travel assistance whenever you need it.
            </p>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed text-justify">
              At <span className="font-extrabold text-slate-800">Pooja Tours & Travels</span>, our relationship with you is anchored in absolute transparency. We champion an honest, direct-to-owner pricing model: we provide flat, all-inclusive quotes that cover all tolls, state permits, and driver allowances, with absolutely zero hidden charges or third-party booking commissions. When you book with us, you deal directly with the fleet owners, ensuring the best rates and direct accountability. Let us manage the complexities of the road while you immerse yourself in the joy of the journey. Secure your next car or bus excursion with us today, and experience premium, worry-free door-to-door travel at its finest.
            </p>
          </div>

          {/* Right-side Peeking Bus & Hills Glimpse (Starts at top-0, background shifted down slightly by 24px to align with text side) */}
          <div 
            className="absolute right-[-16px] sm:right-[-32px] lg:right-[-140px] xl:right-[-220px] top-0 bottom-0 w-[240px] sm:w-[480px] z-0 pointer-events-none"
            style={{ 
              backgroundImage: `url('/bus-peek-bg.png')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'right 24px'
            }}
          />
        </div>

      </div>
    </div>
  );
}
