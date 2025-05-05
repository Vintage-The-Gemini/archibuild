// client/src/components/plans/PlanCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils';

// Simple icons for the features
const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const BathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AreaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor" 
    strokeWidth={filled ? "0" : "1.5"} 
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const PlanCard = ({ plan, isFavorite = false, onToggleFavorite }) => {
  const {
    id,
    name,
    style,
    price,
    image,
    squareFootage,
    bedrooms,
    bathrooms
  } = plan;
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image container with overlay */}
      <div className="relative">
        <Link to={`/plans/${id}`} className="block relative h-64 overflow-hidden">
          {/* Image loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Main image or fallback */}
          <img 
            src={imageError ? "/assets/images/placeholder-house.jpg" : (image || "/assets/images/placeholder-house.jpg")} 
            alt={name}
            className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 hover:scale-105' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </Link>
        
        {/* Style tag */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 text-xs font-medium rounded-full shadow-sm">
            {style}
          </span>
        </div>
        
        {/* Favorite button */}
        <button 
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isFavorite 
              ? 'text-red-500 bg-white/90 shadow-md' 
              : 'text-gray-100 bg-black/20 hover:bg-white/90 hover:text-gray-800'
          } transition-all duration-300 transform hover:scale-110`}
          onClick={() => onToggleFavorite && onToggleFavorite(id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon filled={isFavorite} />
        </button>
        
        {/* Price tag */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className="text-white">
            <span className="text-lg font-bold">{formatCurrency(price)}</span>
          </div>
          
          <Link 
            to={`/plans/${id}`} 
            className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            View Plan
          </Link>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <Link to={`/plans/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors mb-1">
            {name}
          </h3>
        </Link>
        
        {/* Features */}
        <div className="flex items-center justify-between text-gray-600 text-sm mt-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <BedIcon />
              <span>{bedrooms} Bed{bedrooms !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <BathIcon />
              <span>{bathrooms} Bath{bathrooms !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <AreaIcon />
              <span>{squareFootage.toLocaleString()} sq ft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;