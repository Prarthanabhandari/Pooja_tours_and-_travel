import React from 'react';

export default function Logo({ className = "w-12 h-12" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Sky Background Gradient: Sunset colors (Orange/Yellow) */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" /> {/* Orange */}
          <stop offset="60%" stopColor="#ffb703" /> {/* Gold */}
          <stop offset="100%" stopColor="#ffedd5" /> {/* Light cream */}
        </linearGradient>
        
        {/* Sun Gradient */}
        <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>

        {/* Inner Circle Clip Path */}
        <clipPath id="innerCircleClip">
          <circle cx="50" cy="45" r="23.5" />
        </clipPath>

        {/* Text Path for "SINCE ★ P T T ★ 2 0 1 8" */}
        <path id="topArcPath" d="M 18 45 A 32 32 0 0 1 82 45" fill="none" />
      </defs>

      {/* 1. Outer Circle Frame */}
      <circle cx="50" cy="45" r="23.5" stroke="#0f172a" strokeWidth="1.5" fill="none" />

      {/* 2. Top Arch Text: SINCE ★ P T T ★ 2 0 1 8 */}
      <text fill="#0f172a" fontSize="5.2" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif">
        <textPath href="#topArcPath" startOffset="50%" textAnchor="middle">
          <tspan fill="#0f172a" letterSpacing="0.4">SINCE </tspan>
          <tspan fill="#eab308">★ </tspan>
          <tspan fill="#3b82f6" letterSpacing="0.8">P T T </tspan>
          <tspan fill="#eab308">★ </tspan>
          <tspan fill="#0f172a" letterSpacing="0.4">2 0 1 8</tspan>
        </textPath>
      </text>

      {/* Outer Side Stars */}
      {/* Left Star */}
      <path d="M 15 45 L 16.2 43.5 L 18.2 43.5 L 16.7 44.5 L 17.2 46.5 L 15 45 Z" fill="#eab308" stroke="#0f172a" strokeWidth="0.3" />
      {/* Right Star */}
      <path d="M 85 45 L 83.8 43.5 L 81.8 43.5 L 83.3 44.5 L 82.8 46.5 L 85 45 Z" fill="#eab308" stroke="#0f172a" strokeWidth="0.3" />

      {/* 3. Inner Circle Artwork */}
      <g clipPath="url(#innerCircleClip)">
        {/* Sky */}
        <circle cx="50" cy="45" r="23.5" fill="url(#skyGrad)" />

        {/* Sunrise Sun in center */}
        <circle cx="50" cy="51" r="10" fill="url(#sunGrad)" />

        {/* Sea Waves (Blue/Cyan stripes) */}
        <path d="M 25 58 Q 37.5 56, 50 59 Q 62.5 56, 75 58 L 75 69 L 25 69 Z" fill="#00b4d8" />
        <path d="M 25 62 Q 37.5 60, 50 63 Q 62.5 60, 75 62 L 75 69 L 25 69 Z" fill="#0077b6" />

        {/* Palm Tree Left (Silhouetted) */}
        <path d="M 37 68 Q 32 54, 39 46" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M 39 46 Q 32 44, 29 48 
                 M 39 46 Q 34 38, 31 41 
                 M 39 46 Q 42 37, 45 40 
                 M 39 46 Q 44 44, 45 49" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Palm Tree Right (Larger, silhouetted) */}
        <path d="M 50 68 Q 58 52, 53 36" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M 53 36 Q 45 34, 41 38 
                 M 53 36 Q 48 27, 45 30 
                 M 53 36 Q 58 27, 61 31 
                 M 53 36 Q 60 35, 61 41 
                 M 53 36 Q 55 42, 53 47" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Tourist Luxury Bus Silhouette at the bottom */}
        <g id="bus">
          {/* Bus body */}
          <path d="M 34 65 L 34 59 C 34 58, 36 57, 39 57 L 61 55 C 63 55, 65 56, 65 57 L 65 65 Z" fill="#0f172a" />
          {/* Windshield */}
          <path d="M 52 56 L 64 56 L 64 61 L 52 61 Z" fill="#38bdf8" />
          {/* Side windows */}
          <path d="M 36 58 L 50 57 L 50 61 L 36 62 Z" fill="#38bdf8" />
          {/* Bumper highlights */}
          <rect x="52" y="62" width="11" height="1.5" rx="0.5" fill="#e2e8f0" />
          {/* Wheels */}
          <circle cx="40" cy="65" r="2.8" fill="#0f172a" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="58" cy="65" r="2.8" fill="#0f172a" stroke="#ffffff" strokeWidth="0.8" />
        </g>
      </g>

      {/* Inner Circle outline */}
      <circle cx="50" cy="45" r="23.5" stroke="#0f172a" strokeWidth="1.5" fill="none" />

      {/* 4. Bottom Brand Text (POOJA TOURS & TRAVELS in red with dark drop shadow style) */}
      <text 
        x="50" 
        y="78" 
        textAnchor="middle" 
        fill="#991b1b" 
        fontSize="7.8" 
        fontWeight="900" 
        letterSpacing="0.4"
        fontFamily="Georgia, serif"
      >
        POOJA TOURS
      </text>
      <text 
        x="50" 
        y="87" 
        textAnchor="middle" 
        fill="#991b1b" 
        fontSize="7.8" 
        fontWeight="900" 
        letterSpacing="0.4"
        fontFamily="Georgia, serif"
      >
        & TRAVELS
      </text>
    </svg>
  );
}
