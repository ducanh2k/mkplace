import Transaction from '#models/transaction'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Transaction.createMany([
      {
        buyerId: 1,
        sellerId: 2,
        nftId: 3,
        tokenId: null,
        amount: 1,
        price: 100,
      },
      {
        buyerId: 2,
        sellerId: 1,
        nftId: 2,
        tokenId: null,
        amount: 1,
        price: 200,
      },
    ])
  }
}
