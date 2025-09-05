# RoanPaul Photography & Arts

A professional photography portfolio website built with Next.js, featuring a complete admin dashboard, gallery management, and contact system.

## 🌟 Features

### Public Features
- **Responsive Homepage** with featured photography showcase
- **Dynamic Gallery** with category filtering and lightbox viewing
- **About Page** with photographer biography and services
- **Contact Form** with spam protection (reCAPTCHA + honeypot)
- **SEO Optimized** with meta tags, structured data, and sitemap
- **Mobile-First Design** with retro Nikon-inspired styling

### Admin Features
- **Magic Link Authentication** (passwordless login)
- **Photo Upload & Management** with Cloudinary integration
- **Automatic Image Optimization** (WebP conversion, watermarking)
- **Album & Category Management**
- **Featured Photos Selection**
- **Metadata Management** (EXIF data, descriptions, locations)

### Technical Features
- **Next.js 14** with API routes
- **MongoDB Atlas** database integration
- **Cloudinary** for image storage and optimization
- **SendGrid** for email notifications
- **Google Analytics** integration (optional)
- **Security Features** (rate limiting, input validation, CSRF protection)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Cloudinary account
- SendGrid account
- Vercel account (for deployment)

### 1. Clone and Install

```bash
git clone <repository-url>
cd roanpaul-photography
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roanpaul_photography

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_EMAIL=admin@yourdomain.com

# reCAPTCHA (optional)
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Database Setup

The application will automatically create the necessary collections when you first run it. To create an admin user:

1. Start the development server: `npm run dev`
2. Go to `/admin/login`
3. Enter your admin email (must match `ADMIN_EMAIL` in env)
4. Check your email for the magic link

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## 📁 Project Structure

```
├── components/
│   ├── common/          # Shared components (Layout, Header, Footer)
│   ├── gallery/         # Gallery-specific components (Lightbox)
│   └── admin/           # Admin dashboard components
├── lib/
│   ├── auth/            # Authentication utilities
│   ├── cloudinary/      # Image upload and management
│   ├── db/              # Database connection
│   └── email/           # Email sending utilities
├── models/              # MongoDB schemas
├── pages/
│   ├── api/             # API routes
│   ├── admin/           # Admin pages
│   └── [public pages]   # Public website pages
├── public/              # Static assets
├── styles/              # CSS files
└── utils/               # Utility functions
```

## 🔧 Configuration

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and secret
3. Configure upload presets (optional)
4. Set up transformation presets for watermarking

### SendGrid Setup
1. Create a SendGrid account
2. Verify your sender email
3. Create an API key with mail sending permissions
4. Configure email templates (optional)

### MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your IP addresses
4. Get the connection string

### Google Analytics (Optional)
1. Create a GA4 property
2. Get your measurement ID
3. Add to `NEXT_PUBLIC_GA_ID`

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   Add all environment variables in Vercel dashboard:
   - Project Settings → Environment Variables
   - Add all variables from `.env.example`

3. **Domain Configuration**
   - Add your custom domain in Vercel
   - Update `NEXT_PUBLIC_SITE_URL` to match your domain

### Database Migration
The app automatically handles database schema creation. For production:

1. Ensure MongoDB Atlas is configured for production
2. Create indexes for better performance (handled automatically)
3. Set up database backups

## 📊 Admin Dashboard

### Accessing Admin
1. Go to `/admin/login`
2. Enter admin email
3. Check email for magic link
4. Click link to access dashboard

### Admin Features
- **Photo Management**: Upload, edit, delete photos
- **Album Management**: Create and organize albums
- **Category Management**: Assign photos to categories
- **Featured Photos**: Mark photos as featured for homepage
- **Metadata Editing**: Add EXIF data, descriptions, locations

## 🎨 Customization

### Branding
- Update `config.yaml` for site settings
- Replace logo in `/public/images/logo.svg`
- Modify color scheme in `styles/globals.css`

### Content
- Edit About page content in `pages/about.js`
- Update service descriptions
- Modify contact form fields

### Styling
- Retro Nikon color palette in CSS variables
- Serif typography (Georgia) for artistic feel
- Mobile-first responsive design
- Custom CSS (no Tailwind dependency)

## 🔒 Security Features

- **Magic Link Authentication** (no passwords)
- **Rate Limiting** on API endpoints
- **Input Validation** and sanitization
- **CSRF Protection** with secure headers
- **Honeypot Fields** for spam prevention
- **reCAPTCHA Integration** for contact form
- **Secure File Uploads** with type validation

## 📈 SEO Optimization

- **Meta Tags** for all pages
- **Open Graph** and Twitter Card support
- **Structured Data** (JSON-LD)
- **Sitemap Generation** (automatic)
- **Image Alt Text** requirements
- **SEO-Friendly URLs**
- **Performance Optimization** (lazy loading, WebP)

## 🛠 Maintenance

### Regular Tasks
- Monitor Cloudinary usage and optimize storage
- Review and respond to contact form submissions
- Update featured photos regularly
- Check Google Analytics for insights
- Backup database regularly

### Updates
- Keep dependencies updated
- Monitor security advisories
- Test new features in staging environment

## 📞 Support

For technical support or customization requests:
- Check the documentation
- Review the code comments
- Test in development environment first

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Cloudinary for image management
- SendGrid for email services
- MongoDB for database services
- Vercel for hosting platform

---

**Built with ❤️ for RoanPaul Photography & Arts**

