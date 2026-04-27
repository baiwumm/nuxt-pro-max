<script setup lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem, NavigationMenuItem } from '@nuxt/ui'
import pkg from '~~/package.json'
import { useMenuStore } from '@/stores/useMenuStore'

const menuStore = useMenuStore()

const open = ref(false)
const route = useRoute()
const { t } = useI18n()

const menuItems = computed(() => {
  const list = menuStore.menuTree ?? []
  return tMenu(list, t)
})

// 动态标题
const title = computed(() => {
  if (!menuStore.menuTree) {
    return ''
  }
  const item = findMenuByPath(menuStore.menuTree, route.path)
  return item?.label ? t(item.label) : ''
})

const groups = computed(() => [{
  id: 'searchMenu',
  label: $t('layout.searchMenu'),
  items: menuItems.value,
}, {
  id: 'friendLink',
  label: $t('layout.friendLink'),
  items: [
    {
      label: $t('layout.github'),
      icon: 'simple-icons:github',
      to: pkg.git.url,
      target: '_blank',
    },
    {
      label: $t('layout.blog'),
      icon: 'lucide:house',
      to: 'https://baiwumm.com',
      target: '_blank',
    },
  ],
}] as CommandPaletteGroup<CommandPaletteItem>[])

onMounted(async () => {
  await menuStore.init()
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <SidebarLogo :collapsed />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed
          :items="menuItems as NavigationMenuItem[]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed
          :items="groups[1]?.items"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #title>
            <Transition
              mode="out-in"
              enter-active-class="transition-all duration-500"
              enter-from-class="opacity-0 translate-x-[-10px] blur-sm"
              enter-to-class="opacity-100 translate-x-0 blur-0"
              leave-active-class="transition-all duration-500"
              leave-from-class="opacity-100 translate-x-0 blur-0"
              leave-to-class="opacity-0 translate-x-[10px] blur-sm"
            >
              <span :key="title" class="block">
                {{ title }}
              </span>
            </Transition>
          </template>
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
        </UDashboardNavbar>
      </template>
      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
