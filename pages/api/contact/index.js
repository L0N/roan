import { sendContactFormEmail, sendContactAutoReply } from '../../../lib/email/sendgrid';
import { validateContactForm, createRateLimiter } from '../../../utils/validation';

// Rate limiter: 3 submissions per 15 minutes per IP
const rateLimiter = createRateLimiter(15 * 60 * 1000, 3);

/**
 * Verify reCAPTCHA token
 */
async function verifyRecaptcha(token) {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('reCAPTCHA secret key not configured');
    return true; // Skip verification if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score > 0.5; // Adjust score threshold as needed
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!rateLimiter(clientIP)) {
      return res.status(429).json({ 
        error: 'Too many contact form submissions. Please try again later.' 
      });
    }

    const { name, email, phone, subject, message, website, recaptchaToken } = req.body;

    // Validate form data
    const formData = { name, email, phone, subject, message, website };
    const validationErrors = validateContactForm(formData);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors.join(', ') });
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        return res.status(400).json({ error: 'reCAPTCHA verification failed' });
      }
    }

    // Additional spam checks
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations'];
    const messageText = `${subject} ${message}`.toLowerCase();
    const hasSpamKeywords = spamKeywords.some(keyword => messageText.includes(keyword));
    
    if (hasSpamKeywords) {
      return res.status(400).json({ error: 'Message contains prohibited content' });
    }

    // Send email to admin
    await sendContactFormEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // Send auto-reply to user (don't fail if this fails)
    try {
      await sendContactAutoReply(email.trim().toLowerCase(), name.trim());
    } catch (autoReplyError) {
      console.error('Auto-reply failed:', autoReplyError);
      // Continue without failing the main request
    }

    res.status(200).json({ 
      message: 'Thank you for your message! I will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
}

