import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
// PWA config
import { createPWAConfig } from './plugin/vite-pwa';
// auto import API
import AutoImport from 'unplugin-auto-import/vite';
// auto import UI

// base file router config

// load env variable
import { loadEnvVariable } from './plugin/vite-env';

// config see - https://cn.vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`
    启动时间：${new Date().toLocaleString()} \n
    当前环境：${mode} \n
    加载的环境变量文件：.env && .env.${mode} \n
  `);
  const env = loadEnvVariable(mode);
  return {
    /* see - https://cn.vitejs.dev/config/shared-options#define */
    define: {
      __APP_ENV__: JSON.stringify(env),
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      // PWA config
      createPWAConfig(),
      // 自动引入Vue、Vue Router相关API
      AutoImport({
        // targets to transform - 转换的目标
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          // /\.md$/, // .md
        ],
        imports: ['vue', 'vue-router'],
        dts: './auto-imports.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
