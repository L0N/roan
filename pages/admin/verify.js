import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/common/Layout';

export default function AdminVerify() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Store token in localStorage for admin dashboard access
        localStorage.setItem('admin-token', data.token);
        
        // Redirect to admin dashboard after 2 seconds
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 2000);
      } else {
        setError(data.error || 'Invalid or expired token');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Verifying Login - RoanPaul Photography Admin"
      description="Verifying admin login token"
    >
      <div className="verify-page">
        <div className="verify-container">
          <div className="verify-card">
            {loading && (
              <div className="loading-state">
                <div className="spinner-large"></div>
                <h2>Verifying your login...</h2>
                <p>Please wait while we authenticate your access.</p>
              </div>
            )}

            {success && (
              <div className="success-state">
                <div className="success-icon">✅</div>
                <h2>Login Successful!</h2>
                <p>Welcome to the admin dashboard.</p>
                <p className="redirect-note">
                  Redirecting you to the dashboard...
                </p>
              </div>
            )}

            {error && (
              <div className="error-state">
                <div className="error-icon">❌</div>
                <h2>Verification Failed</h2>
                <p>{error}</p>
                <div className="error-actions">
                  <a href="/admin/login" className="btn btn-primary">
                    Request New Login Link
                  </a>
                  <a href="/" className="btn btn-secondary">
                    Back to Website
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .verify-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .verify-container {
          width: 100%;
          max-width: 500px;
        }
        
        .verify-card {
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-heavy);
          padding: 3rem;
          text-align: center;
        }
        
        .loading-state,
        .success-state,
        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .spinner-large {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          border-top-color: var(--accent-color);
          animation: spin 1s ease-in-out infinite;
        }
        
        .success-icon,
        .error-icon {
          font-size: 4rem;
        }
        
        .loading-state h2,
        .success-state h2,
        .error-state h2 {
          font-size: 2rem;
          color: var(--text-primary);
          margin: 0;
        }
        
        .loading-state p,
        .success-state p,
        .error-state p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin: 0;
        }
        
        .redirect-note {
          font-style: italic;
          color: var(--accent-color);
        }
        
        .error-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .verify-page {
            padding: 1rem;
          }
          
          .verify-card {
            padding: 2rem;
          }
          
          .error-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  );
}

