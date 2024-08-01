import Collection from '#models/collection'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Collection.createMany([
      {
        name: 'Collection 1',
        description: 'Description for Collection 1',
      },
      {
        name: 'Collection 2',
        description: 'Description for Collection 2',
      },
    ])
  }
}
