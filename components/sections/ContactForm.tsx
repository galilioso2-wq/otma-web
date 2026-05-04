'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
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
  _honey: z.string().max(0),
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
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  async function onSubmit(data: FormData) {
    if (data._honey) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })
      if (!res.ok) throw new Error()
      toast.success(form.success, { duration: 6000 })
      reset()
    } catch {
      toast.error(form.error, { duration: 6000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('p-8 rounded-2xl bg-white border border-[#080D18]/8 shadow-sm', isRtl ? 'text-right' : '')}>
      <h2 className="text-xl font-semibold text-[#080D18] mb-6">{title}</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* honeypot — hidden from real users */}
        <input
          {...register('_honey')}
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute w-0 h-0 opacity-0 pointer-events-none"
          autoComplete="off"
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-medium text-[#080D18]/70">
              {form.name}
            </Label>
            <Input
              id="name"
              {...register('name')}
              className={cn(
                'h-11 text-sm border-[#080D18]/20 focus-visible:ring-[#00D4FF] focus-visible:border-[#00D4FF] transition-colors',
                errors.name && 'border-[#C72C2C] focus-visible:ring-[#C72C2C]'
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
                'h-11 text-sm border-[#080D18]/20 focus-visible:ring-[#00D4FF] transition-colors',
                errors.company && 'border-[#C72C2C] focus-visible:ring-[#C72C2C]'
              )}
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? 'company-error' : undefined}
            />
            {errors.company && (
              <p id="company-error" className="text-xs text-[#C72C2C]" role="alert">
                {errors.company.message}
              </p>
            )}
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
                'h-11 text-sm border-[#080D18]/20 focus-visible:ring-[#00D4FF] transition-colors',
                errors.email && 'border-[#C72C2C] focus-visible:ring-[#C72C2C]'
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
              'w-full h-11 rounded-lg border border-[#080D18]/20 bg-white px-3 text-sm text-[#080D18] focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-colors',
              errors.inquiry_type && 'border-[#C72C2C]',
              isRtl ? 'text-right' : ''
            )}
            aria-invalid={!!errors.inquiry_type}
            aria-describedby={errors.inquiry_type ? 'inquiry-error' : undefined}
          >
            <option value="" />
            {form.inquiry_options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.inquiry_type && (
            <p id="inquiry-error" className="text-xs text-[#C72C2C]" role="alert">
              {errors.inquiry_type.message}
            </p>
          )}
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
              'text-sm border-[#080D18]/20 focus-visible:ring-[#00D4FF] resize-none transition-colors',
              errors.message && 'border-[#C72C2C] focus-visible:ring-[#C72C2C]'
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

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-[#080D18] text-white text-sm font-medium hover:bg-[#0A0E1A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '…' : form.submit}
        </button>
      </form>
    </div>
  )
}
