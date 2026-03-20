<script setup lang="ts">
import colors from 'tailwindcss/colors'

type TailwindColor = keyof typeof colors

const appStore = useAppStore()

const { primaryColor, blackAsPrimary } = storeToRefs(appStore)
const { setPrimaryColor, setBlackAsPrimary } = appStore

const neutralColors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'taupe', 'mauve', 'mist', 'olive']
const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white', ...neutralColors]
const primaryColors = Object.keys(omit(colors, colorsToOmit as any))

function getColor(color: string, shade: number) {
  return (colors[color as TailwindColor] as Record<number, string>)[shade]
}

// 选择主题回调
function handleColorChange(color: string) {
  setPrimaryColor(color)
  setBlackAsPrimary(false)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="font-bold text-muted text-xs">
      Primary
    </div>
    <div class="grid grid-cols-3 gap-1.5">
      <UButton color="neutral" size="sm" :variant="blackAsPrimary ? 'subtle' : 'outline'" class="capitalize ring-default rounded-sm text-xs" label="black" @click="setBlackAsPrimary(true)">
        <template #leading>
          <span class="inline-block size-2 rounded-full bg-black dark:bg-white" />
        </template>
      </UButton>
      <UButton v-for="color in primaryColors" :key="color" color="neutral" size="sm" :variant="!blackAsPrimary && primaryColor === color ? 'subtle' : 'outline'" class="capitalize ring-default rounded-sm text-xs" :label="color" @click="handleColorChange(color)">
        <template #leading>
          <span
            class="inline-block size-2 rounded-full"
            :style="{
              backgroundColor: getColor(color, 500),
            }"
          />
        </template>
      </UButton>
    </div>
  </div>
</template>
