<script setup lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui'
import { findMenuByPath, menuData, tMenu } from '@/utils/menuConfig'

const open = ref(false)
const route = useRoute()
const { t } = useI18n()

const items = computed(() => {
  return menuData.map(menu => tMenu(menu, t))
})

// 动态标题
const title = computed(() => {
  if (!menuData[0]) {
    return ''
  }
  const item = findMenuByPath(menuData[0], route.path)
  return item?.label ? t(item.label) : ''
})

const groups = computed(() => [{
  id: 'searchMenu',
  label: $t('layout.searchMenu'),
  items: items.value[0],
}, {
  id: 'friendLink',
  label: $t('layout.friendLink'),
  items: items.value[1],
}] as CommandPaletteGroup<CommandPaletteItem>[])
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
          :items="items[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed
          :items="items[1]"
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
