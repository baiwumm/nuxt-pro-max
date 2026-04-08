<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import pkg from '~~/package.json'

const open = ref(false)

const items: NavigationMenuItem[][] = [[{
  label: $t('pages.dashboard.title'),
  icon: 'lucide:monitor',
  to: '/dashboard',
  badge: 'New',
}, {
  label: $t('pages.systemSettings.title'),
  icon: 'i-lucide-settings',
  defaultOpen: true,
  type: 'trigger',
  children: [{
    label: $t('pages.systemSettings.userManage.title'),
    icon: 'ri:group-line',
    to: '/system-settings/user-manage',
  }],
}], [{
  label: 'Github',
  icon: 'simple-icons:github',
  to: pkg.git.url,
  target: '_blank',
}, {
  label: '个人博客',
  icon: 'i-lucide-house',
  to: 'https://baiwumm.com',
  target: '_blank',
}]]
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="items[0]"
          orientation="vertical"
          tooltip
          popover
        />
      </template>
    </UDashboardSidebar>
    <slot />
  </UDashboardGroup>
</template>
