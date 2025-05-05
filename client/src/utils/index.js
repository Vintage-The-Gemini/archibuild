// client/src/utils/index.js

/**
 * Format currency to KES with proper formatting
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
    return `KES ${amount.toLocaleString()}`;
  };
  
  /**
   * Default placeholder images for different content types
   */
  export const PLACEHOLDER_IMAGES = {
    PLAN: "/assets/images/placeholder-house.jpg",
    THUMBNAIL: "/assets/images/placeholder-thumbnail.jpg",
    FLOOR_PLAN: "/assets/images/placeholder-floorplan.jpg",
    DESIGNER: "/assets/images/placeholder-designer.jpg",
    PROFILE: "/assets/images/placeholder-profile.jpg",
    TEAM: "/assets/images/placeholder-team.jpg"
  };
  
  /**
   * Image with fallback and loading state handling
   * @param {string} src - The image source
   * @param {string} alt - Alt text for the image
   * @param {string} fallbackSrc - Fallback image if the main one fails to load
   * @param {string} className - Additional CSS classes
   * @returns {JSX.Element} Image component with fallback functionality
   */
  export const ImageWithFallback = ({ 
    src, 
    alt, 
    fallbackSrc, 
    className = "", 
    onLoad = () => {}, 
    ...props 
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const handleLoad = () => {
      setIsLoading(false);
      onLoad();
    };
    
    const handleError = () => {
      setIsLoading(false);
      setError(true);
    };
    
    return (
      <div className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={error ? fallbackSrc : src} 
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
          {...props}
        />
      </div>
    );
  };