// import type { HttpContext } from '@adonisjs/core/http'

import Transaction from '#models/transaction'
import { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  async index({ params }: HttpContext) {
    const transactions = await Transaction.query()
      .where('buyerId', params.id)
      .paginate(params.page, params.perPage)
    return transactions.toJSON().data
  }

  async show({ params, response }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)
    return response.json(transaction)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['buyerId', 'sellerId', 'tokenId', 'amount', 'price'])
    const transaction = await Transaction.create(data)
    return response.json(transaction)
  }
}
