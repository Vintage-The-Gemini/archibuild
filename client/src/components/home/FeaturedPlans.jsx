// client/src/components/home/FeaturedPlans.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

// Icons
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

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const BathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AreaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

const FeaturedPlans = ({ title = "Featured House Plans", viewAllLink = "/plans" }) => {
  const [favorites, setFavorites] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  
  // Featured plans (would come from API in real implementation)
  const featuredPlans = [
    {
      id: 1,
      name: 'Modern Villa',
      style: 'Contemporary',
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 3200,
      price: 195000,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      name: 'Coastal Retreat',
      style: 'Modern',
      bedrooms: 3,
      bathrooms: 2.5,
      squareFootage: 2800,
      price: 165000,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      name: 'Mountain Lodge',
      style: 'Craftsman',
      bedrooms: 5,
      bathrooms: 4,
      squareFootage: 4200,
      price: 250000,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      name: 'Urban Townhouse',
      style: 'Modern',
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1800,
      price: 120000,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Preload images
    featuredPlans.forEach(plan => {
      const img = new Image();
      img.src = plan.image;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [plan.id]: true }));
      };
    });
  }, []);
  
  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <Link to={viewAllLink} className="text-primary-600 hover:text-primary-700 font-medium">
            View all plans →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPlans.map((plan) => (
            <div 
              key={plan.id} 
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Image container with overlay */}
              <div className="relative">
                <Link to={`/plans/${plan.id}`} className="block relative h-64 overflow-hidden">
                  {/* Image loading placeholder */}
                  {!loadedImages[plan.id] && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* Main image */}
                  <img 
                    src={plan.image} 
                    alt={plan.name} 
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      loadedImages[plan.id] ? 'opacity-100' : 'opacity-0'
                    } group-hover:scale-105`}
                    onError={(e) => {
                      e.target.src = "/assets/images/placeholder-house.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </Link>
                
                {/* Style tag */}
                <div className="absolute top-4 left-4">
                  <Link to={`/plans?style=${plan.style}`} className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 text-xs font-medium rounded-full shadow-sm hover:bg-white">
                    {plan.style}
                  </Link>
                </div>
                
                {/* Favorite button */}
                <button 
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    favorites.includes(plan.id) 
                      ? 'text-red-500 bg-white/90 shadow-md' 
                      : 'text-gray-100 bg-black/20 hover:bg-white/90 hover:text-gray-800'
                  } transition-all duration-300 transform hover:scale-110`}
                  onClick={() => toggleFavorite(plan.id)}
                  aria-label={favorites.includes(plan.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <HeartIcon filled={favorites.includes(plan.id)} />
                </button>
                
                {/* Price tag */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="text-white">
                    <span className="text-lg font-bold">{formatCurrency(plan.price)}</span>
                  </div>
                  
                  <Link 
                    to={`/plans/${plan.id}`} 
                    className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    View Plan
                  </Link>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <Link to={`/plans/${plan.id}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors mb-1 truncate">
                    {plan.name}
                  </h3>
                </Link>
                
                {/* Features */}
                <div className="flex flex-wrap items-center text-gray-600 text-sm mt-3 gap-3">
                  <div className="flex items-center">
                    <BedIcon />
                    <span className="ml-1">{plan.bedrooms} Bed{plan.bedrooms !== 1 ? 's' : ''}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <BathIcon />
                    <span className="ml-1">{plan.bathrooms} Bath{plan.bathrooms !== 1 ? 's' : ''}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <AreaIcon />
                    <span className="ml-1">{plan.squareFootage.toLocaleString()} sq ft</span>
                  </div>
                </div>
                
                {/* Quick action buttons - visible on hover */}
                <div className="mt-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Handle add to cart functionality
                      console.log('Adding to cart:', plan.id);
                    }}
                    className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                  <Link 
                    to={`/plans/${plan.id}/customize`} 
                    className="flex-1 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-medium rounded text-center transition-colors"
                  >
                    Customize
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPlans;