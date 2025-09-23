'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './Work.css';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState(false);
  const [purchaseProduct, setPurchaseProduct] = useState(null);

  const products = [
    {
      id: 1,
      title: 'Coming Soon Landing Page Template',
      category: 'web',
      price: '$10',
      gumroadUrl: 'https://gumroad.com/l/coming-soon-landing-page-template',
      image: 'https://public-files.gumroad.com/pi0lb4ic5ayrnkrampmuepl5c2il',
      description:
        'An effective solution to showcase your brand while your main website is under development.',
      technologies: ['Vite', 'React', 'Pure CSS'],
      features: [
        'Responsive design for all devices',
        'Brand-first focused design',
        'Empathetic content that connects with people',
        'Contact details integrated with social media',
        'SEO optimization for better search visibility',
        '3 months of free support',
      ],
      deliveryTime: 'Instant Download',
      details:
        'This comprehensive e-commerce package includes everything you need to start selling online. Built with modern technologies and best practices, featuring a clean, professional design that converts visitors into customers. Includes full source code, documentation, and deployment assistance.',
      githubUrl: 'https://github.com/yourusername/ecommerce-demo',
      livePreviewUrl: 'https://billahdotdev.github.io/dhakateez',
    },
    {
      id: 2,
      title: 'Portfolio Website',
      category: 'web',
      price: '$800',
      gumroadUrl: 'https://gumroad.com/l/portfolio-website',
      image:
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1455&q=80',
      description:
        'Professional portfolio website to showcase your work with elegant design and smooth animations.',
      technologies: ['React', 'CSS', 'JavaScript', 'Framer Motion'],
      features: [
        'Custom responsive design',
        'Project showcase gallery',
        'About & services sections',
        'Contact form integration',
        'Smooth animations',
        'SEO optimized',
        'Fast loading speed',
        'Mobile-first approach',
        '1 month free support',
      ],
      deliveryTime: '2-3 weeks',
      details:
        'A stunning portfolio website designed to showcase your work professionally. Features smooth animations, responsive design, and optimized performance. Perfect for freelancers, agencies, and creative professionals looking to make a strong online presence.',
      githubUrl: 'https://github.com/yourusername/portfolio-template',
      livePreviewUrl: 'https://portfolio-template.vercel.app',
    },
    {
      id: 3,
      title: 'Business Website Package',
      category: 'web',
      price: '$1,200',
      gumroadUrl: 'https://gumroad.com/l/business-website',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description:
        'Complete business website with booking system, service pages, and professional design.',
      technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Tailwind'],
      features: [
        'Professional business design',
        'Service/product pages',
        'Online booking system',
        'Contact & location info',
        'Testimonials section',
        'Blog/news section',
        'Social media integration',
        'Analytics setup',
        '2 months free support',
      ],
      deliveryTime: '3-4 weeks',
      details:
        'A comprehensive business website solution that establishes your professional online presence. Includes booking functionality, service showcases, and all the essential pages your business needs to attract and convert customers.',
      githubUrl: 'https://github.com/yourusername/business-site',
      livePreviewUrl: 'https://business-site-demo.vercel.app',
    },
    {
      id: 4,
      title: 'Brand Identity Design',
      category: 'design',
      price: '$600',
      gumroadUrl: 'https://gumroad.com/l/brand-identity',
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description:
        'Complete brand identity package including logo, color palette, and brand guidelines.',
      technologies: ['Figma', 'Illustrator', 'Photoshop'],
      features: [
        'Logo design (3 concepts)',
        'Color palette selection',
        'Typography guidelines',
        'Brand style guide',
        'Business card design',
        'Letterhead template',
        'Social media templates',
        'File formats (AI, PNG, SVG)',
        'Unlimited revisions',
      ],
      deliveryTime: '2-3 weeks',
      details:
        'A complete brand identity package that establishes your visual presence across all platforms. Includes professional logo design, comprehensive brand guidelines, and all the essential materials to maintain consistent branding.',
      images: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1600775508114-5c30cf911a40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
        'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1599817777301-94d8a0b33b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      ],
    },
    {
      id: 5,
      title: 'UI/UX Design Package',
      category: 'design',
      price: '$1,500',
      gumroadUrl: 'https://gumroad.com/l/uiux-design',
      image:
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description:
        'Complete UI/UX design for web or mobile applications with user research and prototyping.',
      technologies: ['Figma', 'Adobe XD', 'Principle', 'InVision'],
      features: [
        'User research & personas',
        'Wireframing & prototyping',
        'High-fidelity UI designs',
        'Interactive prototypes',
        'Design system creation',
        'Responsive design layouts',
        'Usability testing',
        'Developer handoff files',
        '2 rounds of revisions',
      ],
      deliveryTime: '4-5 weeks',
      details:
        'Comprehensive UI/UX design service that covers the entire design process from research to final handoff. Creates user-centered designs that are both beautiful and functional, ensuring optimal user experience.',
      images: [
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      ],
    },
    {
      id: 6,
      title: 'Web Development Mastery eBook',
      category: 'ebook',
      price: '$49',
      gumroadUrl: 'https://gumroad.com/l/web-dev-mastery',
      image:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description:
        'Comprehensive guide to modern web development with practical projects and real-world examples.',
      technologies: ['PDF', 'EPUB', 'Interactive Examples'],
      features: [
        '300+ pages of content',
        '15 practical projects',
        'Source code included',
        'Video tutorials access',
        'Modern frameworks coverage',
        'Best practices guide',
        'Career advice section',
        'Lifetime updates',
        'Community access',
      ],
      deliveryTime: 'Instant download',
      details:
        'A comprehensive guide that takes you from beginner to advanced web developer. Includes practical projects, real-world examples, and everything you need to build modern web applications. Perfect for self-learners and bootcamp students.',
      samplePages: [
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      ],
      pageDescriptions: [
        'Chapter 1: Introduction to Modern Web Development',
        'Chapter 3: Building Your First React Application',
        'Chapter 7: Advanced CSS Techniques for Professional Designs',
      ],
    },
    {
      id: 7,
      title: "Freelancer's Business Guide",
      category: 'ebook',
      price: '$29',
      gumroadUrl: 'https://gumroad.com/l/freelancer-guide',
      image:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description:
        'Complete guide to building a successful freelance business with proven strategies and templates.',
      technologies: ['PDF', 'Templates', 'Worksheets'],
      features: [
        '200+ pages of strategies',
        'Client acquisition methods',
        'Pricing strategies',
        'Contract templates',
        'Invoice templates',
        'Project management tips',
        'Marketing strategies',
        'Tax & legal guidance',
        'Bonus worksheets',
      ],
      deliveryTime: 'Instant download',
      details:
        'Everything you need to build a thriving freelance business. From finding your first client to scaling your operations, this guide covers all aspects of freelancing with practical templates and proven strategies.',
      samplePages: [
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      ],
      pageDescriptions: [
        'Chapter 2: Finding Your First Clients',
        'Chapter 5: Setting Rates That Reflect Your Value',
        'Chapter 8: Creating Professional Contracts and Agreements',
      ],
    },
    {
      id: 8,
      title: 'Design Systems Handbook',
      category: 'ebook',
      price: '$39',
      gumroadUrl: 'https://gumroad.com/l/design-systems',
      image:
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description:
        'Master the art of creating scalable design systems for modern digital products.',
      technologies: ['PDF', 'Figma Templates', 'Code Examples'],
      features: [
        '250+ pages of content',
        'Design system templates',
        'Component libraries',
        'Documentation examples',
        'Implementation guides',
        'Case studies',
        'Figma resources',
        'Code snippets',
        'Industry best practices',
      ],
      deliveryTime: 'Instant download',
      details:
        'Learn how to create, implement, and maintain design systems that scale. Includes templates, examples, and best practices from leading companies. Essential for designers and developers working on digital products.',
      samplePages: [
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80',
        'https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      ],
      pageDescriptions: [
        'Chapter 1: Introduction to Design Systems',
        'Chapter 4: Building a Component Library',
        'Chapter 9: Maintaining and Evolving Your Design System',
      ],
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? products
      : products.filter((product) => product.category === activeFilter);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'design', label: 'Design' },
    { id: 'ebook', label: 'eBook' },
  ];

  const openModal = (product) => {
    setSelectedProject(product);
    setCurrentImageIndex(0);
    setCurrentPageIndex(0);
    setIsZoomed(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsZoomed(false);
  };

  const handlePurchase = (product) => {
    // Direct redirect to Gumroad for instant purchase (same tab)
    window.location.href = product.gumroadUrl;
  };

  const handlePurchaseClick = (product) => {
    setPurchaseProduct(product);
    setShowPurchaseConfirm(true);
  };

  const confirmPurchase = () => {
    if (purchaseProduct) {
      window.location.href = purchaseProduct.gumroadUrl;
    }
  };

  const cancelPurchase = () => {
    setShowPurchaseConfirm(false);
    setPurchaseProduct(null);
  };

  const handleLivePreview = (url) => {
    window.open(url, '_blank');
  };

  const handleNextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextPage = () => {
    if (selectedProject && selectedProject.samplePages) {
      setCurrentPageIndex((prev) =>
        prev === selectedProject.samplePages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevPage = () => {
    if (selectedProject && selectedProject.samplePages) {
      setCurrentPageIndex((prev) =>
        prev === 0 ? selectedProject.samplePages.length - 1 : prev - 1
      );
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Render modal content based on product category
  const renderModalContent = () => {
    if (!selectedProject) return null;

    switch (selectedProject.category) {
      case 'web':
        return (
          <div className="modal-content">
            <div className="modal-image">
              <img
                src={selectedProject.image || '/placeholder.svg'}
                alt={selectedProject.title}
              />
              <div className="modal-price-badge">{selectedProject.price}</div>
            </div>

            <div className="modal-details">
              <div className="modal-header">
                <h3>{selectedProject.title}</h3>
                <div className="modal-delivery">
                  <span>⏱️ {selectedProject.deliveryTime}</span>
                </div>
              </div>

              <p className="modal-description">{selectedProject.details}</p>

              <div className="modal-features">
                <h4>What's Included:</h4>
                <ul className="features-list">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-tech">
                <h4>Technologies Used:</h4>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.livePreviewUrl && (
                <div className="live-preview-section">
                  <button
                    className="btn preview-btn"
                    onClick={() =>
                      handleLivePreview(selectedProject.livePreviewUrl)
                    }
                  >
                    <span>🔍</span> Live Preview
                  </button>
                  <p className="preview-note">
                    Check out the live demo to see this project in action
                  </p>
                </div>
              )}

              <div className="purchase-section">
                <div className="purchase-price">
                  <span className="price-label">Price:</span>
                  <span className="price-value">{selectedProject.price}</span>
                </div>

                <div className="purchase-buttons">
                  <button
                    className="btn hover-target purchase-btn"
                    onClick={() => handlePurchaseClick(selectedProject)}
                  >
                    <span>🛒</span>
                    Buy Now on Gumroad
                  </button>
                </div>

                <div className="purchase-info">
                  <p>✅ Instant download after purchase</p>
                  <p>🔒 Secure payment via Gumroad</p>
                  <p>💳 Accepts all major payment methods</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="modal-content">
            <div className={`modal-image-gallery ${isZoomed ? 'zoomed' : ''}`}>
              <div className="gallery-container" onClick={toggleZoom}>
                {selectedProject.images && (
                  <img
                    src={
                      selectedProject.images[currentImageIndex] ||
                      '/placeholder.svg'
                    }
                    alt={`${selectedProject.title} - Image ${
                      currentImageIndex + 1
                    }`}
                    className={isZoomed ? 'zoomed-image' : ''}
                  />
                )}
                <div className="zoom-indicator">
                  <span>
                    {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
                  </span>
                </div>
              </div>

              <div className="gallery-navigation">
                <button
                  className="gallery-nav-btn prev"
                  onClick={handlePrevImage}
                >
                  ←
                </button>
                <div className="gallery-indicator">
                  {currentImageIndex + 1} /{' '}
                  {selectedProject.images?.length || 1}
                </div>
                <button
                  className="gallery-nav-btn next"
                  onClick={handleNextImage}
                >
                  →
                </button>
              </div>

              <div className="gallery-thumbnails">
                {selectedProject.images?.map((img, idx) => (
                  <div
                    key={idx}
                    className={`gallery-thumbnail ${
                      idx === currentImageIndex ? 'active' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img
                      src={img || '/placeholder.svg'}
                      alt={`Thumbnail ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="modal-price-badge">{selectedProject.price}</div>
            </div>

            <div className="modal-details">
              <div className="modal-header">
                <h3>{selectedProject.title}</h3>
                <div className="modal-delivery">
                  <span>⏱️ {selectedProject.deliveryTime}</span>
                </div>
              </div>

              <p className="modal-description">{selectedProject.details}</p>

              <div className="modal-features">
                <h4>What's Included:</h4>
                <ul className="features-list">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-tech">
                <h4>Technologies Used:</h4>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="purchase-section">
                <div className="purchase-price">
                  <span className="price-label">Price:</span>
                  <span className="price-value">{selectedProject.price}</span>
                </div>

                <div className="purchase-buttons">
                  <button
                    className="btn hover-target purchase-btn"
                    onClick={() => handlePurchaseClick(selectedProject)}
                  >
                    <span>🛒</span>
                    Buy Now on Gumroad
                  </button>
                </div>

                <div className="purchase-info">
                  <p>✅ Instant download after purchase</p>
                  <p>🔒 Secure payment via Gumroad</p>
                  <p>💳 Accepts all major payment methods</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ebook':
        return (
          <div className="modal-content">
            <div className="ebook-preview">
              <div className="ebook-page-container">
                {selectedProject.samplePages && (
                  <>
                    <img
                      src={
                        selectedProject.samplePages[currentPageIndex] ||
                        '/placeholder.svg'
                      }
                      alt={`Sample page ${currentPageIndex + 1}`}
                      className="ebook-page"
                    />
                    <div className="page-description">
                      {selectedProject.pageDescriptions?.[currentPageIndex]}
                    </div>
                  </>
                )}
              </div>

              <div className="ebook-navigation">
                <button className="ebook-nav-btn prev" onClick={handlePrevPage}>
                  ← Previous Page
                </button>
                <div className="ebook-indicator">
                  Page {currentPageIndex + 1} of{' '}
                  {selectedProject.samplePages?.length || 1}
                </div>
                <button className="ebook-nav-btn next" onClick={handleNextPage}>
                  Next Page →
                </button>
              </div>

              <div className="modal-price-badge">{selectedProject.price}</div>
            </div>

            <div className="modal-details">
              <div className="modal-header">
                <h3>{selectedProject.title}</h3>
                <div className="modal-delivery">
                  <span>⏱️ {selectedProject.deliveryTime}</span>
                </div>
              </div>

              <p className="modal-description">{selectedProject.details}</p>

              <div className="modal-features">
                <h4>What's Included:</h4>
                <ul className="features-list">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-tech">
                <h4>Available Formats:</h4>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="purchase-section">
                <div className="purchase-price">
                  <span className="price-label">Price:</span>
                  <span className="price-value">{selectedProject.price}</span>
                </div>

                <div className="purchase-buttons">
                  <button
                    className="btn hover-target purchase-btn"
                    onClick={() => handlePurchaseClick(selectedProject)}
                  >
                    <span>🛒</span>
                    Buy Now on Gumroad
                  </button>
                </div>

                <div className="purchase-info">
                  <p>✅ Instant download after purchase</p>
                  <p>🔒 Secure payment via Gumroad</p>
                  <p>💳 Accepts all major payment methods</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="work">
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          My Store
        </motion.h2>

        <div className="filters">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`filter-btn hover-target ${
                activeFilter === filter.id ? 'active' : ''
              }`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>

        <div className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((product, index) => (
              <motion.div
                key={product.id}
                className="project-card hover-target"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                custom={index}
                layout
                onMouseEnter={() => setHoveredProject(product.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-image-container">
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.title}
                    className="project-image"
                  />

                  <div className="price-badge">{product.price}</div>

                  <motion.div
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === product.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="overlay-buttons">
                      <motion.button
                        className="btn hover-target"
                        onClick={() => openModal(product)}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredProject === product.id ? 0 : 20,
                          opacity: hoveredProject === product.id ? 1 : 0,
                        }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>

                      <motion.button
                        className="btn btn-outline hover-target"
                        onClick={() => handlePurchaseClick(product)}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredProject === product.id ? 0 : 20,
                          opacity: hoveredProject === product.id ? 1 : 0,
                        }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                <div className="project-info">
                  <div className="product-header">
                    <h3>{product.title}</h3>
                    <span className="product-price">{product.price}</span>
                  </div>
                  <p>{product.description}</p>

                  <div className="delivery-info">
                    <span className="delivery-time">
                      ⏱️ {product.deliveryTime}
                    </span>
                  </div>

                  <div className="project-tech">
                    {product.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {product.technologies.length > 3 && (
                      <span className="tech-tag">
                        +{product.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={`modal ${selectedProject.category}-modal`}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close hover-target" onClick={closeModal}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {renderModalContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase Confirmation Modal */}
      <AnimatePresence>
        {showPurchaseConfirm && purchaseProduct && (
          <motion.div
            className="modal-overlay purchase-confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cancelPurchase}
          >
            <motion.div
              className="purchase-confirm-modal"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="gumroad-header">
                <div className="gumroad-logo">
                  <span className="gumroad-icon">🛒</span>
                  <span className="gumroad-text">Powered by Gumroad</span>
                </div>
                <button className="modal-close" onClick={cancelPurchase}>
                  ×
                </button>
              </div>

              <div className="purchase-confirm-content">
                <div className="product-summary">
                  <img
                    src={purchaseProduct.image || '/placeholder.svg'}
                    alt={purchaseProduct.title}
                    className="summary-image"
                  />
                  <div className="summary-details">
                    <h3>{purchaseProduct.title}</h3>
                    <p className="summary-price">{purchaseProduct.price}</p>
                  </div>
                </div>

                <div className="gumroad-benefits">
                  <h4>Why choose Gumroad?</h4>
                  <div className="benefits-grid">
                    <div className="benefit-item">
                      <span className="benefit-icon">⚡</span>
                      <span>Instant Download</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">🔒</span>
                      <span>Secure Payment</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">💳</span>
                      <span>All Payment Methods</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">📧</span>
                      <span>Email Receipt</span>
                    </div>
                  </div>
                </div>

                <div className="purchase-actions">
                  <button
                    className="gumroad-btn primary"
                    onClick={confirmPurchase}
                  >
                    <span className="btn-icon">🛒</span>
                    Continue to Gumroad
                  </button>
                  <button
                    className="gumroad-btn secondary"
                    onClick={cancelPurchase}
                  >
                    Cancel
                  </button>
                </div>

                <p className="gumroad-disclaimer">
                  You'll be redirected to Gumroad's secure checkout page
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Work;
