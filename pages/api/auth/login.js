import connectDB from '../../../lib/db/mongodb';
import User from '../../../models/User';
import { generateMagicLinkToken } from '../../../lib/auth/jwt';
import { sendMagicLinkEmail } from '../../../lib/email/sendgrid';
import { isValidEmail, createRateLimiter } from '../../../utils/validation';

// Rate limiter: 5 requests per 15 minutes per IP
const rateLimiter = createRateLimiter(15 * 60 * 1000, 5);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!rateLimiter(clientIP)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const { email } = req.body;

    // Validate input
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({ 
        message: 'If an account with this email exists, a login link has been sent.' 
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({ 
        error: 'Account is temporarily locked due to too many failed attempts. Please try again later.' 
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Generate magic link token
    const token = generateMagicLinkToken();
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Update user with token
    await User.findByIdAndUpdate(user._id, {
      magicLinkToken: token,
      tokenExpiry: tokenExpiry,
    });

    // Send magic link email
    await sendMagicLinkEmail(email, token);

    res.status(200).json({ 
      message: 'Login link has been sent to your email address.' 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

