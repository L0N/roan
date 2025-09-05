import connectDB from '../../../lib/db/mongodb';
import User from '../../../models/User';
import { generateToken } from '../../../lib/auth/jwt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Connect to database
    await connectDB();

    // Find user with valid token
    const user = await User.findOne({
      magicLinkToken: token,
      tokenExpiry: { $gt: new Date() },
      isActive: true,
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({ 
        error: 'Account is temporarily locked. Please try again later.' 
      });
    }

    // Clear magic link token and reset login attempts
    await user.resetLoginAttempts();
    await User.findByIdAndUpdate(user._id, {
      $unset: { magicLinkToken: 1, tokenExpiry: 1 },
    });

    // Generate JWT token
    const jwtToken = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', [
      `auth-token=${jwtToken}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`,
    ]);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token: jwtToken,
    });

  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

