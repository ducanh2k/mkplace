import SubCategory from '#models/sub_category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await SubCategory.createMany([
      // {
      //   name: 'Art spotlight',
      //   category_id: 1,
      // },
      // {
      //   name: 'Digital Art',
      //   category_id: 1,
      // },
      // {
      //   name: 'Abstract Art',
      //   category_id: 1,
      // },
      // {
      //   name: '3D Art',
      //   category_id: 1,
      // },
      {
        name: 'Game spotlight',
        category_id: 2,
      },
      {
        name: 'Vituals World',
        category_id: 2,
      },
      {
        name: '3D Games',
        category_id: 2,
      },
      {
        name: 'Sports',
        category_id: 2,
      },
      {
        name: 'Adventure Games',
        category_id: 2,
      },
      {
        name: 'MMORPG',
        category_id: 2,
      },
      {
        name: 'Role-playing',
        category_id: 2,
      },
      {
        name: 'Strategy Games',
        category_id: 2,
      },
      {
        name: 'Fighting',
        category_id: 2,
      },
      {
        name: 'Trading Cards',
        category_id: 2,
      },
      {
        name: 'Memberships  spotlight',
        category_id: 3,
      },
      {
        name: 'Trending in Memberships',
        category_id: 3,
      },
      {
        name: 'Art Memberships',
        category_id: 3,
      },
      {
        name: 'DAOs',
        category_id: 3,
      },
      {
        name: 'PFPs Memberships',
        category_id: 4,
      },
      {
        name: 'Gaming PFPs',
        category_id: 4,
      },
      {
        name: 'Pixel Art PFPs',
        category_id: 4,
      },
      {
        name: 'Digital Art PFPs',
        category_id: 4,
      },
      {
        name: 'On-Chain PFPs',
        category_id: 4,
      },
      {
        name: 'Photography spotlight',
        category_id: 5,
      },
      {
        name: 'Trending in Photography',
        category_id: 5,
      },
      {
        name: 'Music spotlight',
        category_id: 6,
      },
    ])
  }
}
