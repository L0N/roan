export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Clear the auth cookie
    res.setHeader('Set-Cookie', [
      `auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`,
    ]);

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

