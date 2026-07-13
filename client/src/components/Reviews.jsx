import React from 'react';

export default function Reviews() {
  const customerReviews = [
    {
      name: 'Rajesh M.',
      location: 'Kothrud, Pune',
      text: '"Booked an Innova Crysta for our family trip to Shirdi Sai Darshan. The car was spotless, driver was extremely polite and arrived 10 minutes early. Excellent experience!"',
      rating: 5,
      initials: 'RM',
      colorClass: 'bg-rose-500/10 text-rose-600'
    },
    {
      name: 'Sneha P.',
      location: 'Andheri, Mumbai',
      text: '"Rented a 17-seat Tempo Traveller for Lonavala corporate outing. The seats were very comfortable, AC worked perfectly, and the driver knew the route like back of his hand."',
      rating: 5,
      initials: 'SP',
      colorClass: 'bg-indigo-500/10 text-indigo-600'
    },
    {
      name: 'Aditya K.',
      location: 'Thane, West',
      text: '"Regularly book their Swift and Ertiga for Mumbai Airport drops. They have fixed pricing, no hidden tolls, and absolute punctuality. Best cab service in Pune-Mumbai route."',
      rating: 5,
      initials: 'AK',
      colorClass: 'bg-amber-500/10 text-amber-600'
    },
    {
      name: 'Priyanka G.',
      location: 'Pimple Saudagar, Pune',
      text: '"Organized a family yatra for Ashtavinayak Darshan. The 50-seater luxury bus was in top condition, pushing seats were comfortable for elders. Highly recommended!"',
      rating: 5,
      initials: 'PG',
      colorClass: 'bg-emerald-500/10 text-emerald-600'
    }
  ];

  return (
    <section id="reviews-section" className="pt-12 pb-24 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-[#00b4d8] mx-auto rounded-full mb-5" />
          <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
            Real feedback from our happy travelers.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerReviews.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_4px_25px_rgba(15,23,42,0.01)] hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-xs text-slate-600 leading-relaxed font-semibold italic mb-6">
                  {rev.text}
                </p>
              </div>
              
              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tracking-wide ${rev.colorClass}`}>
                  {rev.initials}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 leading-none mb-1">
                    {rev.name}
                  </h4>
                  <span className="text-[0.7rem] font-bold text-slate-400">
                    {rev.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
