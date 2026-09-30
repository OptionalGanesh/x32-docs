import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

function getUpdatesSidebar() {
  const updatesDir = path.join(__dirname, '../docs/updates')
  if (!fs.existsSync(updatesDir)) return []
  
  const files = fs.readdirSync(updatesDir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .sort().reverse() // Newest first

  return files.map(file => {
    return {
      text: file.replace('.md', ''),
      link: `/updates/${file.replace('.md', '')}`
    }
  })
}

export default defineConfig({
  title: "X32 Masterclass & Operational Handbook",
  description: "Documentación interactiva y curso técnico para Behringer X32",
  base: '/x32/',
  appearance: 'dark', // Tema oscuro pulido para FOH
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Módulo 1: Flujo de Señal', link: '/module-1-signal-flow/01-architecture' },
      { text: 'Actualizaciones', link: '/updates/' }
    ],
    sidebar: [
      {
        text: 'Módulo 1: Flujo de Señal',
        collapsed: false,
        items: [
          { text: '1. Arquitectura', link: '/module-1-signal-flow/01-architecture' },
          { text: '2. User Routing', link: '/module-1-signal-flow/02-user-routing' },
          { text: '3. Ajuste de Ganancia', link: '/module-1-signal-flow/03-gain-staging' }
        ]
      },
      {
        text: 'Módulo 2: Channel Strip',
        collapsed: false,
        items: [
          { text: '1. Preamplificador y Filtros', link: '/module-2-channel-strip/01-preamp-filters' },
          { text: '2. Puerta y Expansor', link: '/module-2-channel-strip/02-gate-expander' },
          { text: '3. EQ y Compresión', link: '/module-2-channel-strip/03-eq-compression' }
        ]
      },
      {
        text: 'Módulo 3: Buses y Matrix',
        collapsed: false,
        items: [
          { text: '1. Mixbuses e IEMs', link: '/module-3-buses-matrix/01-mixbuses-iem' },
          { text: '2. Matrix y Broadcast', link: '/module-3-buses-matrix/02-matrix-broadcast' },
          { text: '3. DCAs vs Subgrupos', link: '/module-3-buses-matrix/03-dca-vs-subgroups' }
        ]
      },
      {
        text: 'Módulo 4: Rack de FX',
        collapsed: false,
        items: [
          { text: '1. Slots de Rack', link: '/module-4-fx-rack/01-rack-slots' },
          { text: '2. Emulaciones Clásicas', link: '/module-4-fx-rack/02-emulations' }
        ]
      },
      {
        text: 'Módulo 5: Flujos de Trabajo',
        collapsed: false,
        items: [
          { text: '1. Virtual Soundcheck', link: '/module-5-workflows/01-virtual-soundcheck' },
          { text: '2. Escenas y Snippets', link: '/module-5-workflows/02-scenes-snippets' },
          { text: '3. Red y OSC', link: '/module-5-workflows/03-network-osc' }
        ]
      },
      {
        text: 'Actualizaciones & Ecosistema',
        collapsed: false,
        items: [
          { text: 'Historial', link: '/updates/' },
          ...getUpdatesSidebar()
        ]
      }
    ]
  }
})
