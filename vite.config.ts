import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
// import Pages from 'vite-plugin-pages'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// Icon
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      // Allow .vue and .ts file access
      extensions: ['.vue', '.ts'],
      dts: 'src/typed-router.d.ts',
    }),
    vue(),
    // https://github.com/antfu/unplugin-icons
    Icons({
      compiler: 'vue3',
      customCollections: {
        local: FileSystemIconLoader('./src/assets/icons', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
      },
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    // Pages({
    //   extensions: ['vue', 'md'],
    //   exclude: ['**/components/*.vue'],
    // }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
        // 'vue-router',
        VueRouterAutoImports,
        {
          pinia: ['defineStore'],
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores', 'src/components/**/*.vue'],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [
        IconsResolver({
          prefix: 'i',
          customCollections: ['local'],
        }),
      ],
    }),
  ],
})
