import User from '#models/user'
import PostPolicy from '#policies/post_policy'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
export default class UsersController {
  async login({ request, params }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const accessToken = await User.accessTokens.create(user)
    return accessToken
  }
  async index({ params, response, auth, bouncer }: HttpContext) {
    const users = await User.query().paginate(params.page, params.perPage)
    return users.toJSON().data
  }
  async paging({ params, response }: HttpContext) {
    const users = await User.query().paginate(params.page, params.perPage)
    return response.json(users)
  }
  async store({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    const user = await User.create(data)
    // if (await Bouncer.with(UserPolicy).denies('create', user)) {
    //   return response.forbidden('Cannot create user')
    // }
    return response.status(201).json(user)
  }

  async show({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return response.json(user)
  }

  async update({ bouncer, params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    // if (await bouncer.with(PostPolicy).denies('edit', user.id)) {
    //   return response.forbidden('Cannot edit user')
    // }
    const data = request.only(['fullName', 'email', 'password'])
    user.merge(data)
    await user.save()
    return response.json(user)
  }

  async destroy({ bouncer, params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    if (await bouncer.with(PostPolicy).denies('delete', user.id)) {
      return response.forbidden('Cannot delete user')
    }
    await user.delete()
    return response.status(204).json(null)
  }

  async handle({ request, response }: HttpContext) {
    const { email, password, username } = await createUserValidator.validate(
      request.only(['email', 'password', 'username'])
    )
    return response.ok({ email, password, username })
  }
}
