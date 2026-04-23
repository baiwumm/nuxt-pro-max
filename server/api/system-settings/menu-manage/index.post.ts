/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 09:22:09
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-23 14:12:53
 * @Description: 新增菜单
 */
import { db } from '@/db/drizzle'
import { insertMenuSchema, menu } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const parsed = insertMenuSchema.parse(body)

    const [res] = await db
      .insert(menu)
      .values(parsed)
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    return responseError(error)
  }
})
