import CartItem from '#models/cart_item'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await CartItem.createMany([
      {
        user_id: 1,
        token_id: 1,
      },
      {
        user_id: 2,
        token_id: 3,
      },
    ])
  }
}
