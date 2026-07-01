'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

/* ── types ── */
interface TechItem {
  name: string
  slug: string | null  // SimpleIcons slug — null = text-only fallback
}

interface TechCategory {
  titleEn: string
  titleAr: string
  accent: string
  items: TechItem[]
}

/* ── static data ── */
const CATEGORIES: TechCategory[] = [
  {
    titleEn: 'Databases & Platforms',
    titleAr: 'قواعد البيانات والمنصات',
    accent: '#7C3AED',
    items: [
      { name: 'Oracle',       slug: null },
      { name: 'Snowflake',    slug: 'snowflake' },
      { name: 'SQL Server',   slug: null },
      { name: 'IBM DB2',      slug: null },
      { name: 'ClickHouse',   slug: 'clickhouse' },
      { name: 'PostgreSQL',   slug: 'postgresql' },
    ],
  },
  {
    titleEn: 'Data Transformation',
    titleAr: 'تحويل البيانات والتكامل',
    accent: '#00D4FF',
    items: [
      { name: 'Databricks',         slug: 'databricks' },
      { name: 'Informatica',        slug: null },
      { name: 'Alteryx',            slug: null },
      { name: 'Azure Data Factory', slug: 'microsoftazure' },
      { name: 'Microsoft Fabric',   slug: null },
      { name: 'Apache NiFi',        slug: 'apachenifi' },
      { name: 'Pentaho',            slug: null },
    ],
  },
  {
    titleEn: 'Visualization & BI',
    titleAr: 'التصور البصري والذكاء التحليلي',
    accent: '#F59E0B',
    items: [
      { name: 'Power BI',        slug: null },
      { name: 'Tableau',         slug: null },
      { name: 'Grafana',         slug: 'grafana' },
      { name: 'Looker',          slug: 'looker' },
      { name: 'Qlik',            slug: 'qlik' },
      { name: 'Apache Superset', slug: 'apachesuperset' },
      { name: 'MicroStrategy',   slug: null },
    ],
  },
  {
    titleEn: 'AI Engineering',
    titleAr: 'هندسة الذكاء الاصطناعي',
    accent: '#EF4444',
    items: [
      { name: 'OpenAI',       slug: null },
      { name: 'LangChain',    slug: 'langchain' },
      { name: 'Claude',       slug: 'anthropic' },
      { name: 'Gemini',       slug: 'googlegemini' },
      { name: 'Meta LLaMA',   slug: 'meta' },
      { name: 'Mistral AI',   slug: 'mistralai' },
      { name: 'CrewAI',       slug: null },
      { name: 'Qdrant',       slug: 'qdrant' },
    ],
  },
]

const CLOUD_PLATFORMS = [
  { name: 'Google Cloud Platform', slug: 'googlecloud',    color: '4285F4', label: 'Google Cloud' },
  { name: 'Amazon Web Services',   slug: null,             color: 'FF9900', label: 'AWS' },
  { name: 'Microsoft Azure',       slug: 'microsoftazure', color: '0078D4', label: 'Azure' },
]

/* ── Logo image with error handling ── */
function LogoImg({ slug, name, accent }: { slug: string; name: string; accent: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return (
    <span
      className="w-[22px] h-[22px] flex-shrink-0 rounded-md text-[9px] font-bold flex items-center justify-center"
      style={{ background: `${accent}25`, color: accent }}
      aria-hidden="true"
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  )
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/ffffff`}
      alt=""
      width={22}
      height={22}
      loading="lazy"
      onError={() => setFailed(true)}
      className="object-contain flex-shrink-0"
      aria-hidden="true"
    />
  )
}

function CloudImg({ slug, color, name }: { slug: string | null; color: string; name: string }) {
  const [failed, setFailed] = useState(false)
  if (!slug || failed) return (
    <span
      className="w-12 h-12 flex-shrink-0 rounded-xl text-sm font-bold flex items-center justify-center"
      style={{ background: `#${color}20`, color: `#${color}` }}
    >
      {name.slice(0, 3).toUpperCase()}
    </span>
  )
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt={name}
      width={48}
      height={48}
      loading="lazy"
      onError={() => setFailed(true)}
      className="object-contain flex-shrink-0"
    />
  )
}

/* ── Category card ── */
function CategoryCard({
  category,
  isRtl,
  index,
  prefersReduced,
}: {
  category: TechCategory
  isRtl: boolean
  index: number
  prefersReduced: boolean | null
}) {
  const title = isRtl ? category.titleAr : category.titleEn

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col gap-5 p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-[#0D1421]/10 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none"
    >
      {/* coloured top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: category.accent }}
      />

      {/* category title */}
      <h3
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: category.accent }}
      >
        {title}
      </h3>

      {/* logo grid */}
      <div className="grid grid-cols-2 gap-2">
        {category.items.map((item) => (
          <div
            key={item.name}
            className={cn(
              'flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#F4F7FD] dark:bg-white/[0.04] border border-[#0D1421]/8 dark:border-white/8 hover:border-[#0D1421]/20 dark:hover:border-white/20 hover:bg-[#EAF0FA] dark:hover:bg-white/[0.08] transition-all duration-150',
              isRtl ? 'flex-row-reverse' : ''
            )}
          >
            {item.slug && <LogoImg slug={item.slug} name={item.name} accent={category.accent} />}
            {!item.slug && (
              <span
                className="w-[22px] h-[22px] flex-shrink-0 rounded-md text-[9px] font-bold flex items-center justify-center"
                style={{ background: `${category.accent}25`, color: category.accent }}
                aria-hidden="true"
              >
                {item.name.slice(0, 2).toUpperCase()}
              </span>
            )}
            <span className={cn('text-xs font-medium text-[#0D1421]/70 dark:text-white/70 leading-tight', isRtl ? 'text-right' : '')}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Main export ── */
interface TechStackGridProps {
  locale: string
  label: string
  title: string
  subtitle: string
  cloudLabel: string
  cloudNote: string
}

export function TechStackGrid({ locale, label, title, subtitle, cloudLabel, cloudNote }: TechStackGridProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="bg-[#F7F9FC] dark:bg-[#050508] py-14 border-t border-[#0D1421]/6 dark:border-white/6"
      aria-labelledby="tech-stack-heading"
    >
      <Container>
        {/* heading */}
        <motion.div
          className="mb-10 text-center"
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0099BB] dark:text-[#00D4FF] mb-3">
            {label}
          </p>
          <h2
            id="tech-stack-heading"
            className="text-3xl sm:text-4xl font-semibold text-[#0D1421] dark:text-white font-display leading-tight max-w-3xl mx-auto"
          >
            {title}
          </h2>
          <p className="mt-4 text-[#0D1421]/50 dark:text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* 4 category cards — 2×2 on lg, 1 col on mobile */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.titleEn}
              category={cat}
              isRtl={isRtl}
              index={i}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>

        {/* cloud platforms row */}
        <motion.div
          className="mt-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-[#0D1421]/10 dark:border-white/10 p-6 shadow-sm dark:shadow-none"
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={cn('flex flex-col sm:flex-row sm:items-center gap-6', isRtl ? 'sm:flex-row-reverse' : '')}>
            {/* label block */}
            <div className={cn('sm:w-52 flex-shrink-0', isRtl ? 'text-right' : '')}>
              <p className="text-sm font-semibold text-[#0D1421]/80 dark:text-white/80">{cloudLabel}</p>
              <p className="text-xs text-[#0D1421]/35 dark:text-white/35 mt-1 leading-relaxed">{cloudNote}</p>
            </div>

            {/* divider */}
            <div className="hidden sm:block w-px h-12 bg-[#0D1421]/12 dark:bg-white/12 flex-shrink-0" aria-hidden="true" />

            {/* cloud logos */}
            <div className={cn('flex flex-wrap gap-6 flex-1', isRtl ? 'justify-end' : 'justify-start sm:justify-around')}>
              {CLOUD_PLATFORMS.map((cloud) => (
                <div
                  key={cloud.name}
                  className={cn('flex items-center gap-3', isRtl ? 'flex-row-reverse' : '')}
                >
                  <CloudImg slug={cloud.slug} color={cloud.color} name={cloud.name} />
                  <div className={isRtl ? 'text-right' : ''}>
                    <p className="text-sm font-semibold text-[#0D1421]/80 dark:text-white/80">{cloud.label}</p>
                    <p className="text-xs text-[#0D1421]/35 dark:text-white/35">{cloud.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
