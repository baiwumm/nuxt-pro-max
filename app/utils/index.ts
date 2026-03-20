import type { ApiResponse } from '@/types/common'
import { RESPONSE_CODE } from '@/enums'

/**
 * @description: 请求成功
 */
export function responseSuccess(data: unknown): ApiResponse {
  return { data, msg: RESPONSE_CODE.label(RESPONSE_CODE.SUCCESS), code: RESPONSE_CODE.SUCCESS, timestamp: Date.now() }
}

/**
 * @description: 请求失败
 */
export function responseError(data: unknown, msg = RESPONSE_CODE.label(RESPONSE_CODE.SERVER_ERROR)): ApiResponse {
  return { data, msg, code: RESPONSE_CODE.SERVER_ERROR, timestamp: Date.now() }
}

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code: ApiResponse['code']) => code === RESPONSE_CODE.SUCCESS

/**
 * @description: 统一处理 catch 错误
 */
export function catchError(err: unknown): ApiResponse {
  let message = '未知错误'

  if (err instanceof Error) {
    message = err.message
  }
  else if (typeof err === 'string') {
    message = err
  }
  return responseError(null, message)
}

/**
 * Pick a list of properties from an object
 * into a new object
 */
export function pick<T extends object, TKeys extends keyof T>(obj: T, keys: TKeys[]): Pick<T, TKeys> {
  if (!obj)
    return {} as Pick<T, TKeys>
  return keys.reduce((acc, key) => {
    if (Object.hasOwn(obj, key))
      acc[key] = obj[key]
    return acc
  }, {} as Pick<T, TKeys>)
}

/**
 * Omit a list of properties from an object
 * returning a new object with the properties
 * that remain
 */
export function omit<T, TKeys extends keyof T>(obj: T, keys: TKeys[]): Omit<T, TKeys> {
  if (!obj)
    return {} as Omit<T, TKeys>
  if (!keys || keys.length === 0)
    return obj as Omit<T, TKeys>
  return keys.reduce(
    (acc, key) => {
      // Gross, I know, it's mutating the object, but we
      // are allowing it in this very limited scope due
      // to the performance implications of an omit func.
      // Not a pattern or practice to use elsewhere.
      delete acc[key]
      return acc
    },
    { ...obj },
  )
}

/**
 * Dynamically get a nested value from an array or
 * object with a string.
 *
 * @example get(person, 'friends[0].name')
 */
export function get<TDefault = unknown>(value: unknown, path: string, defaultValue?: TDefault): TDefault {
  const segments = path.split(/[.[\]]/g)
  let current: any = value
  for (const key of segments) {
    if (current === null)
      return defaultValue as TDefault
    if (current === undefined)
      return defaultValue as TDefault
    const dequoted = key.replace(/['"]/g, '')
    if (dequoted.trim() === '')
      continue
    current = current[dequoted]
  }
  if (current === undefined)
    return defaultValue as TDefault
  return current
}
