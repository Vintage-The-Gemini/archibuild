import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

// Import PlanCard component - in the real implementation, you would import this
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
  
  // State for favorite plans (would come from a context or redux store in a real app)
  const [favorites, setFavorites] = useState([2, 5]); // Example: plans with ID 2 and 5 are favorited
  
  // State for sorting
  const [sortBy, setSortBy] = useState('newest');
  
  // Placeholder for plans (would be fetched from API in real implementation)
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Modern Villa',
      style: 'Modern',
      price: 195000,
      squareFootage: 3200,
      bedrooms: 4,
      bathrooms: 3,
      image: '/assets/images/plans/modern-villa.jpg',
    },
    {
      id: 2,
      name: 'Coastal Retreat',
      style: 'Contemporary',
      price: 165000,
      squareFootage: 2800,
      bedrooms: 3,
      bathrooms: 2.5,
      image: '/assets/images/plans/coastal-retreat.jpg',
    },
    {
      id: 3,
      name: 'Mountain Lodge',
      style: 'Craftsman',
      price: 250000,
      squareFootage: 4200,
      bedrooms: 5,
      bathrooms: 4,
      image: '/assets/images/plans/mountain-lodge.jpg',
    },
    {
      id: 4,
      name: 'Urban Townhouse',
      style: 'Modern',
      price: 120000,
      squareFootage: 1800,
      bedrooms: 2,
      bathrooms: 2,
      image: '/assets/images/plans/urban-townhouse.jpg',
    },
    {
      id: 5,
      name: 'Country Farmhouse',
      style: 'Farmhouse',
      price: 185000,
      squareFootage: 3600,
      bedrooms: 4,
      bathrooms: 3.5,
      image: '/assets/images/plans/country-farmhouse.jpg',
    },
    {
      id: 6,
      name: 'Lakefront Cabin',
      style: 'Craftsman',
      price: 145000,
      squareFootage: 2200,
      bedrooms: 3,
      bathrooms: 2,
      image: '/assets/images/plans/lakefront-cabin.jpg',
    },
    {
      id: 7,
      name: 'Urban Loft Design',
      style: 'Contemporary',
      price: 125000,
      squareFootage: 1900,
      bedrooms: 2,
      bathrooms: 2,
      image: '/assets/images/plans/urban-loft.jpg',
    },
    {
      id: 8,
      name: 'Mediterranean Villa',
      style: 'Mediterranean',
      price: 210000,
      squareFootage: 3800,
      bedrooms: 4,
      bathrooms: 3.5,
      image: '/assets/images/plans/mediterranean-villa.jpg',
    },
    {
      id: 9,
      name: 'Desert Oasis',
      style: 'Modern',
      price: 175000,
      squareFootage: 2900,
      bedrooms: 3,
      bathrooms: 2.5,
      image: '/assets/images/plans/desert-oasis.jpg',
    },
  ]);
  
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
  
  // Function to apply filters to plans
  const filteredPlans = plans.filter(plan => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatches = plan.name.toLowerCase().includes(searchLower);
      const styleMatches = plan.style.toLowerCase().includes(searchLower);
      
      if (!nameMatches && !styleMatches) return false;
    }
    
    // Style filter
    if (filters.style && plan.style !== filters.style) return false;
    
    // Bedrooms filter
    if (filters.bedrooms && plan.bedrooms < parseInt(filters.bedrooms)) return false;
    
    // Bathrooms filter
    if (filters.bathrooms && plan.bathrooms < parseInt(filters.bathrooms)) return false;
    
    // Square footage filters
    if (filters.minSqFt && plan.squareFootage < parseInt(filters.minSqFt)) return false;
    if (filters.maxSqFt && plan.squareFootage > parseInt(filters.maxSqFt)) return false;
    
    // Price filters
    if (filters.minPrice && plan.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && plan.price > parseInt(filters.maxPrice)) return false;
    
    return true;
  });
  
  // Function to sort plans
  const sortedPlans = [...filteredPlans].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'sqft-low-high':
        return a.squareFootage - b.squareFootage;
      case 'sqft-high-low':
        return b.squareFootage - a.squareFootage;
      case 'beds-low-high':
        return a.bedrooms - b.bedrooms;
      case 'beds-high-low':
        return b.bedrooms - a.bedrooms;
      default:
        // 'newest' - by ID in this demo (would be by date in a real app)
        return b.id - a.id;
    }
  });
  
  // Available styles for filter
  const availableStyles = ['Modern', 'Contemporary', 'Craftsman', 'Farmhouse', 'Colonial', 'Mediterranean'];
  
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">House Plans</h1>
          <p className="mt-2 text-gray-600">
            Browse our collection of premium architectural plans crafted by world-class designers.
          </p>
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
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
              
              {/* Style filter */}
              <div className="mb-6">
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <select
                  id="style"
                  name="style"
                  value={filters.style}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                >
                  <option value="">Any Style</option>
                  {availableStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
              
              {/* Bedrooms filter */}
              <div className="mb-6">
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              {/* Bathrooms filter */}
              <div className="mb-6">
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              {/* Square footage filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Square Footage
                </label>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <input
                      type="number"
                      name="minSqFt"
                      placeholder="Min"
                      value={filters.minSqFt}
                      onChange={handleFilterChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="w-1/2">
                    <input
                      type="number"
                      name="maxSqFt"
                      placeholder="Max"
                      value={filters.maxSqFt}
                      onChange={handleFilterChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
              
              {/* Price filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (KES)
                </label>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="w-1/2">
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Plans grid */}
          <div className="flex-1">
            {/* Desktop sorting and results count */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div className="text-gray-500">
                {filteredPlans.length} {filteredPlans.length === 1 ? 'plan' : 'plans'} found
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
            {sortedPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPlans.map(plan => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    isFavorite={favorites.includes(plan.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">No plans match your criteria</div>
                <button
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile filter drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsFilterOpen(false)}
            />
            
            {/* Drawer */}
            <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
              {/* Header */}
              <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <XMarkIcon />
                </button>
              </div>
              
              {/* Filters */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Style filter */}
                <div className="mb-6">
                  <label htmlFor="mobile-style" className="block text-sm font-medium text-gray-700 mb-2">
                    Style
                  </label>
                  <select
                    id="mobile-style"
                    name="style"
                    value={filters.style}
                    onChange={handleFilterChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  >
                    <option value="">Any Style</option>
                    {availableStyles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
                
                {/* Bedrooms filter */}
                <div className="mb-6">
                  <label htmlFor="mobile-bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select
                    id="mobile-bedrooms"
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                
                {/* Bathrooms filter */}
                <div className="mb-6">
                  <label htmlFor="mobile-bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <select
                    id="mobile-bathrooms"
                    name="bathrooms"
                    value={filters.bathrooms}
                    onChange={handleFilterChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                
                {/* Square footage filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Square Footage
                  </label>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <input
                        type="number"
                        name="minSqFt"
                        placeholder="Min"
                        value={filters.minSqFt}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="number"
                        name="maxSqFt"
                        placeholder="Max"
                        value={filters.maxSqFt}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Price filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (KES)
                  </label>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <input
                        type="number"
                        name="minPrice"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="px-4 py-5 border-t border-gray-200 flex justify-between">
                <button
                  onClick={resetFilters}
                  className="text-primary-600 font-medium"
                >
                  Reset all
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="btn-primary"
                >
                  Show results ({filteredPlans.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansPage;