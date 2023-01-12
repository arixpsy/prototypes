import { defineConfig } from 'vite'
import * as path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
        "@": path.resolve(__dirname, 'src'),
    },
}
})
