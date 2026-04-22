<script setup lang="ts">
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as const
const sizes = ['sm', 'md', 'lg', 'xl'] as const

function openLink(url: string) {
  navigateTo(url, {
    external: true,
    open: { target: '_blank' },
  })
}
</script>

<template>
  <div class="space-y-4">
    <UAlert
      :title="$t('pages.playground.spinner.description')"
      color="neutral"
      variant="outline"
      icon="simple-icons:heroui"
      :actions="[
        {
          label: 'Hero UI',
          onClick: () => openLink('https://heroui.com'),
        },
        {
          label: 'Spinner',
          color: 'neutral',
          variant: 'subtle',
          onClick: () => openLink('https://heroui.com/docs/react/components/spinner'),
        },
      ]"
    />
    <UCard>
      <template #header>
        {{ $t('pages.playground.spinner.usage') }}
      </template>
      <div class="flex justify-center">
        <Spinner />
      </div>
    </UCard>
    <UCard>
      <template #header>
        {{ $t('pages.playground.spinner.colors') }}
      </template>
      <div class="flex justify-center gap-4 flex-wrap">
        <Spinner v-for="color in colors" :key="color" :color />
      </div>
    </UCard>
    <UCard>
      <template #header>
        {{ $t('pages.playground.spinner.sizes') }}
      </template>
      <div class="flex justify-center items-center gap-4 flex-wrap">
        <Spinner v-for="size in sizes" :key="size" :size />
      </div>
    </UCard>
  </div>
</template>
