import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteImagemin from 'vite-plugin-imagemin';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import critical from 'vite-plugin-critical';

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      svgo: { plugins: [{ removeViewBox: false }] },
    }),
    compression(), 
    VitePWA({ registerType: 'autoUpdate' }),
    critical({
      criticalUrl: 'https://billah.dev',
      width: 375,
      height: 812,
    })
  ],
  base: '/', // Correct asset path for custom domains
});
