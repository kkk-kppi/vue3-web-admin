// see - https://cn.vitejs.dev/config/#using-environment-variables-in-config
// vite的配置文件默认是不加载env文件的，需要特殊处理一下
import { loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'

export function loadEnvVariable(mode: ConfigEnv['mode']) {
  // mode 默认是development
  // process.cwd() 获取当前工作目录, 这里需要拼接好指向env文件所在的目录
  return loadEnv(mode, process.cwd() + '/', '')
}
