import { defineConfig, loadEnv } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { join } from 'path';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'VUE_APP') };
  return {
    server: {
      port: 8080,
      host: true,
    },
    preview: {
      port: 8080,
      host: true,
    },
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
      },
    },
    envPrefix: 'VUE_APP',
    define: {
      'process.env': process.env,
    },
    plugins: [createVuePlugin()],
  };
});
