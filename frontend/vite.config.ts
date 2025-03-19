import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Making sure our app always runs on port 3000
  server: {
    port: 3000,
  },
});
