import { VitePWA } from 'vite-plugin-pwa'

/**
 * 返回一个 VitePWAOptions 对象
 * @returns {import('vite-plugin-pwa').VitePWAOptions} pwa配置
 */
// 目前存疑, 产物有更新后, 似乎没有立即生效, 提示更新
export const createPWAConfig = () => {
  return VitePWA({
    injectRegister: 'auto',
    registerType: 'prompt', // prompt | autoUpdate
    devOptions: {
      enabled: true, // 开发环境查看PWA效果
    },
    // 提供图片以满足PWA的最低要求
    manifest: {
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  })
}
