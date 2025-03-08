// Utility function to lazy load images
export const lazyLoadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(src)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
  })
}

// Utility function to check if element is in viewport
export const isInViewport = (element, offset = 0) => {
  if (!element) return false

  const rect = element.getBoundingClientRect()
  return (
    rect.top <= window.innerHeight + offset &&
    rect.bottom >= -offset &&
    rect.left <= window.innerWidth + offset &&
    rect.right >= -offset
  )
}

// Utility function to throttle function calls
export const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Utility function to debounce function calls
export const debounce = (func, wait) => {
  let timeout
  return function () {
    
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

