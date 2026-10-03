import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@admatsu.com';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(express.json({ limit: '10mb' }));

interface InquiryData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  existingUrl?: string;
  serviceType: string;
  message?: string;
  estimatedPrice?: string;
  notes?: string;
  createdAt?: string;
}

// Helper to send email notification to info@admatsu.com
async function sendInquiryNotification(inquiry: InquiryData) {
  const targetEmail = NOTIFICATION_EMAIL;
  const clientName = inquiry.name || 'Zákazník';
  const clientEmail = inquiry.email;
  const service = inquiry.serviceType || 'Poptávka webu';
  const url = inquiry.existingUrl || 'Neuvedeno';
  const message = inquiry.message || 'Bez doplňující zprávy';
  const dateStr = inquiry.createdAt || new Date().toLocaleString('cs-CZ');

  const subject = `🚀 Nová poptávka z webu: ${service} – ${clientName}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060910; color: #f1f5f9; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0B101D; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #047857 0%, #06b6d4 100%); padding: 28px 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; color: rgba(255,255,255,0.85); font-size: 13px; font-family: monospace; }
    .body { padding: 28px 24px; }
    .card { background-color: #050811; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-bottom: 20px; }
    .row { margin-bottom: 14px; }
    .row:last-child { margin-bottom: 0; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 4px; }
    .val { font-size: 15px; color: #ffffff; font-weight: 500; word-break: break-word; }
    .val a { color: #38bdf8; text-decoration: none; }
    .message-box { background-color: #081224; border-left: 3px solid #06b6d4; padding: 14px 16px; border-radius: 0 8px 8px 0; font-size: 14px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap; margin-top: 6px; }
    .action-btn { display: inline-block; background: linear-gradient(135deg, #06b6d4, #2563eb); color: #ffffff !important; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px; text-decoration: none; }
    .footer { padding: 20px 24px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Nová poptávka z webu ADMATSU</h1>
      <p>Přijato dne ${dateStr}</p>
    </div>
    <div class="body">
      <div class="card">
        <div class="row">
          <div class="label">Jméno / Společnost</div>
          <div class="val">${clientName}</div>
        </div>
        <div class="row">
          <div class="label">E-mail klienta (klikací)</div>
          <div class="val"><a href="mailto:${clientEmail}">${clientEmail}</a></div>
        </div>
        <div class="row">
          <div class="label">Poptávaná služba</div>
          <div class="val" style="color: #34d399;">${service}</div>
        </div>
        ${inquiry.existingUrl ? `
        <div class="row">
          <div class="label">Stávající web klienta</div>
          <div class="val"><a href="${inquiry.existingUrl.startsWith('http') ? inquiry.existingUrl : 'https://' + inquiry.existingUrl}" target="_blank">${inquiry.existingUrl}</a></div>
        </div>
        ` : ''}
      </div>

      <div class="label">Zpráva od klienta</div>
      <div class="message-box">${message}</div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${clientEmail}?subject=Re:%20Popt%C3%A1vka%20webu%20%E2%80%94%20Admatsu" class="action-btn">
          ✉️ Odpovědět klientovi (${clientEmail})
        </a>
      </div>
    </div>
    <div class="footer">
      Odesláno z formuláře na webu admatsu.com • Notifikace doručena na ${targetEmail}
    </div>
  </div>
</body>
</html>
  `;

  // 1. SMTP Sending
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const port = Number(process.env.SMTP_PORT) || 465;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: process.env.SMTP_SECURE === 'true' || port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Admatsu Poptávky" <${process.env.SMTP_USER}>`,
        to: targetEmail,
        replyTo: clientEmail,
        subject,
        html: htmlContent,
      });

      console.log(`[EMAIL SENT] Notification delivered to ${targetEmail} via SMTP (MessageID: ${info.messageId})`);
      return { success: true, method: 'smtp', messageId: info.messageId };
    } catch (smtpError) {
      console.error('[SMTP ERROR] Failed to send email via SMTP:', smtpError);
      return { success: false, error: String(smtpError) };
    }
  }

  // 2. Resend API alternative
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Admatsu Poptávky <onboarding@resend.dev>',
          to: [targetEmail],
          reply_to: clientEmail,
          subject,
          html: htmlContent,
        }),
      });
      const resendData = await resendRes.json();
      console.log(`[EMAIL SENT] Notification delivered to ${targetEmail} via Resend:`, resendData);
      return { success: true, method: 'resend', data: resendData };
    } catch (resendError) {
      console.error('[RESEND ERROR] Failed to send email via Resend:', resendError);
      return { success: false, error: String(resendError) };
    }
  }

  // 3. Fallback / Dev mode log
  console.log(`\n==================================================`);
  console.log(`📩 [NEW LEAD NOTIFICATION FOR ${targetEmail}]`);
  console.log(`From:    ${clientName} <${clientEmail}>`);
  console.log(`Service: ${service}`);
  console.log(`URL:     ${url}`);
  console.log(`Message: ${message}`);
  console.log(`Notice:  Configure SMTP_HOST, SMTP_USER, SMTP_PASS in .env to deliver directly to ${targetEmail}.`);
  console.log(`==================================================\n`);

  return { 
    success: true, 
    method: 'simulated', 
    notice: `Inquiry saved. Add SMTP credentials to .env to deliver directly to ${targetEmail}.` 
  };
}

// Contact Form Endpoint: saves lead AND triggers email notification to info@admatsu.com
app.post('/api/contact', async (req, res) => {
  try {
    const lead: InquiryData = req.body;
    if (!lead || !lead.name || !lead.email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Append to inquiries.json if not already present
    let currentInquiries: InquiryData[] = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      try {
        currentInquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
      } catch {
        currentInquiries = [];
      }
    }

    const leadId = lead.id || `lead-${Date.now().toString().slice(-4)}`;
    const fullLead: InquiryData = {
      ...lead,
      id: leadId,
      createdAt: lead.createdAt || new Date().toLocaleString('cs-CZ'),
    };

    // If not existing, prepend
    if (!currentInquiries.some((i) => i.id === leadId)) {
      currentInquiries.unshift(fullLead);
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(currentInquiries, null, 2), 'utf-8');
    }

    // Send email notification
    const emailResult = await sendInquiryNotification(fullLead);

    return res.json({ success: true, lead: fullLead, emailResult });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return res.status(500).json({ error: 'Failed to process inquiry' });
  }
});

// Content API
app.get('/api/content', (_req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
      return res.json({ success: true, data });
    }
    return res.json({ success: true, data: null });
  } catch (error) {
    console.error('Error reading content:', error);
    return res.status(500).json({ error: 'Failed to read content' });
  }
});

app.post('/api/content', (req, res) => {
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2), 'utf-8');
    return res.json({ success: true, savedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Error saving content:', error);
    return res.status(500).json({ error: 'Failed to save content' });
  }
});

// Inquiries API
app.get('/api/inquiries', (_req, res) => {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
      return res.json({ success: true, data });
    }
    return res.json({ success: true, data: null });
  } catch (error) {
    console.error('Error reading inquiries:', error);
    return res.status(500).json({ error: 'Failed to read inquiries' });
  }
});

app.post('/api/inquiries', (req, res) => {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(req.body, null, 2), 'utf-8');
    return res.json({ success: true });
  } catch (error) {
    console.error('Error saving inquiries:', error);
    return res.status(500).json({ error: 'Failed to save inquiries' });
  }
});

app.post('/api/reset', (_req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) fs.unlinkSync(CONTENT_FILE);
    if (fs.existsSync(INQUIRIES_FILE)) fs.unlinkSync(INQUIRIES_FILE);
    return res.json({ success: true });
  } catch (error) {
    console.error('Error resetting content:', error);
    return res.status(500).json({ error: 'Failed to reset content' });
  }
});

// Vite middleware in dev or static files in production
const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(process.cwd(), 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`  ➜  Local:   http://localhost:${PORT}/`);
  console.log(`  ➜  Network: http://0.0.0.0:${PORT}/`);
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
