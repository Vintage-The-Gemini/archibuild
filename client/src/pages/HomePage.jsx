import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Icons
const MagnifyingGlassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
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
      image: '/assets/images/plans/modern-villa.jpg'
    },
    {
      id: 2,
      name: 'Coastal Retreat',
      style: 'Modern',
      bedrooms: 3,
      bathrooms: 2.5,
      squareFootage: 2800,
      price: 165000,
      image: '/assets/images/plans/coastal-retreat.jpg'
    },
    {
      id: 3,
      name: 'Mountain Lodge',
      style: 'Craftsman',
      bedrooms: 5,
      bathrooms: 4,
      squareFootage: 4200,
      price: 250000,
      image: '/assets/images/plans/mountain-lodge.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Modern house exterior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30"></div>
        </div>
        
        <div className="relative flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Discover Your <br />Dream Home Blueprint
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-10">
            Premium architectural plans crafted by world-class designers, ready to bring your vision to life.
          </p>
          
          {/* Search Form */}
          <div className="w-full max-w-xl">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                // Handle search submission
                window.location.href = `/plans?search=${searchQuery}`;
              }} 
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by style, size, or features..."
                className="w-full h-14 px-5 pr-16 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-14 w-14 flex items-center justify-center text-primary-600 hover:text-primary-700"
              >
                <MagnifyingGlassIcon />
              </button>
            </form>
            
            <div className="mt-6 grid grid-cols-3 gap-4">
              <Link to="/plans?style=modern" className="bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-center transition duration-300">
                Modern
              </Link>
              <Link to="/plans?style=craftsman" className="bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-center transition duration-300">
                Craftsman
              </Link>
              <Link to="/plans?style=farmhouse" className="bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-center transition duration-300">
                Farmhouse
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Plans Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured House Plans</h2>
            <Link to="/plans" className="text-primary-600 hover:text-primary-700 font-medium">
              View all plans →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlans.map((plan) => (
              <Link key={plan.id} to={`/plans/${plan.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={plan.image} 
                      alt={plan.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                      <div className="text-white font-semibold text-lg">${plan.price}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-500 mb-2">{plan.style}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div>{plan.bedrooms} beds • {plan.bathrooms} baths</div>
                      <div>{plan.squareFootage} sq ft</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ArchiBuild Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From browsing to building, we've simplified the process of finding and implementing your perfect house plan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Browse & Select</h3>
              <p className="text-gray-600">
                Explore our catalog of premium house plans and find the perfect match for your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customize</h3>
              <p className="text-gray-600">
                Personalize your plan with optional modifications or request custom changes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Download & Build</h3>
              <p className="text-gray-600">
                Receive complete build-ready blueprints and bring your dream home to life.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Interior of modern home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Something Unique?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Our team of architects can create a custom house plan tailored to your specific requirements.
          </p>
          <Link to="/custom" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-lg transition duration-300">
            Request Custom Design
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;