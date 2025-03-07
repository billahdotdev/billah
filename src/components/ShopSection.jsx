"use client"

import { useState, useEffect, useRef } from "react"
import "../styles/ShopSection.css"

const ShopSection = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const categoriesRef = useRef(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  const categories = [
    { id: "all", name: "All Items" },
    { id: "websites", name: "Websites" },
    { id: "designs", name: "Designs" },
    { id: "gadgets", name: "Gadgets" },
    { id: "tshirts", name: "Programming T-Shirts" },
  ]

  const products = [
    {
      id: 1,
      title: "Portfolio Website",
      price: 299,
      category: "websites",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
      badge: "Bestseller",
      description: "Custom portfolio website with responsive design and modern aesthetics.",
      github: "https://github.com/billahdotdev/portfolio-template",
    },
    {
      id: 2,
      title: "E-commerce Store",
      price: 499,
      category: "websites",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
      description: "Complete online store with payment processing and inventory management.",
      github: "https://github.com/billahdotdev/ecommerce-template",
    },
    {
      id: 3,
      title: "Logo Design",
      price: 99,
      category: "designs",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
      badge: "Popular",
      description: "Professional logo design with unlimited revisions and source files.",
    },
    {
      id: 4,
      title: "Brand Identity",
      price: 199,
      category: "designs",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2070&auto=format&fit=crop",
      description: "Complete brand identity package including logo, colors, and typography.",
    },
    {
      id: 5,
      title: "Mechanical Keyboard",
      price: 129,
      category: "gadgets",
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2080&auto=format&fit=crop",
      badge: "New",
      description: "RGB backlit mechanical keyboard with customizable switches.",
    },
    {
      id: 6,
      title: "Wireless Mouse",
      price: 49,
      category: "gadgets",
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=2065&auto=format&fit=crop",
      description: "Ergonomic wireless mouse with long battery life and precision tracking.",
    },
    {
      id: 7,
      title: "Code Ninja T-Shirt",
      price: 29,
      category: "tshirts",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2071&auto=format&fit=crop",
      badge: "Cute",
      description: "Soft cotton t-shirt with cute code ninja design.",
    },
    {
      id: 8,
      title: "CSS Pun T-Shirt",
      price: 29,
      category: "tshirts",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2064&auto=format&fit=crop",
      description: "Funny CSS pun t-shirt for web developers.",
    },
    // Custom solution cards - these will only show in their specific categories
    {
      id: 9,
      title: "Need a custom website?",
      category: "websites",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
      description: "Let's discuss your specific requirements and create a tailored solution just for you.",
      isCustomSolution: true,
      badge: "Custom",
    },
    {
      id: 10,
      title: "Need a custom design?",
      category: "designs",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
      description: "Have a unique design idea? Let's bring your vision to life with a personalized approach.",
      isCustomSolution: true,
      badge: "Custom",
    },
    {
      id: 11,
      title: "Custom T-Shirt Design?",
      category: "tshirts",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=2127&auto=format&fit=crop",
      description: "Want your own programming-themed t-shirt design? Let's create something unique together.",
      isCustomSolution: true,
      badge: "Custom",
    },
  ]

  // Check if categories container is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (categoriesRef.current) {
        const { scrollWidth, clientWidth } = categoriesRef.current
        setShowScrollIndicator(scrollWidth > clientWidth)
      }
    }

    checkScrollable()
    window.addEventListener("resize", checkScrollable)

    return () => {
      window.removeEventListener("resize", checkScrollable)
    }
  }, [])

  // Filter products based on active category, excluding custom solution cards from "All Items" view
  const filteredProducts =
    activeCategory === "all"
      ? products.filter((product) => !product.isCustomSolution)
      : products.filter((product) => product.category === activeCategory)

  const handleWhatsAppInquiry = (product) => {
    const message = product.isCustomSolution
      ? `Hi, I'm interested in discussing a custom ${product.category === "tshirts" ? "t-shirt design" : product.category === "websites" ? "website" : "design"}. Can we chat about my requirements?`
      : `Hi, I'm interested in the ${product.title} for $${product.price}. Can you provide more information?`

    const whatsappUrl = `https://wa.me/8801713401889?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  const handleDemoClick = (github) => {
    window.open(github, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container">
      <h2 className="section-title" id="shop-heading">
        Shop
      </h2>

      <div className="shop-intro neomorphic">
        <p>
          Browse my collection of digital products and merchandise. From custom websites and designs to
          programmer-friendly gadgets and apparel, there's something for every tech enthusiast.
        </p>
      </div>

      <div
        className={`shop-categories ${showScrollIndicator ? "has-more" : ""}`}
        ref={categoriesRef}
        role="tablist"
        aria-label="Product categories"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button neomorphic ${activeCategory === category.id ? "active" : ""}`}
            onClick={() => setActiveCategory(category.id)}
            aria-pressed={activeCategory === category.id}
            role="tab"
            aria-selected={activeCategory === category.id}
            id={`tab-${category.id}`}
            aria-controls={`panel-${category.id}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div
        className="products-grid"
        role="tabpanel"
        id={`panel-${activeCategory}`}
        aria-labelledby={`tab-${activeCategory}`}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card neomorphic"
            data-custom={product.isCustomSolution ? "true" : "false"}
          >
            <div className="product-image">
              <img src={product.image || "/placeholder.svg"} alt={`${product.title} product image`} loading="lazy" />
              {product.badge && <span className="product-badge">{product.badge}</span>}
            </div>
            <div className="product-content">
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>

              {!product.isCustomSolution && (
                <div className="product-price" aria-label={`Price: ${product.price} dollars`}>
                  ${product.price}
                </div>
              )}

              <div
                className={`product-buttons ${product.category === "websites" && !product.isCustomSolution ? "two-buttons" : ""}`}
              >
                {product.isCustomSolution ? (
                  <button
                    className="neomorphic-button product-button full-width"
                    onClick={() => handleWhatsAppInquiry(product)}
                    aria-label={`Contact about custom ${product.category}`}
                  >
                    <span className="whatsapp-icon" aria-hidden="true"></span>
                    Let's Talk
                  </button>
                ) : (
                  <>
                    <button
                      className="neomorphic-button product-button"
                      onClick={() => handleWhatsAppInquiry(product)}
                      aria-label={`Inquire about ${product.title}`}
                    >
                      <span className="whatsapp-icon" aria-hidden="true"></span>
                      Inquire
                    </button>

                    {/* Only show Demo button for website category */}
                    {product.category === "websites" && (
                      <button
                        className="neomorphic-button product-button demo-button"
                        onClick={() => handleDemoClick(product.github)}
                        aria-label={`View demo for ${product.title}`}
                      >
                        <span className="github-icon" aria-hidden="true"></span>
                        Demo
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="shop-cta neomorphic">
        <h3>Looking for something custom?</h3>
        <p>
          Can't find exactly what you're looking for? I offer custom solutions tailored to your specific needs. Let's
          chat about your project and create something amazing together!
        </p>
        <button
          onClick={() => {
            const message = "Hi, I'm interested in discussing a custom project. Can we chat?"
            const whatsappUrl = `https://wa.me/8801713401889?text=${encodeURIComponent(message)}`
            window.open(whatsappUrl, "_blank", "noopener,noreferrer")
          }}
          className="neomorphic-button whatsapp-button"
          aria-label="Contact about custom project"
        >
          <span className="whatsapp-icon" aria-hidden="true"></span>
          Let's Create Together
        </button>
      </div>
    </div>
  )
}

export default ShopSection

