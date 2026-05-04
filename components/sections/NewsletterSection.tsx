'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, useReducedMotion } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const schema = z.object({
  email: z.string().email(),
  _honey: z.string().max(0),
})
type FormData = z.infer<typeof schema>

interface NewsletterSectionProps {
  locale: string
  title: string
  subtitle: string
  placeholder: string
  button: string
  success: string
  error: string
  privacy: string
}

export function NewsletterSection({
  locale, title, subtitle, placeholder, button, success, error, privacy,
}: NewsletterSectionProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  async function onSubmit(data: FormData) {
    if (data._honey) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, locale }),
      })
      if (!res.ok) throw new Error()
      toast.success(success, { duration: 6000 })
      reset()
    } catch {
      toast.error(error, { duration: 6000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-[#080D18] dark:bg-[#040810] border-t border-white/8 py-16 relative overflow-hidden">
      {/* background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 50% 80% at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* label */}
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
            AI Insights
          </p>

          <h2 className="font-display font-medium text-2xl sm:text-3xl text-white mb-3 leading-snug">
            {title}
          </h2>
          <p className="text-white/50 text-sm sm:text-base mb-8 max-w-md mx-auto">
            {subtitle}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={cn('flex flex-col sm:flex-row gap-3', isRtl ? 'sm:flex-row-reverse' : '')}
          >
            {/* honeypot */}
            <input
              {...register('_honey')}
              type="text"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute w-0 h-0 opacity-0 pointer-events-none"
              autoComplete="off"
            />

            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                {...register('email')}
                placeholder={placeholder}
                autoComplete="email"
                className={cn(
                  'w-full h-12 rounded-xl border bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-colors',
                  errors.email
                    ? 'border-[#C72C2C]/60 focus:ring-[#C72C2C]/40'
                    : 'border-white/12 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF]/50',
                  isRtl ? 'text-right' : ''
                )}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'nl-email-error' : undefined}
              />
              {errors.email && (
                <p id="nl-email-error" className="mt-1.5 text-xs text-[#C72C2C] text-left" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-xl text-sm font-semibold bg-[#00D4FF] text-[#080D18] hover:bg-[#33DDFF] active:scale-[0.97] transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_32px_rgba(0,212,255,0.5)] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? '…' : button}
            </button>
          </form>

          <p className="mt-4 text-xs text-white/30">{privacy}</p>
        </motion.div>
      </div>
    </section>
  )
}
