// client/src/components/common/Image.jsx
import React, { useState, useEffect } from 'react';

// Default placeholder images for different content types
export const PLACEHOLDER_IMAGES = {
  PLAN: "/assets/images/plans/placeholder-house.jpg",
  THUMBNAIL: "/assets/images/plans/placeholder-thumbnail.jpg",
  FLOOR_PLAN: "/assets/images/plans/placeholder-floorplan.jpg",
  DESIGNER: "/assets/images/plans/placeholder-designer.jpg",
  PROFILE: "/assets/images/plans/placeholder-profile.jpg",
  TEAM: "/assets/images/plans/placeholder-team.jpg"
};

/**
 * A component that handles image loading, errors, and provides fallback functionality.
 * 
 * @param {Object} props
 * @param {string} props.src - Source URL of the image
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.fallbackSrc - Fallback image to use if the main image fails to load
 * @param {string} props.className - Additional CSS classes for the image
 * @param {string} props.containerClassName - CSS classes for the container div
 * @param {Function} props.onLoad - Callback function when image loads successfully
 * @param {Function} props.onError - Callback function when image fails to load
 * @param {boolean} props.showPlaceholder - Whether to show a placeholder while loading
 * @param {Object} props.placeholderStyles - Custom styles for the placeholder
 * @param {React.ReactNode} props.loadingComponent - Custom component to show while loading
 * @param {Object} props.rest - Any other props to pass to the img element
 */
const Image = ({ 
  src, 
  alt,
  fallbackSrc,
  className = "",
  containerClassName = "",
  onLoad = () => {},
  onError = () => {},
  showPlaceholder = true,
  placeholderStyles = {},
  loadingComponent = null,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  
  // Process the source URL when the component mounts or src changes
  useEffect(() => {
    if (!src) {
      setError(true);
      setIsLoading(false);
      return;
    }
    
    // Reset states when src changes
    setIsLoading(true);
    setError(false);
    
    // Process the source URL
    if (src.startsWith('http')) {
      // Absolute URL
      setImgSrc(src);
    } else {
      // Relative URL - ensure it starts with a slash
      setImgSrc(src.startsWith('/') ? src : `/${src}`);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad();
  };
  
  const handleError = () => {
    setIsLoading(false);
    setError(true);
    onError();
    
    // If fallbackSrc is provided, use it
    if (fallbackSrc) {
      console.log(`Image failed to load: ${src}. Using fallback.`);
    } else {
      console.error(`Image failed to load: ${src} and no fallback provided.`);
    }
  };
  
  return (
    <div className={`relative ${containerClassName}`}>
      {/* Loading placeholder */}
      {isLoading && showPlaceholder && (
        loadingComponent || (
          <div 
            className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center"
            style={placeholderStyles}
          >
            <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        )
      )}
      
      {/* Image */}
      {(!error || fallbackSrc) && (
        <img 
          src={error ? fallbackSrc : imgSrc} 
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
          {...rest}
        />
      )}
      
      {/* Error state with no fallback */}
      {error && !fallbackSrc && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Image;