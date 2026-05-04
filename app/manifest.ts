import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OTMA — Intelligent AI Agents',
    short_name: 'OTMA',
    description: 'OTMA builds AI agents that synthesize your business data into measurable outcomes.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#080D18',
    theme_color: '#00D4FF',
    icons: [
      {
        src: '/brand/otma_icon_only.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
