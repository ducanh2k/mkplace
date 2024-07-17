// import type { HttpContext } from '@adonisjs/core/http'

import Token from '#models/token'
import type { HttpContext } from '@adonisjs/core/http'

export default class TokensController {
  async index({ params, response }: HttpContext) {
    const tokens = await Token.query().paginate(params.page, params.perPage)
    return tokens.toJSON().data
  }

  async show({ params, response }: HttpContext) {
    const token = await Token.findOrFail(params.id)
    return response.json(token)
  }

  async destroy({ params, response }: HttpContext) {
    const token = await Token.findOrFail(params.id)
    await token.delete()
    return response.json(token)
  }

  async update({ params, response, request }: HttpContext) {
    await Token.findOrFail(params.id)
    const data = request.only(['name', 'image', 'sub_category_id'])
    const token = await Token.query().where('id', params.id).update(data)
    return response.json(token)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'image', 'sub_category_id'])
    const token = await Token.create(data)
    return response.status(201).json(token)
  }
  async getByUserID({ params, response }: HttpContext) {
    const token = await Token.query().where('user_id', params.id).preload('user')
    return response.json(token)
  }
}
