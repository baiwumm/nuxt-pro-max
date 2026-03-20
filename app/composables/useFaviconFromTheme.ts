/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-20 13:43:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-20 13:57:25
 * @Description: 动态设置 favicon
 */
import { onMounted, watch } from 'vue'
import FaviconSvg from '../../public/favicon.svg?raw'

export function useFaviconFromTheme() {
  const colorMode = useColorMode()

  function generateFaviconSvg(color: string) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(FaviconSvg, 'image/svg+xml')
    const svg = doc.documentElement

    svg.querySelectorAll('path').forEach((path) => {
      path.setAttribute('fill', color)
    })

    return new XMLSerializer().serializeToString(svg)
  }

  function updateFavicon() {
    const root = document.documentElement
    const color = getComputedStyle(root).getPropertyValue('--ui-primary').trim() || '#00dc82'
    const svg = generateFaviconSvg(color)
    const encoded = `data:image/svg+xml,${encodeURIComponent(svg)}`
    useFavicon(encoded)
  }

  function setupMutationObserver() {
    const styleTag = document.getElementById('nuxt-ui-colors')
    if (!styleTag)
      return

    const observer = new MutationObserver(() => {
      updateFavicon()
    })

    observer.observe(styleTag, {
      characterData: true,
      subtree: true,
      childList: true,
    })
  }

  onMounted(() => {
    watch(colorMode, () => {
      updateFavicon()
    }, {
      immediate: true,
      flush: 'post',
    })

    setupMutationObserver()
  })
}
