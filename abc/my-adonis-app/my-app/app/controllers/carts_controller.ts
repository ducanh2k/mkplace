// import type { HttpContext } from '@adonisjs/core/http'
import cart_item from '#models/cart_item'
import { HttpContext } from '@adonisjs/core/http'
export default class CartsController {
  async index({ params }: HttpContext) {
    // const user = await auth.authenticate()
    const cart = await cart_item.query().where('user_id', params.id)
    return cart
  }

  async store({ request, response }: HttpContext) {
    // const user = await auth.authenticate()
    const data = request.only(['token_id', 'quantity', 'price', 'user_id', 'name', 'image'])
    const cart = await cart_item.create(data)
    return response.json(cart)
  }

  async show({ params, response }: HttpContext) {
    const cart = await cart_item.findOrFail(params.id)
    return response.json(cart)
  }

  async update({ params, request, response }: HttpContext) {
    const cart = await cart_item.findOrFail(params.id)
    const data = request.only(['quantity'])
    cart.merge(data)
    await cart.save()
    return response.json(cart)
  }

  async destroy({ params, response }: HttpContext) {
    const cart = await cart_item.findOrFail(params.id)
    await cart.delete()
    return response.json(cart)
  }
}
