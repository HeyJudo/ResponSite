import React from 'react';
import '../animations/WindowPop.css';
import './LoadingScreen.css';

const LoadingScreen = () => (
  <div className="loading-screen pop show">
    <div className="ambulance-animation">
      <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <rect x="20" y="30" width="60" height="20" rx="4" fill="#fff" stroke="#232FA5" strokeWidth="2"/>
          <rect x="80" y="38" width="20" height="12" rx="2" fill="#fff" stroke="#232FA5" strokeWidth="2"/>
          <rect x="25" y="35" width="18" height="10" rx="2" fill="#e62020"/>
          <rect x="50" y="35" width="15" height="10" rx="2" fill="#E8EDF5"/>
          <rect x="70" y="35" width="7" height="10" rx="2" fill="#E8EDF5"/>
          <circle cx="35" cy="54" r="6" fill="#232FA5" stroke="#232FA5" strokeWidth="2"/>
          <circle cx="90" cy="54" r="6" fill="#232FA5" stroke="#232FA5" strokeWidth="2"/>
          <rect x="38" y="32" width="6" height="6" fill="#fff" stroke="#232FA5" strokeWidth="1"/>
          <rect x="60" y="32" width="6" height="6" fill="#fff" stroke="#232FA5" strokeWidth="1"/>
          <rect x="55" y="25" width="10" height="6" rx="2" fill="#232FA5"/>
          <rect x="58" y="20" width="4" height="6" rx="2" fill="#e62020"/>
        </g>
        <g>
          <rect x="30" y="40" width="8" height="2" fill="#fff" stroke="#232FA5" strokeWidth="1"/>
          <rect x="80" y="44" width="8" height="2" fill="#fff" stroke="#232FA5" strokeWidth="1"/>
        </g>
      </svg>
    </div>
    <div className="loading-text">Loading...</div>
  </div>
);

export default LoadingScreen;
