<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')
const UIcon = resolveComponent('UIcon')
const UButton = resolveComponent('UButton')
const USwitch = resolveComponent('USwitch')

const { getMenuList } = useSystemApi()
const keyword = ref('')
const table = useTemplateRef('table')

// 获取菜单列表
const { data, pending: loading, refresh } = useAsyncData(
  'menu',
  async () => {
    const res = await getMenuList({ keyword: keyword.value })
    return res.data ?? []
  },
)

const columns = computed<TableColumn<System.Menu>[]>(() => [
  {
    accessorKey: 'index',
    header: ({ column }) => getHeader(column, $t('common.index'), 'left'),
    cell: ({ row }) => `#${row.index + 1}`,
  },
  {
    accessorKey: 'label',
    header: ({ column }) => getHeader(column, $t('pages.systemSettings.menuManage.label'), 'left'),
    cell: ({ row }) => h(UBadge, { }, () => $t(row.getValue('label'))),
  },
  {
    accessorKey: 'to',
    header: $t('pages.systemSettings.menuManage.to'),
    cell: ({ row }) => {
      return h(UBadge, { variant: 'soft', color: 'secondary' }, () => row.getValue('to'))
    },
  },
  {
    accessorKey: 'icon',
    header: $t('common.icon'),
    cell: ({ row }) => {
      return h(UIcon, { name: row.getValue('icon'), class: 'size-5' })
    },
  },
  {
    accessorKey: 'badge',
    header: $t('pages.systemSettings.menuManage.badge'),
    cell: ({ row }) => {
      const val = row.getValue('badge')
      return val ? h(UBadge, { variant: 'outline', color: 'neutral' }, () => row.getValue('badge')) : '--'
    },
  },
  {
    accessorKey: 'defaultOpen',
    header: $t('pages.systemSettings.menuManage.defaultOpen'),
    cell: ({ row }) => h(USwitch, { disabled: true, uncheckedIcon: 'lucide:x', checkedIcon: 'lucide:check', defaultValue: row.getValue('defaultOpen') }),
  },
  {
    accessorKey: 'enabled',
    header: $t('pages.systemSettings.menuManage.enabled'),
    cell: ({ row }) => h(USwitch, { disabled: true, uncheckedIcon: 'lucide:x', checkedIcon: 'lucide:check', defaultValue: row.getValue('enabled') }),
  },
  {
    accessorKey: 'sort',
    header: $t('common.sort'),
    cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue('sort')),
  },
])

const columnVisibility = ref({
  id: false,
})

// 刷新
async function handleRefresh() {
  await refresh()
}

const columnPinning = ref({
  left: ['index', 'label'],
  right: [],
})

onMounted(() => {
  handleRefresh()
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 ">
        <UInput v-model:model-value="keyword" icon="lucide:search" variant="outline" :placeholder="$t('common.searchKeyword')" />
        <UButton icon="lucide:search" :loading @click="handleRefresh">
          {{ $t('common.search') }}
        </UButton>
        <UButton icon="lucide:plus" color="neutral" variant="outline">
          {{ $t('common.add') }}
        </UButton>
      </div>
      <TableColumnVisibility v-if="table?.tableApi" :table="table.tableApi" />
    </div>
    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      v-model:column-pinning="columnPinning"
      :loading
      :data
      :columns="columns"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
        td: 'border-b border-default',
        separator: 'h-0',
      }"
    />
  </div>
</template>
