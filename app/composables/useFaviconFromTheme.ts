/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-20 13:43:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-20 15:13:38
 * @Description: 动态设置 favicon
 */
import colors from 'tailwindcss/colors'
import { onMounted, watch } from 'vue'

import FaviconSvg from '../../public/favicon.svg?raw'

export function useFaviconFromTheme() {
  const colorMode = useColorMode()
  const appStore = useAppStore()

  // 🎨 获取真实颜色（完全不依赖 CSS 变量）
  function getPrimaryColor(): string {
    // 👇 黑白模式优先
    if (appStore.blackAsPrimary) {
      return appStore.isDark ? '#ffffff' : '#000000'
    }

    // 👇 Tailwind 色板
    const color = appStore.primaryColor as keyof typeof colors
    const palette = colors[color]

    // 防御（避免 black/white 这种非对象）
    if (typeof palette === 'object') {
      return appStore.isDark
        ? (palette[400] as string)
        : (palette[500] as string)
    }

    return '#00dc82' // fallback
  }

  // 🎯 生成 SVG
  function generateFaviconSvg(color: string) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(FaviconSvg, 'image/svg+xml')
    const svg = doc.documentElement

    svg.querySelectorAll('path').forEach((path) => {
      path.setAttribute('fill', color)
    })

    return new XMLSerializer().serializeToString(svg)
  }

  // 🔄 更新 favicon
  function updateFavicon() {
    const color = getPrimaryColor()

    const svg = generateFaviconSvg(color)
    const encoded = `data:image/svg+xml,${encodeURIComponent(svg)}`

    useFavicon(encoded)
  }

  // 👀 监听所有主题变化
  onMounted(() => {
    watch(
      () => [
        colorMode.value,
        appStore.primaryColor,
        appStore.blackAsPrimary,
      ],
      () => {
        updateFavicon()
      },
      {
        immediate: true,
      },
    )
  })
}
