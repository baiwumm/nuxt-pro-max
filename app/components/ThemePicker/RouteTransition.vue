<script setup lang="ts">
import { ROUTE_TRANSITION } from '@/enums'

const appStore = useAppStore()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="font-bold text-muted text-xs">
      {{ $t('components.themePicker.transition') }}
    </div>
    <USelectMenu
      v-model="appStore.transition"
      value-key="value"
      :items="ROUTE_TRANSITION.items.map(({ value, label, raw }) => ({ value, label: $t(label), icon: raw.icon }))"
    />
  </div>
</template>
