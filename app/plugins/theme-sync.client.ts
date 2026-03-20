export default defineNuxtPlugin(() => {
  const appStore = useAppStore()
  const appConfig = useAppConfig()
  const colorMode = useColorMode()

  watchEffect(() => {
    const root = document.documentElement
    if (appStore.blackAsPrimary) {
      const isDark = colorMode.value === 'dark'
      root.style.setProperty(
        '--ui-primary',
        isDark ? 'white' : 'black',
      )
    }
    else {
      root.style.removeProperty('--ui-primary')
      appConfig.ui.colors.primary = appStore.primaryColor
    }
  })
})
