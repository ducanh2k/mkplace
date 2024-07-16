// import type { HttpContext } from '@adonisjs/core/http'

import SubToken from '#models/sub_token'
import { HttpContext } from '@adonisjs/core/http'

export default class SubTokensController {
  async index({ params, response }: HttpContext) {
    // const tokens = await SubToken.query().paginate(params.page, params.perPage)
    const tokens = await SubToken.all()
    // return tokens.toJSON().data
    return response.ok(tokens)
  }
  async show({ params, response }: HttpContext) {
    const subToken = await SubToken.findOrFail(params.id)
    return response.json(subToken)
  }

  async getByTokenID({ params, response }: HttpContext) {
    const subToken = await SubToken.query().where('token_id', params.id).preload('token')
    return response.json(subToken)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'image', 'sub_category_id', 'total_supply', 'price'])
    const subToken = await SubToken.create(data)
    return response.created(subToken)
  }

  async update({ params, request, response }: HttpContext) {
    const subToken = await SubToken.findOrFail(params.id)
    const data = request.only(['name', 'image', 'sub_category_id', 'total_supply', 'price'])
    subToken.merge(data)
    await subToken.save()
    return response.json(subToken)
  }

  async destroy({ params, response }: HttpContext) {
    const subToken = await SubToken.findOrFail(params.id)
    await subToken.delete()
    return response.noContent()
  }
}
