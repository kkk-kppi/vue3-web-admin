import { VitePWA } from 'vite-plugin-pwa';
import { loadEnvVariable } from './vite-env';

/**
 * 返回一个 VitePWAOptions 对象
 * @returns {import('vite-plugin-pwa').VitePWAOptions} pwa配置
 */
// TODO FIX : 目前存疑, 产物有更新后, 似乎没有立即生效, 提示更新
export const createPWAConfig = (mode: string) => {
  const env = loadEnvVariable(mode);
  return VitePWA({
    injectRegister: 'auto',
    registerType: 'prompt', // prompt | autoUpdate
    devOptions: {
      enabled: true, // 开发环境查看PWA效果
    },
    // 提供图片以满足PWA的最低要求
    // VITE_APP_BASE_URL为统一配置的基础路径
    manifest: {
      display_override: ['fullscreen', 'minimal-ui'],
      display: 'standalone',
      icons: [
        {
          src: env.VITE_APP_BASE_URL + 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: env.VITE_APP_BASE_URL + 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        // 桌面设备和移动设备图标设配处理，添加1张“form_factor”为wide的屏幕截图
      ],
    },
    workbox: {
      runtimeCaching: [
        // 缓存图片
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        // 缓存字体
        {
          urlPattern: /\.(?:eot|otf|ttf|woff|woff2)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts',
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        // 缓存其他资源
        {
          urlPattern: /\.(?:js|css)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-resources',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  });
};
