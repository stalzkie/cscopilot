import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // This plugin handles PostCSS internally for v4
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Convert `import.meta.url` to `__dirname` for proper aliasing
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Rely solely on this plugin for Tailwind CSS v4 integration
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // Removed the explicit `css.postcss` configuration.
  // @tailwindcss/vite handles this automatically for Tailwind CSS v4.
});
