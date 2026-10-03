interface Env {
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
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

    const clientName = data.name || 'Zákazník';
    const clientEmail = data.email;
    const service = data.serviceType || 'Poptávka webu';
    const url = data.existingUrl || 'Neuvedeno';
    const message = data.message || 'Bez doplňující zprávy';
    const dateStr = data.createdAt || new Date().toLocaleString('cs-CZ');

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
          <div class="label">E-mail klienta</div>
          <div class="val"><a href="mailto:${clientEmail}">${clientEmail}</a></div>
        </div>
        <div class="row">
          <div class="label">Poptávaná služba</div>
          <div class="val" style="color: #34d399;">${service}</div>
        </div>
        ${data.existingUrl ? `
        <div class="row">
          <div class="label">Stávající web klienta</div>
          <div class="val"><a href="${data.existingUrl.startsWith('http') ? data.existingUrl : 'https://' + data.existingUrl}" target="_blank">${data.existingUrl}</a></div>
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
      Odesláno z formuláře na webu admatsu.com • Doručeno na ${targetEmail}
    </div>
  </div>
</body>
</html>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Admatsu Poptávky <onboarding@resend.dev>',
        to: [targetEmail],
        reply_to: clientEmail,
        subject,
        html: htmlContent,
      }),
    });

    const resData = await resendRes.json();
    return new Response(JSON.stringify({ success: true, emailResult: resData }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
