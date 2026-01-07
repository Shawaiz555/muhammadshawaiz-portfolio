/**
 * Portfolio Contact Form Server
 * =============================
 * Express server with NodeMailer for handling contact form submissions
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// Middleware Configuration
// ============================================

// CORS configuration - allow requests from frontend
const corsOptions = {
   origin: process.env.FRONTEND_URL || '*',
   methods: ['POST', 'OPTIONS'],
   allowedHeaders: ['Content-Type'],
   credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' })); // Limit payload size for security

// ============================================
// Rate Limiting (Simple in-memory implementation)
// ============================================

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // Max 5 requests per minute per IP

function rateLimit(req, res, next) {
   const ip = req.ip || req.connection.remoteAddress;
   const now = Date.now();

   if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, startTime: now });
      return next();
   }

   const record = rateLimitMap.get(ip);

   if (now - record.startTime > RATE_LIMIT_WINDOW) {
      // Reset window
      rateLimitMap.set(ip, { count: 1, startTime: now });
      return next();
   }

   if (record.count >= MAX_REQUESTS) {
      return res.status(429).json({
         success: false,
         message: 'Too many requests. Please try again later.'
      });
   }

   record.count++;
   next();
}

// ============================================
// Email Transporter Configuration
// ============================================

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
   }
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
   if (error) {
      console.error('❌ Email transporter error:', error.message);
      console.log('⚠️  Make sure your EMAIL_USER and EMAIL_PASS are correctly set in .env');
   } else {
      console.log('✅ Email transporter is ready');
   }
});

// ============================================
// Email Template Generator
// ============================================

function generateEmailHTML(formData) {
   const { name, email, subject, message, timestamp } = formData;
   const formattedDate = new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
   });

   return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #000; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                📬 A Contact Form Submission from a Client
              </h1>
              <p style="margin: 8px 0 0; color: rgba(0,0,0,0.7); font-size: 14px;">
                Someone reached out through your portfolio Shawaiz
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background-color: #111; border-left: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1); padding: 32px;">

              <!-- Sender Info Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding-left: 16px; vertical-align: top;">
                          <p style="margin: 0; color: #fff; font-size: 18px; font-weight: 600;">${escapeHtml(name)}</p>
                          <p style="margin: 4px 0 0; color: #10b981; font-size: 14px;">
                            <a href="mailto:${escapeHtml(email)}" style="color: #10b981; text-decoration: none;">${escapeHtml(email)}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Subject -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                    <p style="margin: 0; color: #fff; font-size: 16px; font-weight: 500;">${escapeHtml(subject)}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                    <div style="background-color: rgba(255,255,255,0.03); border-left: 3px solid #10b981; padding: 16px; border-radius: 0 8px 8px 0;">
                      <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Reply Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <a href="mailto:${escapeHtml(email)}?subject=Re: ${escapeHtml(subject)}" 
                       style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); color: #000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      ↩️ Reply to ${escapeHtml(name.split(' ')[0])}
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); border-top: none; padding: 20px 32px; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 12px;">
                📅 Received on ${formattedDate}
              </p>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.3); font-size: 11px;">
                This email was sent from your portfolio contact form
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Helper function to escape HTML entities
function escapeHtml(text) {
   const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
   };
   return String(text).replace(/[&<>"']/g, m => map[m]);
}

// ============================================
// API Routes
// ============================================

// Health check endpoint
app.get('/api/health', (req, res) => {
   res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', rateLimit, async (req, res) => {
   try {
      const { name, email, subject, message } = req.body;

      // Validation
      if (!name || !email || !subject || !message) {
         return res.status(400).json({
            success: false,
            message: 'Please fill in all required fields.'
         });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
         });
      }

      // Sanitize and limit input lengths
      const sanitizedData = {
         name: String(name).trim().slice(0, 100),
         email: String(email).trim().slice(0, 100),
         subject: String(subject).trim().slice(0, 200),
         message: String(message).trim().slice(0, 5000),
         timestamp: new Date().toISOString()
      };

      // Email options
      const mailOptions = {
         from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
         to: process.env.EMAIL_TO || process.env.EMAIL_USER,
         replyTo: sanitizedData.email,
         subject: `🚀 Portfolio: ${sanitizedData.subject}`,
         html: generateEmailHTML(sanitizedData),
         text: `
New Contact Form Submission
============================

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Subject: ${sanitizedData.subject}

Message:
${sanitizedData.message}

---
Received: ${sanitizedData.timestamp}
      `.trim()
      };

      // Send email
      await transporter.sendMail(mailOptions);

      console.log(`✅ Email sent successfully from ${sanitizedData.name} <${sanitizedData.email}>`);

      res.status(200).json({
         success: true,
         message: 'Your message has been sent successfully!'
      });

   } catch (error) {
      console.error('❌ Error sending email:', error.message);

      res.status(500).json({
         success: false,
         message: 'Failed to send message. Please try again later.'
      });
   }
});

// 404 handler
app.use((req, res) => {
   res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
   console.log(`
╔════════════════════════════════════════════════════════╗
║  🚀 Portfolio Contact Server                           ║
╠════════════════════════════════════════════════════════╣
║  Server running on: http://localhost:${PORT}              ║
║  API Endpoint: POST /api/contact                       ║
║  Health Check: GET /api/health                         ║
╚════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;