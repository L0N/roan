import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/common/Layout';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail('');
      } else {
        setError(data.error || 'Failed to send login link');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Admin Login - RoanPaul Photography"
      description="Admin login for RoanPaul Photography portfolio management"
    >
      <div className="admin-login-page">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1 className="login-title">Admin Login</h1>
              <p className="login-subtitle">
                Enter your email to receive a secure login link
              </p>
            </div>

            {message && (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <div>
                  <h3>Login Link Sent!</h3>
                  <p>{message}</p>
                  <p className="message-note">
                    Check your email and click the link to access the admin dashboard.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                <div className="error-icon">❌</div>
                <div>
                  <h3>Error</h3>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="admin@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large login-button"
                disabled={loading || !email}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Sending Login Link...
                  </>
                ) : (
                  'Send Login Link'
                )}
              </button>
            </form>

            <div className="login-info">
              <h3 className="info-title">How it works:</h3>
              <ol className="info-list">
                <li>Enter your admin email address</li>
                <li>Check your email for the secure login link</li>
                <li>Click the link to access the admin dashboard</li>
                <li>The link expires in 1 hour for security</li>
              </ol>
            </div>

            <div className="login-footer">
              <p>
                <a href="/" className="back-link">
                  ← Back to Website
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .login-container {
          width: 100%;
          max-width: 500px;
        }
        
        .login-card {
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-heavy);
          padding: 3rem;
        }
        
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .login-title {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .login-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        
        .success-message,
        .error-message {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: var(--border-radius);
          margin-bottom: 2rem;
        }
        
        .success-message {
          background: #d4edda;
          border: 1px solid #c3e6cb;
          color: #155724;
        }
        
        .error-message {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }
        
        .success-icon,
        .error-icon {
          font-size: 1.5rem;
          margin-top: 0.25rem;
        }
        
        .message-note {
          font-size: 0.9rem;
          margin-top: 0.5rem;
          opacity: 0.8;
        }
        
        .login-form {
          margin-bottom: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .login-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .login-info {
          background: var(--secondary-color);
          padding: 1.5rem;
          border-radius: var(--border-radius);
          margin-bottom: 2rem;
        }
        
        .info-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .info-list {
          color: var(--text-secondary);
          padding-left: 1.5rem;
        }
        
        .info-list li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        
        .login-footer {
          text-align: center;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }
        
        .back-link {
          color: var(--accent-color);
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition);
        }
        
        .back-link:hover {
          color: var(--accent-hover);
        }
        
        @media (max-width: 768px) {
          .admin-login-page {
            padding: 1rem;
          }
          
          .login-card {
            padding: 2rem;
          }
          
          .login-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
}

