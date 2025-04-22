/// <reference types="vite/client" />

interface ViteTypeOptions {
  // 添加这行代码，你就可以将 ImportMetaEnv 的类型设为严格模式，这样就不允许有未知的键值了。
  strictImportMetaEnv: unknown
}

// 环境变量类型声明
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 配置.vue结尾的类型声明
declare module '*.vue' {
  import { DefineComponent, ComponentOptions } from 'vue'
  // 组合式API组件 | 选项式API组件
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const component: DefineComponent<{}, {}, unknown> | ComponentOptions
  export default component
}
