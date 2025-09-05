import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Layout from '../components/common/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '', // Honeypot field
  });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          website: '',
        });
        setRecaptchaToken('');
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Contact RoanPaul Photography - Get In Touch"
      description="Ready to capture your special moments? Contact RoanPaul Photography to discuss your photography needs and book your session."
      url="/contact"
    >
      <div className="contact-page">
        {/* Header */}
        <section className="contact-header">
          <div className="container">
            <h1 className="contact-title">Get In Touch</h1>
            <p className="contact-description">
              Ready to capture your special moments? I'd love to hear about your 
              photography needs and discuss how we can bring your vision to life.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section contact-content">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Information */}
              <div className="contact-info">
                <h2 className="info-title">Let's Connect</h2>
                <p className="info-description">
                  I believe every project is unique and deserves personalized attention. 
                  Whether you're planning a wedding, need professional headshots, or want 
                  to capture family memories, I'm here to help make it happen.
                </p>

                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon">📧</div>
                    <div className="method-details">
                      <h3 className="method-title">Email</h3>
                      <p className="method-value">contact@roanpaul.com</p>
                      <p className="method-note">I typically respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">📱</div>
                    <div className="method-details">
                      <h3 className="method-title">Phone</h3>
                      <p className="method-value">Available upon request</p>
                      <p className="method-note">For urgent inquiries</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">📍</div>
                    <div className="method-details">
                      <h3 className="method-title">Location</h3>
                      <p className="method-value">Available for travel</p>
                      <p className="method-note">Local and destination photography</p>
                    </div>
                  </div>
                </div>

                <div className="response-time">
                  <h3 className="response-title">What to Expect</h3>
                  <ul className="response-list">
                    <li>Personal response within 24-48 hours</li>
                    <li>Free consultation to discuss your needs</li>
                    <li>Custom quote based on your requirements</li>
                    <li>Flexible scheduling to fit your timeline</li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h2 className="form-title">Send Me a Message</h2>
                  
                  {success && (
                    <div className="form-success-message">
                      <div className="success-icon">✅</div>
                      <div>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for reaching out. I'll get back to you soon.</p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="form-error-message">
                      <div className="error-icon">❌</div>
                      <div>
                        <h3>Error</h3>
                        <p>{error}</p>
                      </div>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                        disabled={loading}
                      >
                        <option value="">Select a subject</option>
                        <option value="Wedding Photography">Wedding Photography</option>
                        <option value="Portrait Session">Portrait Session</option>
                        <option value="Event Photography">Event Photography</option>
                        <option value="Corporate Photography">Corporate Photography</option>
                        <option value="Fine Art Photography">Fine Art Photography</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      rows="6"
                      placeholder="Tell me about your photography needs, event details, preferred dates, or any questions you have..."
                      required
                      disabled={loading}
                    ></textarea>
                  </div>

                  {/* Honeypot field (hidden) */}
                  <div className="honeypot">
                    <label htmlFor="website">Website (leave blank)</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  {/* reCAPTCHA */}
                  {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                    <div className="recaptcha-container">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={handleRecaptchaChange}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary btn-large form-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Sending Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                  <p className="form-note">
                    * Required fields. Your information will be kept confidential 
                    and used only to respond to your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section faq">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3 className="faq-question">How far in advance should I book?</h3>
                <p className="faq-answer">
                  For weddings and major events, I recommend booking 6-12 months in advance. 
                  For portraits and smaller sessions, 2-4 weeks is usually sufficient.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">Do you travel for photography sessions?</h3>
                <p className="faq-answer">
                  Yes! I'm available for local and destination photography. Travel fees 
                  may apply for locations outside my immediate area.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">How long until I receive my photos?</h3>
                <p className="faq-answer">
                  Turnaround time varies by project type. Portrait sessions are typically 
                  ready in 1-2 weeks, while weddings may take 4-6 weeks for full delivery.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">What's included in your packages?</h3>
                <p className="faq-answer">
                  Each package is customized to your needs. Generally includes the photography 
                  session, professional editing, and digital delivery. Print options available.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
        }
        
        .contact-header {
          background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          padding: 3rem 0;
          text-align: center;
        }
        
        .contact-title {
          font-size: 3rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .contact-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .contact-content {
          background: white;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .contact-info {
          order: 2;
        }
        
        .info-title {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .info-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .contact-methods {
          margin-bottom: 3rem;
        }
        
        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: var(--secondary-color);
          border-radius: var(--border-radius);
        }
        
        .method-icon {
          font-size: 2rem;
          min-width: 50px;
        }
        
        .method-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .method-value {
          font-weight: 600;
          color: var(--accent-color);
          margin-bottom: 0.25rem;
        }
        
        .method-note {
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .response-time {
          background: var(--secondary-color);
          padding: 2rem;
          border-radius: var(--border-radius);
        }
        
        .response-title {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .response-list {
          list-style: none;
        }
        
        .response-list li {
          padding: 0.5rem 0;
          color: var(--text-secondary);
          position: relative;
          padding-left: 1.5rem;
        }
        
        .response-list li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-color);
          font-weight: bold;
        }
        
        .contact-form-container {
          order: 1;
        }
        
        .contact-form {
          background: var(--secondary-color);
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-light);
        }
        
        .form-title {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .form-success-message,
        .form-error-message {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: var(--border-radius);
          margin-bottom: 2rem;
        }
        
        .form-success-message {
          background: #d4edda;
          border: 1px solid #c3e6cb;
          color: #155724;
        }
        
        .form-error-message {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }
        
        .success-icon,
        .error-icon {
          font-size: 1.5rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .honeypot {
          position: absolute;
          left: -9999px;
          opacity: 0;
          pointer-events: none;
        }
        
        .recaptcha-container {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
        }
        
        .form-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .form-note {
          font-size: 0.9rem;
          color: var(--text-light);
          text-align: center;
          margin-top: 1rem;
        }
        
        .faq {
          background: var(--secondary-color);
        }
        
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .faq-item {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-light);
        }
        
        .faq-question {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .faq-answer {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .contact-info {
            order: 1;
          }
          
          .contact-form-container {
            order: 2;
          }
          
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (min-width: 1024px) {
          .contact-title {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}

