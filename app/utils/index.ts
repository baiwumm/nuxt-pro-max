import type { Column } from '@tanstack/vue-table'
import type { ClassValue } from 'clsx'
import UButton from '@nuxt/ui/components/button.vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { RESPONSE_CODE } from '@/enums'

/**
 * @description: 合并类名
 * @param {Array} inputs
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @description: 统一处理 catch 错误
 */
export function catchError(err: unknown): string {
  const { $i18n } = useNuxtApp()
  let message = $i18n.t('common.requestError')

  if (err instanceof Error) {
    message = err.message
  }
  else if (typeof err === 'string') {
    message = err
  }
  return message
}

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code: Api.ResponseCode) => code === RESPONSE_CODE.SUCCESS

/**
 * @description: 列固定
 */
export function getHeader(column: Column<System.Menu>, label: string, position: 'left' | 'right') {
  const isPinned = column.getIsPinned()
  return h(UButton, {
    color: 'neutral',
    variant: 'ghost',
    label,
    icon: isPinned ? 'i-lucide-pin-off' : 'i-lucide-pin',
    class: '-mx-2.5',
    onClick() {
      column.pin(isPinned === position ? false : position)
    },
    ui: {
      label: 'font-semibold',
    },
  })
}
