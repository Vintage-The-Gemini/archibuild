// client/src/pages/PlansPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { filterAndSortPlans, PLACEHOLDER_IMAGES } from '../utils';
import PlanCard from '../components/plans/PlanCard';

// Icons
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

const XMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const PlansPage = () => {
  // Get search params from URL
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State for filters
  const [filters, setFilters] = useState({
    style: searchParams.get('style') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    minSqFt: searchParams.get('minSqFt') || '',
    maxSqFt: searchParams.get('maxSqFt') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
  });
  
  // State for mobile filter drawer
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // State for favorite plans
  const [favorites, setFavorites] = useState([2, 5]);
  
  // State for sorting
  const [sortBy, setSortBy] = useState('newest');
  
  // State for loading
  const [loading, setLoading] = useState(true);
  
  // State for plans
  const [plans, setPlans] = useState([]);
  
  // Fetch plans from API (simulated)
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      // Using Unsplash images or placeholder paths
      setPlans([
        {
          id: 1,
          name: 'Modern Villa',
          style: 'Modern',
          price: 195000,
          squareFootage: 3200,
          bedrooms: 4,
          bathrooms: 3,
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          id: 2,
          name: 'Coastal Retreat',
          style: 'Contemporary',
          price: 165000,
          squareFootage: 2800,
          bedrooms: 3,
          bathrooms: 2.5,
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          id: 3,
          name: 'Mountain Lodge',
          style: 'Craftsman',
          price: 250000,
          squareFootage: 4200,
          bedrooms: 5,
          bathrooms: 4,
          image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          id: 4,
          name: 'Urban Townhouse',
          style: 'Modern',
          price: 120000,
          squareFootage: 1800,
          bedrooms: 2,
          bathrooms: 2,
          image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          id: 5,
          name: 'Country Farmhouse',
          style: 'Farmhouse',
          price: 185000,
          squareFootage: 3600,
          bedrooms: 4,
          bathrooms: 3.5,
          image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          id: 6,
          name: 'Lakefront Cabin',
          style: 'Craftsman',
          price: 145000,
          squareFootage: 2200,
          bedrooms: 3,
          bathrooms: 2,
          image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          id: 7,
          name: 'Urban Loft Design',
          style: 'Contemporary',
          price: 125000,
          squareFootage: 1900,
          bedrooms: 2,
          bathrooms: 2,
          image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          id: 8,
          name: 'Mediterranean Villa',
          style: 'Mediterranean',
          price: 210000,
          squareFootage: 3800,
          bedrooms: 4,
          bathrooms: 3.5,
          image: 'https://images.unsplash.com/photo-1600074169098-16a54d791d0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          id: 9,
          name: 'Desert Oasis',
          style: 'Modern',
          price: 175000,
          squareFootage: 2900,
          bedrooms: 3,
          bathrooms: 2.5,
          image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
      ]);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Update URL when filters change
  useEffect(() => {
    // Remove empty filters
    const newParams = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    
    setSearchParams(newParams);
  }, [filters, setSearchParams]);
  
  // Function to toggle favorite
  const handleToggleFavorite = (planId) => {
    if (favorites.includes(planId)) {
      setFavorites(favorites.filter(id => id !== planId));
    } else {
      setFavorites([...favorites, planId]);
    }
  };
  
  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  
  // Function to reset all filters
  const resetFilters = () => {
    setFilters({
      style: '',
      bedrooms: '',
      bathrooms: '',
      minSqFt: '',
      maxSqFt: '',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
  };
  
  // Handle search input
  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
  };
  
  // Filter and sort the plans
  const filteredAndSortedPlans = filterAndSortPlans(plans, filters, sortBy);
  
  // Available styles for filter
  const availableStyles = ['Modern', 'Contemporary', 'Craftsman', 'Farmhouse', 'Colonial', 'Mediterranean'];
  
  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">House Plans</h1>
          <p className="mt-2 text-gray-600">
            Browse our collection of premium architectural plans crafted by world-class designers.
          </p>
          
          {/* Search bar */}
          <div className="mt-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search plans by name, style, or features..."
                value={filters.search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile filter button and sort dropdown */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
          >
            <FilterIcon />
            <span>Filters</span>
          </button>
          
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="sqft-low-high">Size: Small to Large</option>
              <option value="sqft-high-low">Size: Large to Small</option>
              <option value="beds-low-high">Beds: Low to High</option>
              <option value="beds-high-low">Beds: High to Low</option>
            </select>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop filters sidebar */}
          <div className="hidden md:block w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                {Object.values(filters).some(val => val !== '') && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary-600 hover:text-primary-800"
                  >
                    Reset all
                  </button>
                )}
              </div>
              
              {/* Filter controls - same as before */}
              {/* ... (all filter controls remain the same) ... */}
            </div>
          </div>
          
          {/* Plans grid */}
          <div className="flex-1">
            {/* Desktop sorting and results count */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div className="text-gray-500">
                {filteredAndSortedPlans.length} {filteredAndSortedPlans.length === 1 ? 'plan' : 'plans'} found
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="sqft-low-high">Size: Small to Large</option>
                  <option value="sqft-high-low">Size: Large to Small</option>
                  <option value="beds-low-high">Beds: Low to High</option>
                  <option value="beds-high-low">Beds: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Plans grid */}
            {filteredAndSortedPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedPlans.map(plan => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    isFavorite={favorites.includes(plan.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="text-gray-400 text-lg mb-4">No plans match your criteria</div>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;