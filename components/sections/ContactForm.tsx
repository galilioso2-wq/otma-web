'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  inquiry_type: z.string().min(1),
})

type FormData = z.infer<typeof schema>

interface ContactFormProps {
  locale: string
  form: {
    name: string
    company: string
    email: string
    phone: string
    message: string
    inquiry_type: string
    inquiry_options: string[]
    submit: string
    success: string
    error: string
  }
  title: string
}

export function ContactForm({ locale, form, title }: ContactFormProps) {
  const isRtl = locale === 'ar'
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={cn('p-8 rounded-2xl bg-white border border-[#080D18]/8 shadow-sm', isRtl ? 'text-right' : '')}>
      <h2 className="text-xl font-semibold text-[#080D18] mb-6">{title}</h2>

      {status === 'success' ? (
        <div className="py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#0099BB]/10 flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#0099BB]">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-[#080D18]/70">{form.success}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-medium text-[#080D18]/70">
                {form.name}
              </Label>
              <Input
                id="name"
                {...register('name')}
                className={cn(
                  'h-11 text-sm border-[#080D18]/20 focus-visible:ring-[#00D4FF] focus-visible:border-[#00D4FF]',
                  errors.name && 'border-[#C72C2C]'
                )}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-[#C72C2C]" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-xs font-medium text-[#080D18]/70">
                {form.company}
              </Label>
              <Input
                id="company"
                {...register('company')}
                className={cn(
                  'h-11 text-sm border-[#080D18]/20 focus-visible:ring-[#00D4FF]',
                  errors.company && 'border-[#C72C2C]'
                )}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-[#080D18]/70">
                {form.email}
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={cn(
                  'h-11 text-sm border-[#080D18]/20 focus-visible:ring-[#00D4FF]',
                  errors.email && 'border-[#C72C2C]'
                )}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-[#C72C2C]" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-medium text-[#080D18]/70">
                {form.phone}
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                className="h-11 text-sm border-[#080D18]/20 focus-visible:ring-[#00D4FF]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="inquiry_type" className="text-xs font-medium text-[#080D18]/70">
              {form.inquiry_type}
            </Label>
            <select
              id="inquiry_type"
              {...register('inquiry_type')}
              className={cn(
                'w-full h-11 rounded-lg border border-[#080D18]/20 bg-white px-3 text-sm text-[#080D18] focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:border-[#00D4FF]',
                errors.inquiry_type && 'border-[#C72C2C]',
                isRtl ? 'text-right' : ''
              )}
            >
              <option value="" />
              {form.inquiry_options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-xs font-medium text-[#080D18]/70">
              {form.message}
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              rows={5}
              className={cn(
                'text-sm border-[#080D18]/20 focus-visible:ring-[#00D4FF] resize-none',
                errors.message && 'border-[#C72C2C]'
              )}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="text-xs text-[#C72C2C]" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          {status === 'error' && (
            <div aria-live="polite">
              <p className="text-sm text-[#C72C2C]">{form.error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full h-11 rounded-lg bg-[#080D18] text-white text-sm font-medium hover:bg-[#0A0E1A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? '…' : form.submit}
          </button>
        </form>
      )}
    </div>
  )
}
