import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  email: z.string().email(),
  locale: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const { email, locale } = schema.parse(body)

    const isAr = locale === 'ar'

    await resend.emails.send({
      from: 'OTMA AI <noreply@otma.io>',
      to: email,
      bcc: 'founder@otma.io',
      subject: isAr ? 'مرحباً بك في نشرة OTMA' : 'Welcome to OTMA AI Insights',
      html: isAr ? `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#080D18;color:#ffffff;border-radius:12px;">
          <h1 style="color:#00D4FF;font-size:24px;margin-bottom:8px;">شكراً على اشتراكك</h1>
          <p style="color:rgba(255,255,255,0.7);line-height:1.6;">
            سنرسل إليك رؤى وتحديثات حول وكلاء الذكاء الاصطناعي وكيفية تحويل العمليات المؤسسية.
          </p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:24px 0;">
          <p style="color:rgba(255,255,255,0.35);font-size:12px;">OTMA · الرياض · المملكة العربية السعودية</p>
        </div>
      ` : `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#080D18;color:#ffffff;border-radius:12px;">
          <h1 style="color:#00D4FF;font-size:24px;margin-bottom:8px;">You're subscribed.</h1>
          <p style="color:rgba(255,255,255,0.7);line-height:1.6;">
            Expect sharp insights on AI agents, enterprise automation, and what's actually working in the field — no fluff.
          </p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:24px 0;">
          <p style="color:rgba(255,255,255,0.35);font-size:12px;">OTMA · Riyadh, Saudi Arabia · <a href="https://otma.io" style="color:#00D4FF;">otma.io</a></p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
