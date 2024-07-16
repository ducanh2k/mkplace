// import type { HttpContext } from '@adonisjs/core/http'

import Category from '#models/category'
import { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ params, response }: HttpContext) {
    const categories = await Category.all()
    return response.ok(categories)
  }

  async show({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return response.json(category)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name'])
    const category = await Category.create(data)
    return response.json(category)
  }

  async update({ params, response, request }: HttpContext) {
    const categories = await Category.findOrFail(params.id)
    const data = request.only(['name'])
    categories.merge(data)
    await categories.save()
    return response.json(categories)
  }

  async destroy({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
    return response.json(category)
  }
}
