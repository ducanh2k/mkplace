import SubCategory from '#models/sub_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubCategoriesController {
  async index({ response }: HttpContext) {
    const subCategories = await SubCategory.all()
    return response.json(subCategories)
  }
  async showOne({ params, response }: HttpContext) {
    const subCategory = await SubCategory.findOrFail(params.id)
    return response.json(subCategory)
  }

  async show({ params, response }: HttpContext) {
    const subCategory = await SubCategory.query()
      .where('category_id', params.id)
      .preload('category')
      .preload('tokens')

    return response.json(subCategory)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'category_id'])
    const subCategory = await SubCategory.create(data)
    return response.json(subCategory)
  }

  async update({ params, request, response }: HttpContext) {
    const subCategory = await SubCategory.findOrFail(params.id)
    const data = request.only(['name', 'category_id'])
    subCategory.merge(data)
    await subCategory.save()
    return response.json(subCategory)
  }

  async destroy({ params, response }: HttpContext) {
    const subCategory = await SubCategory.findOrFail(params.id)
    await subCategory.delete()
    return response.json(subCategory)
  }
}
