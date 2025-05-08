// client/src/utils/index.js

/**
 * Format currency to KES with proper formatting
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'KES 0';
    return `KES ${Number(amount).toLocaleString()}`;
  };
  
  /**
   * Default placeholder images for different content types
   */
  export const PLACEHOLDER_IMAGES = {
    PLAN: "/assets/images/plans/placeholder-house.jpg",
    THUMBNAIL: "/assets/images/plans/placeholder-thumbnail.jpg",
    FLOOR_PLAN: "/assets/images/plans/placeholder-floorplan.jpg",
    DESIGNER: "/assets/images/plans/placeholder-designer.jpg",
    PROFILE: "/assets/images/plans/placeholder-profile.jpg",
    TEAM: "/assets/images/plans/placeholder-team.jpg",
    HERO: "/assets/images/hero-placeholder.jpg"
  };
  
  /**
   * Gets the proper image URL from a path, handling both relative and absolute paths
   * @param {string} imagePath - The image path or URL
   * @param {string} fallback - Optional fallback image if path is empty
   * @returns {string} Properly formatted image URL
   */
  export const getImageUrl = (imagePath, fallback = PLACEHOLDER_IMAGES.PLAN) => {
    if (!imagePath) return fallback;
    
    // Check if it's an absolute URL (starts with http or https)
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // For relative paths, make sure they're correctly formed
    // If the image path starts with '/', use it as is, otherwise add '/'
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };
  
  /**
   * Creates asset directory structure if it doesn't exist
   * This is a utility function to help set up the project
   */
  export const ensureAssetDirectories = () => {
    const directories = [
      '/assets',
      '/assets/images',
      '/assets/images/plans',
      '/assets/images/team',
      '/assets/images/designers'
    ];
    
    // In a real application, this would interact with the file system
    // For frontend-only, we just log a message
    console.log('Ensuring asset directories exist:', directories);
    
    return {
      directories,
      message: 'In a real application, this would create the necessary directories for assets.'
    };
  };
  
  /**
   * Truncates text to a specified length and adds ellipsis if needed
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length before truncating
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    return `${text.substring(0, maxLength)}...`;
  };
  
  /**
   * Filters and sorts plans based on criteria
   * @param {Array} plans - Array of plan objects
   * @param {Object} filters - Filter criteria
   * @param {string} sortBy - Sort method
   * @returns {Array} Filtered and sorted plans
   */
  export const filterAndSortPlans = (plans, filters, sortBy = 'newest') => {
    if (!plans || !Array.isArray(plans)) return [];
    
    // First filter plans
    const filteredPlans = plans.filter(plan => {
      // Skip undefined or null plans
      if (!plan) return false;
      
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatches = plan.name?.toLowerCase().includes(searchLower) || false;
        const styleMatches = plan.style?.toLowerCase().includes(searchLower) || false;
        
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
    
    // Then sort filtered plans
    return [...filteredPlans].sort((a, b) => {
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
  };