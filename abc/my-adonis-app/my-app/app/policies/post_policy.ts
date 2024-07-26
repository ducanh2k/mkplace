import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class PostPolicy extends BasePolicy {
  // create(user: User): AuthorizerResponse {
  //   return true
  // }
  edit(user: User, id: number): AuthorizerResponse {
    return user.id === id
  }

  delete(user: User, id: number): AuthorizerResponse {
    return user.id === id
  }
  //   @allowGuest()
  view(user: User | null, id: number): AuthorizerResponse {
    if (user && user.isPublished) {
      return true
    }
    if (!user) {
      return false
    }
    return user.id === id
  }
  // async before(user: User | null, action: string, ...params: any[]) {
  //   if (user && user.isAdmin) {
  //     return true
  //   }
  // }
  // async after(user: User | null, action: string, response: AuthorizerResponse, ...params: any[]) {
  //   if (user && user.isAdmin) {
  //     return true
  //   }
  // }
}
