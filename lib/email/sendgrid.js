import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send magic link email for admin authentication
 */
export async function sendMagicLinkEmail(email, token) {
  const magicLink = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/verify?token=${token}`;
  
  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: 'RoanPaul Photography'
    },
    subject: 'Your Admin Login Link - RoanPaul Photography',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin Login - RoanPaul Photography</title>
          <style>
            body { font-family: Georgia, serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #2c2c2c; }
            .button { display: inline-block; background: #d4af37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">RoanPaul Photography & Arts</div>
          </div>
          
          <h2>Admin Login Request</h2>
          
          <p>Hello,</p>
          
          <p>You requested to log in to the RoanPaul Photography admin dashboard. Click the button below to access your account:</p>
          
          <div style="text-align: center;">
            <a href="${magicLink}" class="button">Access Admin Dashboard</a>
          </div>
          
          <div class="warning">
            <strong>Security Notice:</strong> This link will expire in 1 hour and can only be used once. If you didn't request this login, please ignore this email.
          </div>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 3px; font-family: monospace;">
            ${magicLink}
          </p>
          
          <div class="footer">
            <p>Best regards,<br>RoanPaul Photography & Arts</p>
            <p><em>This is an automated message. Please do not reply to this email.</em></p>
          </div>
        </body>
      </html>
    `,
    text: `
      RoanPaul Photography & Arts - Admin Login
      
      Hello,
      
      You requested to log in to the RoanPaul Photography admin dashboard.
      
      Click this link to access your account: ${magicLink}
      
      Security Notice: This link will expire in 1 hour and can only be used once. If you didn't request this login, please ignore this email.
      
      Best regards,
      RoanPaul Photography & Arts
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Magic link email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid error:', error);
    throw new Error('Failed to send magic link email');
  }
}

/**
 * Send contact form submission to admin
 */
export async function sendContactFormEmail(formData) {
  const { name, email, subject, message, phone } = formData;
  
  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: 'RoanPaul Photography Contact Form'
    },
    replyTo: email,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Georgia, serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #2c2c2c; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2c2c2c; }
            .value { margin-top: 5px; padding: 10px; background: #f8f9fa; border-radius: 3px; }
            .message-content { background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 5px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">RoanPaul Photography & Arts</div>
            <p>New Contact Form Submission</p>
          </div>
          
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${email}</div>
          </div>
          
          ${phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${phone}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${subject}</div>
          </div>
          
          <div class="field">
            <div class="label">Message:</div>
            <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            This message was sent via the contact form on your photography portfolio website.
          </p>
        </body>
      </html>
    `,
    text: `
      New Contact Form Submission - RoanPaul Photography
      
      Name: ${name}
      Email: ${email}
      ${phone ? `Phone: ${phone}` : ''}
      Subject: ${subject}
      
      Message:
      ${message}
      
      ---
      This message was sent via the contact form on your photography portfolio website.
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Contact form email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid error:', error);
    throw new Error('Failed to send contact form email');
  }
}

/**
 * Send auto-reply to contact form submitter
 */
export async function sendContactAutoReply(email, name) {
  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: 'RoanPaul Photography'
    },
    subject: 'Thank you for your message - RoanPaul Photography',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you - RoanPaul Photography</title>
          <style>
            body { font-family: Georgia, serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #2c2c2c; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">RoanPaul Photography & Arts</div>
          </div>
          
          <h2>Thank you for your message!</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to RoanPaul Photography & Arts. I have received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
          
          <p>I appreciate your interest in my work and look forward to discussing your photography needs with you.</p>
          
          <div class="footer">
            <p>Best regards,<br>RoanPaul<br>RoanPaul Photography & Arts</p>
            <p><em>This is an automated confirmation. Please do not reply to this email.</em></p>
          </div>
        </body>
      </html>
    `,
    text: `
      Thank you for your message!
      
      Dear ${name},
      
      Thank you for reaching out to RoanPaul Photography & Arts. I have received your message and will get back to you as soon as possible, typically within 24-48 hours.
      
      I appreciate your interest in my work and look forward to discussing your photography needs with you.
      
      Best regards,
      RoanPaul
      RoanPaul Photography & Arts
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Contact auto-reply sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid auto-reply error:', error);
    // Don't throw error for auto-reply failure
    return { success: false };
  }
}

