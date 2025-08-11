import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    port: 5173,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Split performance modules for lazy loading
          'performance': ['./src/modules/performance-monitor.js', './src/modules/lazy-loader.js'],
          // Split modal system
          'modals': ['./src/modules/modal-manager.js', './src/modules/modal-creator.js'],
          // Split AI features
          'ai-features': ['./src/components/ai-integration.js']
        }
      }
    },
    // Enable advanced optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true // Better Safari compatibility
      }
    },
    // Optimize CSS
    cssCodeSplit: true,
    // Asset optimization
    assetsInlineLimit: 4096, // Inline small assets
    chunkSizeWarningLimit: 1000 // Warn for chunks > 1MB
  },
  // CSS preprocessing optimizations
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      css: {
        charset: false // Remove @charset rules
      }
    }
  },
  // Development optimizations
  optimizeDeps: {
    include: ['./src/modules/performance-monitor.js']
  }
})
