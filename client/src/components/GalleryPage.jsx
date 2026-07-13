import React, { useState } from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { galleryImages } from '../data/galleryImages';

export default function GalleryPage({ setCurrentPage }) {
  const [images, setImages] = useState(galleryImages);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [likedItems, setLikedItems] = useState({});

  // Toggle favorite / like state
  const toggleLike = (id) => {
    setLikedItems(prev => {
      const isLiked = !!prev[id];
      const updated = { ...prev, [id]: !isLiked };
      
      // Update local count
      setImages(curr => curr.map(item => {
        if (item.id === id) {
          return { ...item, likes: isLiked ? item.likes - 1 : item.likes + 1 };
        }
        return item;
      }));
      
      return updated;
    });
  };

  // Filter items
  const filteredImages = images.filter(img => {
    if (selectedFilter === 'all') return true;
    return img.category === selectedFilter;
  });

  return (
    <div className="relative bg-slate-50/30 overflow-hidden w-full flex-1 flex flex-col" style={{ minHeight: '80vh' }}>
      
      {/* Background Watermark Pattern Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{ 
          backgroundImage: `url('/travel-watermark-clean.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}
      />
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-200/20 blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-yellow-100/20 blur-3xl z-0 pointer-events-none" />

      {/* Breadcrumbs Header */}
      <HeaderBreadcrumbs title="Gallery" setCurrentPage={setCurrentPage} />

      {/* Main Grid Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        {/* Category Tabs */}
        <div className="flex justify-center items-center gap-2 mb-8">
          {[
            { slug: 'all', label: 'All Photos' },
            { slug: 'fleet', label: 'Our Fleet' },
            { slug: 'tours', label: 'Outstation Tours' }
          ].map(tab => (
            <button
              key={tab.slug}
              onClick={() => setSelectedFilter(tab.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedFilter === tab.slug
                  ? 'bg-[#00b4d8] text-white shadow-sm shadow-[#00b4d8]/40'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map(item => (
            <div 
              key={item.id}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              
              {/* Card Header (Round avatar and name) */}
              <div className="flex items-center gap-2.5 p-3 border-b border-slate-100 bg-slate-50/30">
                <div className="w-8 h-8 rounded-full bg-[#00b4d8]/10 flex items-center justify-center border border-[#00b4d8]/15 overflow-hidden">
                  <span className="text-[0.65rem] font-black text-[#00b4d8] tracking-tight">PT</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-800 leading-tight">Pooja Travels</span>
                  <span className="text-[0.55rem] font-bold text-slate-400">Outstation Tour Cab</span>
                </div>
              </div>

              {/* Card Image Wrapper with Favorite Icon overlay */}
              <div className="relative overflow-hidden aspect-square bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('bg-gradient-to-br', 'from-cyan-50', 'to-sky-100', 'flex', 'items-center', 'justify-center');
                  }}
                />
                
                {/* Heart Like Floating Button */}
                <button
                  type="button"
                  onClick={() => toggleLike(item.id)}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                  style={{ cursor: 'pointer' }}
                >
                  <svg 
                    className={`w-4 h-4 transition-colors ${
                      likedItems[item.id] 
                        ? 'text-red-500 fill-current' 
                        : 'text-slate-400 fill-none hover:text-red-400'
                    }`} 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>

              {/* Card Footer Details */}
              <div className="p-3 bg-white flex items-center justify-between">
                <span className="text-[0.68rem] font-bold text-slate-500 truncate max-w-[80%]">
                  {item.title}
                </span>
                <span className="text-[0.62rem] font-black text-slate-400 flex items-center gap-0.5">
                  ❤️ {item.likes}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
