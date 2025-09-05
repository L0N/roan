/**
 * Validation utilities for form inputs and API data
 */

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (optional, flexible format)
 */
export function isValidPhone(phone) {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Sanitize string input
 */
export function sanitizeString(str, maxLength = 1000) {
  if (typeof str !== 'string') return '';
  return str.trim().substring(0, maxLength);
}

/**
 * Validate photo upload data
 */
export function validatePhotoData(data) {
  const errors = [];
  
  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (data.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }
  
  if (!data.altText || data.altText.trim().length === 0) {
    errors.push('Alt text is required for accessibility');
  } else if (data.altText.length > 200) {
    errors.push('Alt text must be less than 200 characters');
  }
  
  if (data.categories && !Array.isArray(data.categories)) {
    errors.push('Categories must be an array');
  }
  
  if (data.metadata) {
    if (data.metadata.iso && (data.metadata.iso < 50 || data.metadata.iso > 102400)) {
      errors.push('ISO must be between 50 and 102400');
    }
    
    if (data.metadata.description && data.metadata.description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }
    
    if (data.metadata.location && data.metadata.location.length > 200) {
      errors.push('Location must be less than 200 characters');
    }
  }
  
  return errors;
}

/**
 * Validate album data
 */
export function validateAlbumData(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Album name is required');
  } else if (data.name.length > 100) {
    errors.push('Album name must be less than 100 characters');
  }
  
  if (data.description && data.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }
  
  return errors;
}

/**
 * Validate contact form data
 */
export function validateContactForm(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.subject || data.subject.trim().length === 0) {
    errors.push('Subject is required');
  } else if (data.subject.length > 200) {
    errors.push('Subject must be less than 200 characters');
  }
  
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  } else if (data.message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }
  
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Invalid phone number format');
  }
  
  // Honeypot check
  if (data.website && data.website.trim().length > 0) {
    errors.push('Spam detected');
  }
  
  return errors;
}

/**
 * Validate file upload
 */
export function validateImageFile(file) {
  const errors = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!file) {
    errors.push('File is required');
    return errors;
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('Only JPEG, PNG, and WebP images are allowed');
  }
  
  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }
  
  return errors;
}

/**
 * Rate limiting helper
 */
export function createRateLimiter(windowMs = 15 * 60 * 1000, maxRequests = 100) {
  const requests = new Map();
  
  return (identifier) => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    for (const [key, timestamps] of requests.entries()) {
      const validTimestamps = timestamps.filter(time => time > windowStart);
      if (validTimestamps.length === 0) {
        requests.delete(key);
      } else {
        requests.set(key, validTimestamps);
      }
    }
    
    // Check current identifier
    const userRequests = requests.get(identifier) || [];
    const recentRequests = userRequests.filter(time => time > windowStart);
    
    if (recentRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    // Add current request
    recentRequests.push(now);
    requests.set(identifier, recentRequests);
    
    return true; // Request allowed
  };
}

/**
 * Generate SEO-friendly slug
 */
export function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

