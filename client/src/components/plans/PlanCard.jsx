import React from 'react';

// In the actual implementation, Link would be imported from react-router-dom
const Link = ({ to, className, children }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

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

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image container with overlay */}
      <div className="relative">
        <Link to={`/plans/${id}`} className="block relative h-64 overflow-hidden">
          <img 
            src={image || "/api/placeholder/600/400"} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        </Link>
        
        {/* Style tag */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 text-xs font-medium rounded-full">
            {style}
          </span>
        </div>
        
        {/* Favorite button */}
        <button 
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isFavorite 
              ? 'text-red-500 bg-white/90' 
              : 'text-gray-100 bg-black/20 hover:bg-white/90 hover:text-gray-800'
          } transition-colors`}
          onClick={() => onToggleFavorite && onToggleFavorite(id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon filled={isFavorite} />
        </button>
        
        {/* Price tag */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className="text-white">
            <span className="text-lg font-bold">${price.toLocaleString()}</span>
          </div>
          
          <Link 
            to={`/plans/${id}`} 
            className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors"
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