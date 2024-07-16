import Nft from '#models/nft'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Nft.createMany([
      {
        name: 'NFT 1',
        description: 'Description for NFT 1',
        ownerId: 1, // ID của user
        price: 100,
      },
      {
        name: 'NFT 2',
        description: 'Description for NFT 2',
        ownerId: 2, // ID của user
        price: 200,
      },
    ])
  }
}
