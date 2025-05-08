// client/src/pages/PlanDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatCurrency, getImageUrl, PLACEHOLDER_IMAGES } from '../utils/index';
import Image from '../components/common/Image';

// Simple icons
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

const GarageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
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

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const PlanDetailPage = () => {
  // Get plan ID from URL
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Tabs
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real application, this would be fetched from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // This is mock data - in a real application, you would fetch this from your API
      const planData = {
        id: parseInt(id),
        name: 'Modern Villa with Pool',
        style: 'Contemporary',
        price: 195000,
        squareFootage: 3200,
        bedrooms: 4,
        bathrooms: 3.5,
        garage: 2,
        stories: 2,
        year: 2023,
        description: 'This stunning contemporary home features an open-concept layout perfect for modern living. The spacious design includes a large gourmet kitchen that flows seamlessly into the dining and living areas, making it ideal for entertaining. Floor-to-ceiling windows throughout maximize natural light and provide beautiful views of the surrounding landscape.',
        features: [
          'Open floor plan with high ceilings',
          'Gourmet kitchen with island',
          'Large master suite with walk-in closet',
          'Energy-efficient windows and insulation',
          'Covered outdoor living area',
          'Home office/study room',
          'Media/entertainment room',
          'Spacious pantry',
          'Mudroom with built-in storage'
        ],
        dimensions: {
          width: 65,
          depth: 80,
          height: 24
        },
        images: [
          '/assets/images/plans/modern-villa-1.jpg',
          '/assets/images/plans/modern-villa-2.jpg',
          '/assets/images/plans/modern-villa-3.jpg',
          '/assets/images/plans/modern-villa-4.jpg',
          '/assets/images/plans/modern-villa-floorplan.jpg',
        ],
        floorPlans: [
          {
            name: 'First Floor',
            image: '/assets/images/plans/modern-villa-floorplan-1.jpg',
            rooms: ['Living Room', 'Kitchen', 'Dining Room', 'Study', 'Half Bath', 'Laundry Room', 'Garage']
          },
          {
            name: 'Second Floor',
            image: '/assets/images/plans/modern-villa-floorplan-2.jpg',
            rooms: ['Master Bedroom', 'Master Bath', 'Walk-in Closet', '3 Bedrooms', '2 Bathrooms']
          }
        ],
        packages: [
          {
            name: 'Study Set',
            price: 195000,
            description: 'Preliminary drawings to review the design',
            included: ['PDF Floor Plans', 'PDF Elevations', 'General Specifications']
          },
          {
            name: 'Construction Set',
            price: 295000,
            description: 'Complete set of drawings needed for building permit and construction',
            included: ['5 Sets of Blueprints', 'PDF Floor Plans', 'PDF Elevations', 'Electrical Plans', 'Foundation Plan', 'Roof Plan', 'Detailed Specifications']
          },
          {
            name: 'Complete Package',
            price: 395000,
            description: 'Everything you need to build your dream home',
            included: ['Construction Set', 'CAD Files', '3D Renderings', 'Material List', 'Cost Estimate', 'Virtual Walkthrough', 'Consultation with Architect']
          }
        ],
        designer: {
          name: 'Architectural Designs Inc.',
          bio: 'With over 20 years of experience, Architectural Designs specializes in creating modern, sustainable homes that blend aesthetics with functionality.',
          image: '/assets/images/designers/architectural-designs.jpg'
        },
        similarPlans: [2, 7, 9] // IDs of similar plans
      };
      
      setPlan(planData);
      setLoading(false);
    }, 600);
  }, [id]);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you would save this to user's favorites in your backend
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!plan) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h1>
        <p className="text-gray-600 mb-8">The house plan you're looking for doesn't seem to exist.</p>
        <Link to="/plans" className="btn-primary">Browse All Plans</Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb navigation */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/plans" className="text-gray-500 hover:text-gray-700">House Plans</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900 font-medium truncate">{plan.name}</span>
          </nav>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left side - Images */}
          <div>
            {/* Main image */}
            <div className="mb-4 overflow-hidden rounded-lg bg-gray-100 relative">
              <Image 
                src={plan.images[activeImage]} 
                alt={`${plan.name} - View ${activeImage + 1}`}
                fallbackSrc={PLACEHOLDER_IMAGES.PLAN}
                className="w-full h-96 object-cover object-center"
                containerClassName="w-full h-96"
              />
              <button
                onClick={toggleFavorite}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isFavorite 
                    ? 'text-red-500 bg-white/90' 
                    : 'text-gray-100 bg-black/20 hover:bg-white/90 hover:text-gray-800'
                } transition-colors`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <HeartIcon filled={isFavorite} />
              </button>
            </div>
            
            {/* Thumbnail gallery */}
            <div className="grid grid-cols-5 gap-2">
              {plan.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`rounded-md overflow-hidden border-2 ${
                    activeImage === index ? 'border-primary-500' : 'border-transparent'
                  }`}
                >
                  <Image 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    fallbackSrc={PLACEHOLDER_IMAGES.THUMBNAIL}
                    className="w-full h-16 object-cover"
                    containerClassName="w-full h-16"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side - Plan details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h1>
            <p className="text-gray-600 mb-4">Style: {plan.style}</p>
            
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center text-gray-700">
                <BedIcon />
                <span className="ml-2">{plan.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center text-gray-700">
                <BathIcon />
                <span className="ml-2">{plan.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center text-gray-700">
                <AreaIcon />
                <span className="ml-2">{plan.squareFootage.toLocaleString()} sq ft</span>
              </div>
              <div className="flex items-center text-gray-700">
                <GarageIcon />
                <span className="ml-2">{plan.garage} Car Garage</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary-600 mb-2">{formatCurrency(plan.price)}</h2>
              <p className="text-gray-600 text-sm">Starting price for Study Set. See packages below.</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <button className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                Add to Cart
              </button>
              <button className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg font-medium transition-colors">
                Request Customization
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-2">Plan Dimensions</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Width</p>
                  <p className="font-medium">{plan.dimensions.width} ft</p>
                </div>
                <div>
                  <p className="text-gray-600">Depth</p>
                  <p className="font-medium">{plan.dimensions.depth} ft</p>
                </div>
                <div>
                  <p className="text-gray-600">Height</p>
                  <p className="font-medium">{plan.dimensions.height} ft</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-2">Designer</h3>
              <div className="flex items-center">
                <Image 
                  src={plan.designer.image} 
                  alt={plan.designer.name}
                  fallbackSrc={PLACEHOLDER_IMAGES.DESIGNER}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  containerClassName="w-12 h-12 rounded-full overflow-hidden"
                />
                <div>
                  <p className="font-medium">{plan.designer.name}</p>
                  <p className="text-sm text-gray-600">Architectural Design Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for additional information */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'features'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('floor-plans')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'floor-plans'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Floor Plans
              </button>
              <button
                onClick={() => setActiveTab('packages')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'packages'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Packages
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Overview</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{plan.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Specifications</h3>
                    <dl className="space-y-2">
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Style</dt>
                        <dd className="font-medium">{plan.style}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Bedrooms</dt>
                        <dd className="font-medium">{plan.bedrooms}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Bathrooms</dt>
                        <dd className="font-medium">{plan.bathrooms}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Square Footage</dt>
                        <dd className="font-medium">{plan.squareFootage.toLocaleString()} sq ft</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Garage</dt>
                        <dd className="font-medium">{plan.garage} Car</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Stories</dt>
                        <dd className="font-medium">{plan.stories}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Year Designed</dt>
                        <dd className="font-medium">{plan.year}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Dimensions</h3>
                    <dl className="space-y-2">
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Width</dt>
                        <dd className="font-medium">{plan.dimensions.width} ft</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Depth</dt>
                        <dd className="font-medium">{plan.dimensions.depth} ft</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Height</dt>
                        <dd className="font-medium">{plan.dimensions.height} ft</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Total Area</dt>
                        <dd className="font-medium">{plan.squareFootage.toLocaleString()} sq ft</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}
            
            {/* Packages Tab */}
            {activeTab === 'packages' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Packages</h2>
                <p className="text-gray-700 mb-6">Choose the package that best suits your needs:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plan.packages.map((pkg, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
                      </div>
                      <div className="p-6">
                        <p className="text-2xl font-bold text-primary-600 mb-2">{formatCurrency(pkg.price)}</p>
                        <p className="text-gray-700 mb-4">{pkg.description}</p>
                        <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                        <ul className="space-y-2 mb-6">
                          {pkg.included.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <div className="flex-shrink-0 h-5 w-5 text-primary-600">
                                <CheckIcon />
                              </div>
                              <span className="ml-2 text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <button className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Similar Plans Section */}
        <div className="border-t border-gray-200 pt-12 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          
          {/* Here you would fetch and display similar plans based on the IDs in plan.similarPlans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example similar plans with proper image handling */}
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <Image 
                  src="/assets/images/plans/similar-plan-1.jpg" 
                  alt="Similar Plan 1"
                  fallbackSrc={PLACEHOLDER_IMAGES.PLAN}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">Modern Craftsman</h3>
                <p className="text-gray-500 text-sm">3 Beds • 2.5 Baths • 2,400 sq ft</p>
                <p className="text-primary-600 font-medium mt-2">{formatCurrency(175000)}</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <Image 
                  src="/assets/images/plans/similar-plan-2.jpg" 
                  alt="Similar Plan 2"
                  fallbackSrc={PLACEHOLDER_IMAGES.PLAN}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">Urban Loft</h3>
                <p className="text-gray-500 text-sm">2 Beds • 2 Baths • 1,800 sq ft</p>
                <p className="text-primary-600 font-medium mt-2">{formatCurrency(145000)}</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <Image 
                  src="/assets/images/plans/similar-plan-3.jpg" 
                  alt="Similar Plan 3"
                  fallbackSrc={PLACEHOLDER_IMAGES.PLAN}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">Mediterranean Villa</h3>
                <p className="text-gray-500 text-sm">4 Beds • 3.5 Baths • 3,500 sq ft</p>
                <p className="text-primary-600 font-medium mt-2">{formatCurrency(225000)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailPage;
            
            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <p className="text-gray-700 mb-6">This plan includes the following features to enhance your living experience:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-primary-600">
                        <CheckIcon />
                      </div>
                      <p className="ml-3 text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Floor Plans Tab */}
            {activeTab === 'floor-plans' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Floor Plans</h2>
                <p className="text-gray-700 mb-6">Detailed floor plans for each level of the house:</p>
                
                <div className="space-y-8">
                  {plan.floorPlans.map((floorPlan, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">{floorPlan.name}</h3>
                      </div>
                      <div className="p-6">
                        <div className="aspect-w-16 aspect-h-9 mb-6">
                          <Image 
                            src={floorPlan.image} 
                            alt={`${plan.name} - ${floorPlan.name} Floor Plan`}
                            fallbackSrc={PLACEHOLDER_IMAGES.FLOOR_PLAN}
                            className="rounded-lg object-contain w-full"
                            containerClassName="w-full h-full min-h-[300px]"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">Rooms on this floor:</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {floorPlan.rooms.map((room, roomIndex) => (
                            <li key={roomIndex} className="flex items-center text-gray-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary-600 mr-2"></span>
                              {room}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            