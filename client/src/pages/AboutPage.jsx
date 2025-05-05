// client/src/pages/AboutPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Lead Architect',
      image: '/assets/images/team/founder.jpg',
      bio: 'With over 15 years of experience in architectural design, Sarah founded ArchiBuild with a vision to make premium house plans accessible to everyone.'
    },
    {
      name: 'David Kimani',
      role: 'Senior Architect',
      image: '/assets/images/team/architect-1.jpg',
      bio: 'David specializes in contemporary and modern designs, with a particular focus on energy-efficient and sustainable architecture.'
    },
    {
      name: 'Amina Odhiambo',
      role: 'Architectural Designer',
      image: '/assets/images/team/architect-2.jpg',
      bio: 'Amina brings creativity and innovation to every project, with expertise in blending traditional Kenyan elements with modern design.'
    },
    {
      name: 'Michael Wanjala',
      role: 'Interior Design Specialist',
      image: '/assets/images/team/designer.jpg',
      bio: 'Michael ensures that our house plans feature thoughtful interior layouts that maximize functionality and aesthetic appeal.'
    },
    {
      name: 'Grace Muthoni',
      role: 'Client Relations Manager',
      image: '/assets/images/team/client-manager.jpg',
      bio: 'Grace oversees our client relations, ensuring that every customer receives personalized attention throughout their journey with us.'
    },
    {
      name: 'John Njoroge',
      role: 'Technical Director',
      image: '/assets/images/team/technical-director.jpg',
      bio: 'John ensures that all our plans meet the highest technical standards and building code requirements across Kenya and East Africa.'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative bg-gray-50">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-primary-600"></div>
        </div>
        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-2">
          <div className="bg-primary-600 py-16 px-4 sm:px-6 lg:col-span-1 lg:px-8 lg:py-24 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Our Story
              </h2>
              <p className="mt-3 text-lg leading-6 text-white">
                ArchiBuild was founded in 2018 with a mission to transform the way people access architectural designs in Kenya and beyond.
              </p>
              <p className="mt-6 text-base text-white">
                What began as a small studio in Nairobi has grown into a full-service architectural firm specializing in creating premium house plans that combine aesthetic beauty with functional design.
              </p>
              <p className="mt-6 text-base text-white">
                Our team of architects and designers brings together diverse experiences and perspectives, united by a passion for creating spaces where people can live their best lives.
              </p>
            </div>
          </div>
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-1 lg:px-8 lg:py-24 xl:pl-12">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Our Vision
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                We envision a world where every person has access to thoughtfully designed, sustainable, and beautiful living spaces.
              </p>
              <div className="mt-8">
                <dl className="space-y-10">
                  <div>
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Quality Design
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      We are committed to creating house plans that meet the highest standards of architectural excellence, combining beauty, functionality, and sustainability.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Accessibility
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      We believe everyone deserves access to professional architectural designs at affordable prices, without compromising on quality.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Innovation
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      We continuously explore new design approaches, materials, and technologies to create homes that meet the evolving needs of modern living.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our talented team brings together diverse expertise and a shared passion for architectural excellence.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/images/team/placeholder.jpg";
                    }}
                  />
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-primary-600 mb-3">{member.role}</p>
                  <p className="text-gray-500">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              These principles guide everything we do at ArchiBuild.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Craftsmanship</h3>
                <p className="mt-2 text-gray-500">
                  We approach each design with meticulous attention to detail, ensuring that every aspect of our house plans meets the highest standards of architectural excellence.
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Innovation</h3>
                <p className="mt-2 text-gray-500">
                  We continuously explore new ideas, technologies, and design approaches to create living spaces that are not only beautiful but also forward-thinking and sustainable.
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Client Focus</h3>
                <p className="mt-2 text-gray-500">
                  We put our clients at the center of everything we do, listening carefully to their needs and working collaboratively to create homes that exceed their expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to find your dream home?</span>
            <span className="block text-primary-200">Start exploring our house plans today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/plans" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50">
                Browse Plans
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/custom" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500">
                Request Custom Design
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Find answers to common questions about ArchiBuild and our services.
            </p>
          </div>
          <div className="mt-12 max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">What makes ArchiBuild different from other house plan websites?</h3>
              <p className="mt-2 text-base text-gray-500">
                Our plans are designed by local architects with deep knowledge of Kenyan building practices, climate considerations, and cultural preferences. We offer both pre-designed plans and custom design services, providing flexibility to meet your specific needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">How do I purchase a house plan?</h3>
              <p className="mt-2 text-base text-gray-500">
                Simply browse our collection, select the plan you like, and follow the checkout process. Once payment is complete, you'll receive access to download your plan files, including detailed construction drawings.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Can I modify a pre-designed plan?</h3>
              <p className="mt-2 text-base text-gray-500">
                Yes! We offer modification services for all our pre-designed plans. Simply purchase the base plan and then contact us to discuss your desired changes. Our team will provide a quote for the modifications based on their complexity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">What is included in a typical house plan package?</h3>
              <p className="mt-2 text-base text-gray-500">
                Our standard packages include floor plans, elevations, sections, foundation plans, roof plans, electrical layouts, plumbing diagrams, and detailed construction notes. Additional specialized drawings can be requested at an extra cost.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">How long does the custom design process take?</h3>
              <p className="mt-2 text-base text-gray-500">
                The timeline varies based on the complexity of your project, but typically ranges from 4-12 weeks from initial consultation to final delivery of construction documents. We'll provide a detailed timeline during our first meeting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Still have questions?</h2>
          <p className="mt-4 text-lg text-gray-500">
            Our team is always happy to help. Reach out to us for any inquiries about our plans or services.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;