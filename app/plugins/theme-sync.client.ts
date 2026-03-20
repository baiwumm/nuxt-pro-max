export default defineNuxtPlugin(() => {
  const appStore = useAppStore()
  const appConfig = useAppConfig()

  watchEffect(() => {
    const root = document.documentElement
    if (appStore.blackAsPrimary) {
      root.style.setProperty(
        '--ui-primary',
        appStore.isDark ? 'white' : 'black',
      )
    }
    else {
      root.style.removeProperty('--ui-primary')
      appConfig.ui.colors.primary = appStore.primaryColor
    }
  })

  watch(() => appStore.radius, () => {
    const root = document.documentElement
    root.style.setProperty(
      '--ui-radius',
      `${appStore.radius}rem`,
    )
  }, {
    immediate: true,
  })
})
