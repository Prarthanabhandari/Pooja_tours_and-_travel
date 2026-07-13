import React from 'react';

export default function HowItWorks() {
  const steps = [
    { 
      step: '01', 
      title: 'Select Destination', 
      desc: 'Choose your pickup city, travel dates, and select whether you want a private cab or bus seats.',
      image: '/how-it-works-1.png'
    },
    { 
      step: '02', 
      title: 'Choose Vehicle', 
      desc: 'Select the perfect vehicle from our clean, sanitized fleet (WagonR, Brezza, Innovas, Carens, or Buses).',
      image: '/how-it-works-2.png'
    },
    { 
      step: '03', 
      title: 'Enter Trip Details', 
      desc: 'Provide pickup times, contact details, and any specific route stops or instructions for the driver.',
      image: '/how-it-works-3.png'
    },
    { 
      step: '04', 
      title: 'Confirm via WhatsApp', 
      desc: 'Receive immediate confirmation of pricing, vehicle allocation, and driver coordinates right on your chat.',
      image: '/how-it-works-4.png'
    }
  ];

  return (
    <section id="how-it-works-section" className="pt-8 pb-0 bg-gradient-to-b from-[#f8fafc] to-[#ffffff] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
            How it Works
          </h2>
          <div className="w-16 h-1 bg-[#00b4d8] mx-auto rounded-full mb-5" />
          <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
            Book your clean, comfortable outstation cab or bus in 4 quick and easy steps.
          </p>
        </div>

        {/* Steps Grid - Simple Cards without background waves */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((node, idx) => (
            <div 
              key={idx} 
              className="group bg-white border border-slate-200/60 rounded-2xl p-8 shadow-[0_4px_25px_rgba(15,23,42,0.01)] hover:shadow-xl hover:border-[#00b4d8]/30 transition-all duration-300 flex flex-col items-center text-center"
            >
              
              {/* Step number badge */}
              <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-6">
                Step {node.step}
              </span>

              {/* Circle Icon Container */}
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-[#00b4d8]/5 group-hover:border-[#00b4d8]/20 transition-all duration-300 overflow-hidden p-2">
                <img 
                  src={node.image} 
                  alt={node.title} 
                  className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-110" 
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-black text-slate-800 mb-3 group-hover:text-[#00b4d8] transition-colors duration-300">
                {node.title}
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                {node.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
