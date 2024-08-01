import Bid from '#models/bid'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Bid.createMany([
      {
        nftId: 3,
        userId: 2,
        bidAmount: 150,
      },
      {
        nftId: 2,
        userId: 1,
        bidAmount: 250,
      },
    ])
  }
}
