import NftCollection from '#models/nft_collection'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await NftCollection.createMany([
      {
        nftId: 3,
        collectionId: 1,
      },
      {
        nftId: 2,
        collectionId: 2,
      },
    ])
  }
}
