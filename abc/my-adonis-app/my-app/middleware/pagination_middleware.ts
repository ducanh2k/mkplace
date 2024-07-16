import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

interface Pagination {
  perPage: number
  page: number
}
declare module '@adonisjs/core/http' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  interface HttpContext {
    pagination: Pagination
  }
}

export default class PaginationMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request } = ctx
    const pagination = {
      perPage: request.input('per_page', 5),
      page: request.input('page', 1),
    }
    ctx.pagination = pagination
    const output = await next()
    return output
  }
}
