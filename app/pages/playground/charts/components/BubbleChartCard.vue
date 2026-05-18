<script lang="ts" setup>
import { randomInt } from 'es-toolkit/math'
import CardTitle from './CardTitle.vue'

defineProps<{
  days: number
  height: number
}>()

const colorMode = useColorMode()
const dayjs = useDayjs()

// 动态生成月份缩写
const monthNames = computed(() =>
  Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('M月')),
)

const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  'JavaScript': {
    name: 'JavaScript',
    color: 'var(--ui-primary)',
  },
  'Python': {
    name: 'Python',
    color: 'var(--ui-info)',
  },
  'C++': {
    name: 'C++',
    color: 'var(--ui-success)',
  },
  'Java': {
    name: 'Java',
    color: 'var(--ui-warning)',
  },
  'Go': {
    name: 'Go',
    color: 'var(--ui-error)',
  },
}))

// 获取数据
const { data: chartData, pending, refresh } = await useAsyncData(
  'bubble-chart-data',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const data = []
    for (let i = 0; i < monthNames.value.length; i++) {
      const monthAbbr = monthNames.value[i]

      const languages = Object.keys(categories.value)

      for (let j = 0; j < languages.length; j++) {
        const title = languages[j]
        data.push({
          id: `${monthAbbr}: ${title}`,
          title,
          month: i + 1,
          languageIndex: randomInt(10, 100),
        })
      }
    }
    return data
  },
)

const description = computed(() => $t('pages.playground.charts.languageIndex'))
</script>

<template>
  <UCard :description :ui="{ body: 'relative' }">
    <BubbleChart
      :key="colorMode.value"
      :data="chartData || []"
      :height
      :categories
      category-key="title"
      :x-accessor="d => d.month"
      :y-accessor="d => d.languageIndex"
      :y-domain-line="false"
      :size-accessor="d => d.languageIndex"
      :legend-position="LegendPosition.BottomCenter"
      :legend-style="{ marginTop: '10px' }"
      :x-num-ticks="12"
      :x-formatter="(tick: number) => monthNames[tick - 1] ?? String(tick)"
    >
      <template #tooltip="{ values }">
        <div class="p-2">
          {{ values ? `${values.title} ${monthNames[values.month - 1]}指数: ${values.languageIndex}` : '' }}
        </div>
      </template>
    </BubbleChart>
    <template #title>
      <CardTitle title-key="bubbleChart" :loading="pending" :refresh />
    </template>
    <ContainerLoading v-if="pending" />
  </UCard>
</template>
