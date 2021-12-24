const path = require('path')
const { defineConfig } = require('vite')
const { createVuePlugin } = require('vite-plugin-vue2');

module.exports = {
  plugins: [createVuePlugin()],
  resolve:{
    alias:{
      '@lib' : path.resolve(__dirname, '../../lib')
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.js'),
      name: 'walkthroughjs',
      fileName: (format) => `vue2.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
};
