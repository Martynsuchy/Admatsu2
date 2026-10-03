interface Env {
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
  RESEND_FROM?: string;
}

export const onRequestPost = async (context: any) => {
  try {
    const data: any = await context.request.json();
    if (!data || !data.name || !data.email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = context.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set in environment variables');
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not configured in Cloudflare Pages environment variables' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const targetEmail = context.env.NOTIFICATION_EMAIL || 'info@admatsu.com';
    const fromSender = context.env.RESEND_FROM || 'Admatsu <info@admatsu.com>';

    const clientName = data.name || 'Zákazník';
    const clientEmail = data.email;
    const service = data.serviceType || 'Poptávka webu';
    const url = data.existingUrl || '';
    const message = data.message || 'Bez doplňující zprávy';
    const dateStr = data.createdAt || new Date().toLocaleString('cs-CZ');
    const lang = (data.lang || 'cs').toLowerCase();

    // ==========================================
    // 1. Admin Notification Email (to Admatsu)
    // ==========================================
    const adminSubject = `🚀 Nová poptávka [${lang.toUpperCase()}]: ${service} – ${clientName}`;
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060910; color: #f1f5f9; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0B101D; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #047857 0%, #06b6d4 100%); padding: 28px 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; color: rgba(255,255,255,0.9); font-size: 13px; font-family: monospace; }
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
      <p>Přijato dne ${dateStr} • Jazyková verze: ${lang.toUpperCase()}</p>
    </div>
    <div class="body">
      <div class="card">
        <div class="row">
          <div class="label">Jméno / Společnost</div>
          <div class="val">${clientName}</div>
        </div>
        <div class="row">
          <div class="label">E-mail klienta</div>
          <div class="val"><a href="mailto:${clientEmail}">${clientEmail}</a></div>
        </div>
        <div class="row">
          <div class="label">Poptávaná služba</div>
          <div class="val" style="color: #34d399;">${service}</div>
        </div>
        ${url ? `
        <div class="row">
          <div class="label">Stávající web klienta</div>
          <div class="val"><a href="${url.startsWith('http') ? url : 'https://' + url}" target="_blank">${url}</a></div>
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

    // ==========================================
    // 2. Multilingual Customer Confirmation Auto-Responder
    // ==========================================
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
      // Default: Czech
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
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060910; color: #f1f5f9; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0B101D; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%); padding: 32px 28px; text-align: left; }
    .badge { display: inline-block; background-color: rgba(0,0,0,0.25); color: #ffffff; font-size: 10px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px; }
    .header h1 { margin: 0; font-size: 24px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px; }
    .body { padding: 30px 28px; font-size: 14px; line-height: 1.6; color: #cbd5e1; }
    .intro-box { font-size: 15px; color: #f8fafc; margin-bottom: 22px; }
    .highlight-card { background: rgba(6, 182, 212, 0.08); border-left: 3px solid #06b6d4; padding: 14px 18px; border-radius: 0 10px 10px 0; margin-bottom: 24px; color: #e2e8f0; font-size: 14px; }
    .details-card { background-color: #050811; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .details-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #38bdf8; font-weight: 700; margin-bottom: 14px; }
    .row { margin-bottom: 12px; }
    .row:last-child { margin-bottom: 0; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; font-weight: 600; margin-bottom: 3px; }
    .val { font-size: 14px; color: #ffffff; font-weight: 500; word-break: break-word; }
    .sig-table { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 26px; }
    .footer { padding: 20px 28px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">${custHeaderBadge}</div>
      <h1>${custTitle}</h1>
    </div>
    
    <div class="body">
      <div class="intro-box">
        ${custIntro}
      </div>

      <div class="highlight-card">
        ${custNextSteps}
      </div>

      <div class="details-card">
        <div class="details-title">${custDetailsTitle}</div>
        
        <div class="row">
          <div class="label">${custServiceLabel}</div>
          <div class="val" style="color: #38bdf8;">${service}</div>
        </div>

        ${url ? `
        <div class="row">
          <div class="label">${custUrlLabel}</div>
          <div class="val"><a href="${url.startsWith('http') ? url : 'https://' + url}" target="_blank" style="color: #38bdf8; text-decoration: none;">${url}</a></div>
        </div>
        ` : ''}

        ${message && message !== 'Bez doplňující zprávy' ? `
        <div class="row">
          <div class="label">${custMessageLabel}</div>
          <div class="val" style="color: #94a3b8; font-size: 13px; margin-top: 4px;">${message}</div>
        </div>
        ` : ''}
      </div>

      <p style="font-size: 12px; color: #94a3b8; margin-bottom: 24px;">
        💡 ${custHelpText}
      </p>

      <!-- Signature Matching Admatsu Identity -->
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; width: 100%;">
        <tr>
          <td style="width: 3px; background-color: #06b6d4; border-radius: 2px;" valign="top"></td>
          <td style="width: 12px;"></td>
          <td valign="top" style="padding-top: 10px;">
            <div style="font-size: 15px; font-weight: 700; color: #ffffff;">Martin Suchý</div>
            <div style="font-size: 11px; font-weight: 600; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.6px; margin-top: 2px;">
              ${custSignatureRole}
            </div>
            <div style="margin-top: 8px; font-size: 12px; color: #cbd5e1; line-height: 1.5;">
              <span style="color: #64748b;">M:</span> <a href="tel:+420604531377" style="color: #f1f5f9; text-decoration: none;">+420 604 531 377</a>
              <span style="color: #475569; padding: 0 4px;">•</span>
              <span style="color: #64748b;">E:</span> <a href="mailto:info@admatsu.com" style="color: #38bdf8; text-decoration: none;">info@admatsu.com</a>
              <br>
              <span style="color: #64748b;">W:</span> <a href="https://admatsu.com" target="_blank" style="color: #38bdf8; text-decoration: none; font-weight: 600;">admatsu.com</a>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div class="footer">
      Admatsu • Next-Gen Web Engineering • Prague, Czechia • admatsu.com
    </div>
  </div>
</body>
</html>
    `;

    // ==========================================
    // 3. Dispatch Emails via Resend
    // ==========================================
    // Send admin notification
    const adminEmailPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromSender,
        to: [targetEmail],
        reply_to: clientEmail,
        subject: adminSubject,
        html: adminHtml,
      }),
    });

    // Send customer confirmation auto-responder
    const customerEmailPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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

    const [adminRes, custRes] = await Promise.allSettled([adminEmailPromise, customerEmailPromise]);

    let adminResult: any = null;
    let custResult: any = null;

    if (adminRes.status === 'fulfilled') {
      try { adminResult = await adminRes.value.json(); } catch {}
    }
    if (custRes.status === 'fulfilled') {
      try { custResult = await custRes.value.json(); } catch {}
    }

    return new Response(JSON.stringify({
      success: true,
      adminNotification: adminResult,
      customerConfirmation: custResult,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
