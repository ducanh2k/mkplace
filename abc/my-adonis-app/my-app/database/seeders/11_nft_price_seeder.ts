import NftPrice from '#models/nft_price'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await NftPrice.createMany([
      {
        nftId: 3,
        price: 100,
      },
      {
        nftId: 2,
        price: 200,
      },
    ])
  }
}
