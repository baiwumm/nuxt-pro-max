/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 09:05:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-23 14:19:52
 * @Description: 查询菜单树
 */
import { ilike, or } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { menu } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const keyword = query.keyword as string | undefined
    let data
    if (keyword) {
      data = await db
        .select()
        .from(menu)
        .where(
          or(
            ilike(menu.label, `%${keyword}%`),
            ilike(menu.to, `%${keyword}%`),
          ),
        )
        .orderBy(menu.parentId, menu.sort)
    }
    else {
      data = await db
        .select()
        .from(menu)
        .orderBy(menu.parentId, menu.sort)
    }

    return responseSuccess(convertFlatDataToTree(data))
  }
  catch (err) {
    return responseError(err)
  }
})
