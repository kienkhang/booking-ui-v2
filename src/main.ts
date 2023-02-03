import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

import './styles/index.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes }, (ctx) => {
  // install all modules under `modules/`
  Object.values(
    import.meta.glob<{ install: UserModule }>('./modules/*.ts', {
      eager: true,
    })
  ).forEach((i) => i.install?.(ctx))
})
