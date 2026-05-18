<script lang="ts" setup>
import { randomInt } from 'es-toolkit/math'

defineProps<{
  height: number
}>()

const colorMode = useColorMode()
const dayjs = useDayjs()

export interface TimelineItem {
  name: string
  color: string
  startDate: number
  endDate: number
  department: 'Frontend' | 'Backend' | 'UX'
  description?: string
  label?: string
  progress?: number // 完成进度百分比
  priority?: 'High' | 'Medium' | 'Low' // 优先级
}

enum ProductType {
  Frontend = 'Frontend',
  Backend = 'Backend',
  UX = 'UX',
}

// 工具函数：生成随机日期范围
function getRandomDateRange(startMonth: number, endMonth: number, minDays: number, maxDays: number) {
  const startDate = dayjs(`2026-${startMonth.toString().padStart(2, '0')}-01`)
    .add(randomInt(0, 28), 'day')

  const duration = randomInt(minDays, maxDays + 50)
  const endDate = startDate.add(duration, 'day')

  // 确保不超出指定月份范围
  const maxEndDate = dayjs(`2026-${endMonth.toString().padStart(2, '0')}-28`)

  return {
    startDate: startDate.valueOf(),
    endDate: endDate.isAfter(maxEndDate) ? maxEndDate.valueOf() : endDate.valueOf(),
  }
}

const COLORS = {
  Frontend: '#FF5733',
  Backend: '#33FF57',
  UX: '#3357FF',
}

// 生成项目路线图数据
function generateRoadmapData(): TimelineItem[] {
  const phases = [
    {
      name: '项目启动与需求分析',
      period: { start: 1, end: 2 },
      departments: ['UX', 'Backend'] as const,
      items: [
        { name: '市场调研与竞品分析', dept: 'UX', days: [5, 10], desc: '完成市场分析报告和竞品对比' },
        { name: '产品需求定义(PRD)', dept: 'UX', days: [7, 12], desc: '编写详细的产品需求文档' },
        { name: '技术方案设计', dept: 'Backend', days: [10, 15], desc: '系统架构设计和技术选型' },
        { name: 'UI/UX 原型设计', dept: 'UX', days: [8, 14], desc: '高保真原型和设计规范' },
      ],
    },
    {
      name: '基础架构搭建',
      period: { start: 2, end: 3 },
      departments: ['Frontend', 'Backend'] as const,
      items: [
        { name: '项目脚手架搭建', dept: 'Frontend', days: [3, 5], desc: 'Vue3 + Vite + TypeScript 配置' },
        { name: '数据库设计与建模', dept: 'Backend', days: [5, 8], desc: '完成数据库ER图和建模' },
        { name: 'CI/CD 流水线配置', dept: 'Backend', days: [4, 6], desc: 'GitLab CI/CD 自动化部署' },
        { name: '基础组件库开发', dept: 'Frontend', days: [10, 15], desc: '通用组件库封装' },
      ],
    },
    {
      name: '核心功能开发',
      period: { start: 3, end: 6 },
      departments: ['Frontend', 'Backend'] as const,
      items: [
        { name: '用户认证授权系统', dept: 'Backend', days: [12, 18], desc: 'JWT + OAuth2.0 认证' },
        { name: '管理后台基础框架', dept: 'Frontend', days: [10, 15], desc: '布局、路由、状态管理' },
        { name: '数据API开发', dept: 'Backend', days: [15, 20], desc: 'RESTful API + GraphQL' },
        { name: '数据可视化模块', dept: 'Frontend', days: [12, 18], desc: 'ECharts/D3.js 图表集成' },
        { name: '报表统计引擎', dept: 'Backend', days: [10, 15], desc: '数据统计和报表生成' },
      ],
    },
    {
      name: '用户体验优化',
      period: { start: 6, end: 8 },
      departments: ['Frontend', 'UX'] as const,
      items: [
        { name: '移动端适配', dept: 'Frontend', days: [10, 14], desc: '响应式布局和移动端优化' },
        { name: '性能优化', dept: 'Frontend', days: [8, 12], desc: '首屏加载、打包优化' },
        { name: '用户行为追踪', dept: 'UX', days: [6, 10], desc: '埋点数据分析和热力图' },
        { name: '国际化支持', dept: 'Frontend', days: [5, 8], desc: 'i18n 多语言配置' },
      ],
    },
    {
      name: '高级功能开发',
      period: { start: 7, end: 10 },
      departments: ['Frontend', 'Backend'] as const,
      items: [
        { name: '实时通知系统', dept: 'Backend', days: [10, 15], desc: 'WebSocket 实时推送' },
        { name: 'AI 智能推荐', dept: 'Backend', days: [15, 20], desc: '机器学习推荐算法' },
        { name: '工作流引擎', dept: 'Backend', days: [12, 18], desc: '审批流程和任务调度' },
        { name: '大屏数据看板', dept: 'Frontend', days: [10, 14], desc: '数据大屏可视化' },
      ],
    },
    {
      name: '测试与质量保证',
      period: { start: 8, end: 11 },
      departments: ['Frontend', 'Backend'] as const,
      items: [
        { name: '单元测试编写', dept: 'Backend', days: [10, 15], desc: 'Jest 单元测试覆盖率>80%' },
        { name: 'E2E 测试', dept: 'Frontend', days: [8, 12], desc: 'Cypress 端到端测试' },
        { name: '压力测试', dept: 'Backend', days: [5, 8], desc: 'JMeter 性能压测' },
        { name: '安全审计', dept: 'Backend', days: [6, 10], desc: '安全漏洞扫描和修复' },
      ],
    },
    {
      name: '部署与上线',
      period: { start: 11, end: 12 },
      departments: ['Frontend', 'Backend', 'UX'] as const,
      items: [
        { name: '灰度发布', dept: 'Backend', days: [5, 7], desc: '逐步放量和监控' },
        { name: '文档编写', dept: 'UX', days: [8, 12], desc: '用户手册和开发文档' },
        { name: '上线部署', dept: 'Backend', days: [3, 5], desc: '生产环境部署' },
        { name: '运维监控配置', dept: 'Backend', days: [4, 6], desc: 'Prometheus + Grafana' },
      ],
    },
  ]

  const data: TimelineItem[] = []
  for (const phase of phases) {
    for (const item of phase.items) {
      const { startDate, endDate } = getRandomDateRange(
        phase.period.start,
        phase.period.end,
        item.days[0] ?? 0,
        item.days[1] ?? 0,
      )

      // 根据部门获取颜色
      let color = COLORS.Frontend
      if (item.dept === 'Backend')
        color = COLORS.Backend
      if (item.dept === 'UX')
        color = COLORS.UX

      data.push({
        name: item.name,
        color,
        startDate,
        endDate,
        department: item.dept as TimelineItem['department'],
        description: item.desc,
        label: phase.name,
        progress: randomInt(0, 100),
        priority: ['High', 'Medium', 'Low'][randomInt(0, 2)] as 'High' | 'Medium' | 'Low',
      })
    }
  }

  // 按开始时间排序
  return data.sort((a, b) => a.startDate - b.startDate)
}

const data = generateRoadmapData()

// X轴访问器：获取开始时间
const x = (d: TimelineItem) => d.startDate

// 长度访问器：计算任务持续时间
const length = (d: TimelineItem) => d.endDate - d.startDate

// 类型访问器：任务名称
const type = (d: TimelineItem) => d.name

// 分类配置
const categories: Record<string, BulletLegendItemInterface> = {
  [ProductType.Frontend]: {
    name: '前端',
    color: 'var(--ui-success)',
  },
  [ProductType.Backend]: {
    name: '后端',
    color: 'var(--ui-info)',
  },
  [ProductType.UX]: {
    name: 'UI 设计',
    color: 'var(--ui-warning)',
  },
}
</script>

<template>
  <UCard :title="$t('pages.playground.charts.ganttChart.title')" :description="$t('pages.playground.charts.ganttChart.description', { year: dayjs().year() })" :ui="{ body: 'relative' }">
    <GanttChart
      :key="colorMode.value"
      :data="data"
      show-labels
      :label-width="120"
      :x="x"
      :height="height + 32"
      :length
      :type="type"
      x-grid-line
      :categories="categories"
      :legend-position="LegendPosition.BottomCenter"
      :legend-style="{ marginTop: '10px' }"
    />
  </UCard>
</template>
