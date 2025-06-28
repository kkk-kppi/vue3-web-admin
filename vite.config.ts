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
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
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
      // 自动引入Vue、Vue Router相关API；按需引入TDesign UI组件
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
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
      // 自动引入组件
      Components({
        resolvers: [
          // TDesign Resolver Config - https://github.com/unplugin/unplugin-vue-components/blob/main/src/core/resolvers/tdesign.ts#L5
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
