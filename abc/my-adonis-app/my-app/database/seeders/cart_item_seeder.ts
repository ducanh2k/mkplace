import CartItem from '#models/cart_item'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await CartItem.createMany([
      {
        userId: 1,
        token_id: 1,
        bidAmount: 1,
      },
      {
        userId: 2,
        token_id: 3,
        bidAmount: 100,
      },
    ])
  }
}
