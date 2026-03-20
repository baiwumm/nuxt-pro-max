/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-20 09:23:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-20 15:22:25
 * @Description: 全局状态
 */
import { defineStore } from 'pinia'
import { COLOR_MODES } from '@/enums'

export const useAppStore = defineStore('app', () => {
  const appConfig = useAppConfig()
  const colorMode = useColorMode()
  // 主题色
  const primaryColor = ref(appConfig.ui.colors.primary)
  const blackAsPrimary = ref(true)
  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
  }
  const setBlackAsPrimary = (val: boolean) => {
    blackAsPrimary.value = val
  }

  // 圆角
  const radius = ref(0.25)
  const setRadius = (val: number) => {
    radius.value = val
  }

  // 是否暗色主题
  const isDark = computed(() => colorMode.value === COLOR_MODES.DARK)
  return {
    primaryColor,
    setPrimaryColor,
    blackAsPrimary,
    setBlackAsPrimary,
    radius,
    setRadius,
    isDark,
  }
}, {
  // 开启持久化
  persist: true,
})
