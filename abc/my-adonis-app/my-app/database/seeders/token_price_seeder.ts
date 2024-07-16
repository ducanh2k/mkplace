import TokenPrice from '#models/token_price'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await TokenPrice.createMany([
      {
        tokenId: 1,
        price: 1,
      },
      {
        tokenId: 2,
        price: 2,
      },
    ])
  }
}
