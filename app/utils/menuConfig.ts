import type { NavigationMenuItem } from '@nuxt/ui'
import type { Composer } from 'vue-i18n'
import pkg from '~~/package.json'

/**
 * @description: 菜单数据
 */
export const menuData: NavigationMenuItem[][] = [[{
  label: 'pages.title',
  icon: 'lucide:monitor',
  to: '/',
  badge: 'New',
}, {
  label: 'pages.administrative.title',
  icon: 'lucide:clipboard-list',
  defaultOpen: true,
  children: [
    {
      label: 'pages.administrative.message.title',
      icon: 'lucide:bell',
      to: '/administrative/message',
    },
    {
      label: 'pages.administrative.organization.title',
      icon: 'lucide:building-2',
      to: '/administrative/organization',
    },
    {
      label: 'pages.administrative.postManage.title',
      icon: 'lucide:briefcase',
      to: '/administrative/post-manage',
    },
    {
      label: 'pages.administrative.framework.title',
      icon: 'lucide:network',
      to: '/administrative/framework',
    },
  ],
}, {
  label: 'pages.playground.title',
  icon: 'lucide:sparkles',
  defaultOpen: true,
  children: [
    {
      label: 'pages.playground.spinner.title',
      icon: 'lucide:loader',
      to: '/playground/spinner',
    },
  ],
}, {
  label: 'pages.systemSettings.title',
  icon: 'lucide:settings',
  defaultOpen: true,
  children: [
    {
      label: 'pages.systemSettings.userManage.title',
      icon: 'lucide:users',
      to: '/system-settings/user-manage',
    },
    {
      label: 'pages.systemSettings.menuManage.title',
      icon: 'lucide:menu',
      to: '/system-settings/menu-manage',
    },
    {
      label: 'pages.systemSettings.roleManage.title',
      icon: 'lucide:shield',
      to: '/system-settings/role-manage',
    },
    {
      label: 'pages.systemSettings.internalization.title',
      icon: 'lucide:globe',
      to: '/system-settings/internalization',
    },
    {
      label: 'pages.systemSettings.operationLog.title',
      icon: 'lucide:file-text',
      to: '/system-settings/operation-log',
    },
  ],
}], [
  {
    label: 'layout.github',
    icon: 'simple-icons:github',
    to: pkg.git.url,
    target: '_blank',
  },
  {
    label: 'layout.blog',
    icon: 'lucide:house',
    to: 'https://baiwumm.com',
    target: '_blank',
  },
]]

/**
 * @description: 处理 label
 * @param {NavigationMenuItem} items
 */
export function tMenu(items: NavigationMenuItem[], t: Composer['t']): NavigationMenuItem[] {
  return items.map(item => ({
    ...item,
    label: item.label ? t(item.label) : item.label,
    children: item.children ? tMenu(item.children, t) : undefined,
  }))
}

/**
 * @description: 根据路径查找菜单
 * @param {*} menu
 * @param {*} path
 */
export function findMenuByPath(menu: NavigationMenuItem[], path: string): NavigationMenuItem | null {
  for (const item of menu) {
    if (item.to === path)
      return item

    if (item.children) {
      const found = findMenuByPath(item.children, path)
      if (found)
        return found
    }
  }
  return null
}
