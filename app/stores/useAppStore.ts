/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-20 09:23:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-20 12:09:23
 * @Description: 全局状态
 */
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const appConfig = useAppConfig()
  // 主题色
  const primaryColor = ref(appConfig.ui.colors.primary)
  const blackAsPrimary = ref(true)
  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
  }
  const setBlackAsPrimary = (val: boolean) => {
    blackAsPrimary.value = val
  }
  return {
    primaryColor,
    setPrimaryColor,
    blackAsPrimary,
    setBlackAsPrimary,
  }
}, {
  // 开启持久化
  persist: true,
})
