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
  lang?: string;
}

// Helper to send email notification to info@admatsu.com and auto-responder to client
async function sendInquiryNotification(inquiry: InquiryData) {
  const targetEmail = NOTIFICATION_EMAIL;
  const clientName = inquiry.name || 'Zákazník';
  const clientEmail = inquiry.email;
  const service = inquiry.serviceType || 'Poptávka webu';
  const url = inquiry.existingUrl || 'Neuvedeno';
  const message = inquiry.message || 'Bez doplňující zprávy';
  const dateStr = inquiry.createdAt || new Date().toLocaleString('cs-CZ');
  const lang = (inquiry.lang || 'cs').toLowerCase();
  const fromSender = process.env.RESEND_FROM || 'Admatsu <info@admatsu.com>';

  const subject = `🚀 Nová poptávka [${lang.toUpperCase()}]: ${service} – ${clientName}`;

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
      <p>Přijato dne ${dateStr} • Jazyk: ${lang.toUpperCase()}</p>
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

  // Customer Confirmation Template
  let custSubject = '';
  let custHeaderBadge = '';
  let custTitle = '';
  let custIntro = '';
  let custNextSteps = '';
  let custDetailsTitle = '';
  let custServiceLabel = '';
  let custUrlLabel = '';
  let custMessageLabel = '';
  let custHelpText = '';
  let custSignatureRole = '';

  if (lang === 'de') {
    custSubject = 'Bestätigung Ihrer Anfrage — Admatsu';
    custHeaderBadge = 'ANFRAGE ERFOLGREICH ERHALTEN';
    custTitle = 'Vielen Dank für Ihre Anfrage';
    custIntro = `Guten Tag ${clientName},<br><br>vielen Dank für Ihr Interesse an einer Zusammenarbeit mit <strong>Admatsu</strong>. Wir haben Ihre Projektanfrage erfolgreich registriert.`;
    custNextSteps = 'Wir analysieren Ihre Angaben und <strong>melden uns in Kürze bei Ihnen</strong> mit nächsten Schritten und Möglichkeiten.';
    custDetailsTitle = 'Zusammenfassung Ihrer Angaben';
    custServiceLabel = 'Gewünschte Leistung';
    custUrlLabel = 'Bestehende Website';
    custMessageLabel = 'Ihre Nachricht';
    custHelpText = 'Haben Sie dringende Fragen oder zusätzliche Unterlagen? Antworten Sie einfach direkt auf diese E-Mail.';
    custSignatureRole = 'Founder & Web Architect · Admatsu';
  } else if (lang === 'en') {
    custSubject = 'Inquiry Confirmation — Admatsu';
    custHeaderBadge = 'INQUIRY SUCCESSFULLY RECEIVED';
    custTitle = 'Thank You for Your Inquiry';
    custIntro = `Hello ${clientName},<br><br>thank you for your interest in collaborating with <strong>Admatsu</strong>. We have successfully received your project inquiry.`;
    custNextSteps = 'We will carefully review your requirements and <strong>get back to you soon</strong> with next steps and options.';
    custDetailsTitle = 'Summary of Your Submission';
    custServiceLabel = 'Requested Service';
    custUrlLabel = 'Existing Website';
    custMessageLabel = 'Your Message';
    custHelpText = 'Need immediate assistance or have additional files? Simply reply directly to this email.';
    custSignatureRole = 'Founder & Web Architect · Admatsu';
  } else {
    custSubject = 'Potvrzení přijetí vaší poptávky — Admatsu';
    custHeaderBadge = 'POPTÁVKA V POŘÁDKU PŘIJATA';
    custTitle = 'Děkujeme za vaši poptávku';
    custIntro = `Dobrý den, ${clientName},<br><br>děkujeme za váš zájem o modernizaci webu a spolupráci s <strong>Admatsu</strong>. Vaši poptávku jsme v pořádku přijali a evidujeme ji v našem systému.`;
    custNextSteps = 'Vaše zadání pečlivě projdeme a <strong>brzy se vám ozveme</strong> s dalším postupem a možnostmi řešení.';
    custDetailsTitle = 'Shrnutí zadaných údajů';
    custServiceLabel = 'Poptávaná služba';
    custUrlLabel = 'Stávající web';
    custMessageLabel = 'Vaše zpráva';
    custHelpText = 'Máte doplňující podklady nebo dotaz? Můžete přímo odpovědět na tento e-mail nebo zavolat na +420 604 531 377.';
    custSignatureRole = 'Founder & Web Architect · Admatsu';
  }

  const customerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&display=swap');
    body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060910; color: #f1f5f9; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0B101D; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .header { background-color: #070B14; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 28px 28px; text-align: left; }
    .header-logo { font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; line-height: 1; }
    .header-badge { margin-top: 8px; font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1.2px; }
    .body { padding: 30px 28px 36px 28px; font-size: 14px; line-height: 1.6; color: #cbd5e1; }
    .subject-headline { font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 21px; font-weight: 800; color: #ffffff; letter-spacing: -0.4px; margin-bottom: 18px; }
    .intro-box { font-size: 15px; color: #f8fafc; margin-bottom: 22px; }
    .highlight-card { background: rgba(6, 182, 212, 0.08); border-left: 3px solid #06b6d4; padding: 14px 18px; border-radius: 0 10px 10px 0; margin-bottom: 24px; color: #e2e8f0; font-size: 14px; }
    .details-card { background-color: #050811; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .details-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #38bdf8; font-weight: 700; margin-bottom: 14px; }
    .row { margin-bottom: 12px; }
    .row:last-child { margin-bottom: 0; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; font-weight: 600; margin-bottom: 3px; }
    .val { font-size: 14px; color: #ffffff; font-weight: 500; word-break: break-word; }
    .footer { padding: 20px 28px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">Admatsu</div>
      <div class="header-badge">${custHeaderBadge}</div>
    </div>
    <div class="body">
      <!-- Title acting as unlabelled subject above greeting -->
      <div class="subject-headline">${custTitle}</div>

      <div class="intro-box">${custIntro}</div>
      <div class="highlight-card">${custNextSteps}</div>
      <div class="details-card">
        <div class="details-title">${custDetailsTitle}</div>
        <div class="row">
          <div class="label">${custServiceLabel}</div>
          <div class="val" style="color: #38bdf8;">${service}</div>
        </div>
        ${inquiry.existingUrl ? `
        <div class="row">
          <div class="label">${custUrlLabel}</div>
          <div class="val"><a href="${inquiry.existingUrl.startsWith('http') ? inquiry.existingUrl : 'https://' + inquiry.existingUrl}" target="_blank" style="color: #38bdf8; text-decoration: none;">${inquiry.existingUrl}</a></div>
        </div>
        ` : ''}
        ${inquiry.message && inquiry.message !== 'Bez doplňující zprávy' ? `
        <div class="row">
          <div class="label">${custMessageLabel}</div>
          <div class="val" style="color: #94a3b8; font-size: 13px; margin-top: 4px;">${inquiry.message}</div>
        </div>
        ` : ''}
      </div>
      <p style="font-size: 12px; color: #94a3b8; margin-bottom: 32px;">💡 ${custHelpText}</p>

      <!-- Horizontal Signature: Precision Centered with Syne font -->
      <div style="margin-top: 36px; padding-top: 26px; border-top: 1px solid rgba(255,255,255,0.12);">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
          <tr>
            <!-- Sloupec 1: Logo Admatsu nalevo (vycentrované v originálním fontu Syne) -->
            <td valign="middle" align="center" style="vertical-align: middle; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.15); white-space: nowrap; width: 1%;">
              <div style="font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; line-height: 1; margin: 0; padding: 0;">
                Admatsu
              </div>
            </td>

            <!-- Sloupec 2: Samotný podpis napravo (vycentrovaný) -->
            <td valign="middle" style="vertical-align: middle; padding: 0 0 0 24px;">
              <div style="font-size: 15px; font-weight: 700; color: #ffffff; letter-spacing: -0.2px; line-height: 1.2; margin: 0;">
                Martin Suchý
              </div>
              <div style="font-size: 11px; font-weight: 600; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 3px; line-height: 1.2;">
                Founder &amp; Web Architect
              </div>
              <div style="margin-top: 8px; font-size: 12px; color: #cbd5e1; line-height: 1.5;">
                <span style="color: #64748b; font-weight: 600;">M:</span> 
                <a href="tel:+420604531377" style="color: #f1f5f9; text-decoration: none; font-weight: 600;">+420 604 531 377</a>
                <span style="color: #06b6d4; padding: 0 6px; font-weight: bold;">•</span>
                <span style="color: #64748b; font-weight: 600;">E:</span> 
                <a href="mailto:info@admatsu.com" style="color: #38bdf8; text-decoration: none; font-weight: 600;">info@admatsu.com</a>
                <br>
                <span style="color: #64748b; font-weight: 600;">W:</span> 
                <a href="https://admatsu.com" target="_blank" style="color: #06b6d4; text-decoration: none; font-weight: 700;">admatsu.com</a>
                <span style="color: #06b6d4; padding: 0 6px; font-weight: bold;">•</span>
                <span style="color: #94a3b8; font-size: 11px;">Prague, Czechia · Remote EU</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="footer">
      Admatsu • Next-Gen Web Engineering • Prague, Czechia • admatsu.com
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

      // Admin notification
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Admatsu Poptávky" <${process.env.SMTP_USER}>`,
        to: targetEmail,
        replyTo: clientEmail,
        subject,
        html: htmlContent,
      });

      // Customer confirmation
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Admatsu" <${process.env.SMTP_USER}>`,
        to: clientEmail,
        replyTo: targetEmail,
        subject: custSubject,
        html: customerHtml,
      }).catch((e) => console.warn('[SMTP] Could not send customer confirmation:', e));

      console.log(`[EMAIL SENT] Notification delivered to ${targetEmail} and confirmation to ${clientEmail} via SMTP`);
      return { success: true, method: 'smtp' };
    } catch (smtpError) {
      console.error('[SMTP ERROR] Failed to send email via SMTP:', smtpError);
      return { success: false, error: String(smtpError) };
    }
  }

  // 2. Resend API alternative
  if (process.env.RESEND_API_KEY) {
    try {
      const adminPromise = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromSender,
          to: [targetEmail],
          reply_to: clientEmail,
          subject,
          html: htmlContent,
        }),
      });

      const customerPromise = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromSender,
          to: [clientEmail],
          reply_to: targetEmail,
          subject: custSubject,
          html: customerHtml,
        }),
      });

      const [adminRes, custRes] = await Promise.allSettled([adminPromise, customerPromise]);
      console.log(`[EMAIL SENT] Dispatched via Resend: Admin=${adminRes.status}, Customer=${custRes.status}`);
      return { success: true, method: 'resend' };
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
