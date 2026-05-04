import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(5000),
  inquiry_type: z.string().min(1).max(100),
  locale: z.enum(['en', 'ar']).default('en'),
})

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 422 })
  }

  const { name, company, email, phone, message, inquiry_type, locale } = parsed.data

  const resend = new Resend(apiKey)

  const subject = `[OTMA] New inquiry: ${inquiry_type} — ${company}`
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td>
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr><td style="background:#080D18;padding:32px 40px;">
          <p style="margin:0;color:#00D4FF;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">OTMA</p>
          <p style="margin:8px 0 0;color:#ffffff;font-size:20px;font-weight:500;">New Contact Inquiry</p>
        </td></tr>
        <tr><td style="padding:36px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0 0 4px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Inquiry type</p>
              <p style="margin:0;font-size:15px;color:#080D18;font-weight:600;">${inquiry_type}</p>
            </td></tr>
            <tr><td style="padding:16px 0;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0 0 4px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">From</p>
              <p style="margin:0;font-size:15px;color:#080D18;font-weight:500;">${name}</p>
              <p style="margin:2px 0 0;font-size:14px;color:#6b7280;">${company}</p>
            </td></tr>
            <tr><td style="padding:16px 0;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0 0 4px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Contact</p>
              <p style="margin:0;font-size:14px;"><a href="mailto:${email}" style="color:#0099BB;text-decoration:none;">${email}</a></p>
              ${phone ? `<p style="margin:2px 0 0;font-size:14px;color:#6b7280;">${phone}</p>` : ''}
            </td></tr>
            <tr><td style="padding:16px 0;">
              <p style="margin:0 0 8px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #f0f0f0;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">Submitted via otma.io · ${locale.toUpperCase()} · ${new Date().toUTCString()}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  try {
    await resend.emails.send({
      from: 'OTMA Contact <contact@otma.io>',
      to: 'founder@otma.io',
      replyTo: email,
      subject,
      html,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
