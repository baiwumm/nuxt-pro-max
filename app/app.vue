<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const menuStore = useMenuStore()
const appStore = useAppStore()

const { locale } = useI18n()

const localeMap = {
  'en': 'en',
  'zh-CN': 'zh_cn',
} as const

const uiLocale = computed(() => locales[localeMap[locale.value]])

const lang = computed(() => uiLocale.value.code)
const dir = computed(() => uiLocale.value.dir)

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
})

useFaviconFromTheme()
</script>

<template>
  <UApp :locale="uiLocale" :toaster="{ position: 'top-center', duration: 2000 }">
    <UTheme
      :ui="{
        button: {
          base: 'cursor-pointer',
        },
      }"
    >
      <FullLoading />
      <NuxtLoadingIndicator color="var(--ui-primary)" />
      <UMain>
        <NuxtLayout>
          <NuxtPage
            :transition="{ name: appStore.transition, mode: 'out-in' }"
            :keepalive="{ include: menuStore.keepAliveList }"
          />
        </NuxtLayout>
      </UMain>
    </UTheme>
  </UApp>
</template>
