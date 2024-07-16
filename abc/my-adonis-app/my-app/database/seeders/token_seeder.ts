import Token from '#models/token'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Token.createMany([
      // {
      //   image: 'https://res.cloudinary.com/dhachayhw/image/upload/v1720429882/drilldown_bymxzm.jpg',
      //   symbol: 'TOKEN1',
      //   name: 'drilldown',
      //   totalSupply: 1000000,
      //   price: 1,
      //   sub_category_id: 2,
      // },
      // {
      //   image:
      //     'https://res.cloudinary.com/dhachayhw/image/upload/v1720430934/cc4fca0a7a4ba5daebd86eeb42a27506_euyca4.avif',
      //   symbol: 'TOKEN2',
      //   name: 'ComplexCity #67',
      //   totalSupply: 500000,
      //   price: 2,
      //   sub_category_id: 2,
      // },
      // {
      //   image:
      //     'https://res.cloudinary.com/dhachayhw/image/upload/v1720431256/93dd1857891e841645ff344f93c4f252_nmopdx.avif',
      //   symbol: 'TOKEN2',
      //   name: 'ORGNLS BY SABET',
      //   totalSupply: 500000,
      //   price: 2,
      //   sub_category_id: 2,
      // },
      // {
      //   image:
      //     'https://res.cloudinary.com/dhachayhw/image/upload/v1720431593/Meta_Legend_zt820r.avif',
      //   symbol: 'TOKEN2',
      //   name: 'Meta_Legend',
      //   totalSupply: 500000,
      //   price: 2,
      //   sub_category_id: 2,
      // },
      // {
      //   image:
      //     'https://res.cloudinary.com/dhachayhw/image/upload/v1720431580/solitaire_jqayf0.avif',
      //   symbol: 'TOKEN2',
      //   name: 'solitaire',
      //   totalSupply: 500000,
      //   price: 2,
      //   sub_category_id: 2,
      // },
      // {
      //   image:
      //     'https://res.cloudinary.com/dhachayhw/image/upload/v1720431558/spinhead360_qg4lwy.webp',
      //   symbol: 'TOKEN2',
      //   name: 'spinhead360',
      //   totalSupply: 500000,
      //   price: 2,
      //   sub_category_id: 2,
      // },

      {
        image:
          'https://res.cloudinary.com/dhachayhw/image/upload/v1720525679/The_Beacon_xjzict.png',
        symbol: 'TOKEN1',
        name: 'The Beacon',
        totalSupply: 10,
        price: 1,
        sub_category_id: 10,
      },
      {
        image: 'https://res.cloudinary.com/dhachayhw/image/upload/v1720522716/SABET_1_vgvqj5.avif',
        symbol: 'TOKEN1',
        name: 'SABET',
        totalSupply: 10,
        price: 1,
        sub_category_id: 2,
      },
      {
        image: 'https://res.cloudinary.com/dhachayhw/image/upload/v1720522696/LT3_5106_m7xxbq.avif',
        symbol: 'TOKEN1',
        name: 'Less Than Three',
        totalSupply: 10,
        price: 1.5633,
        sub_category_id: 22,
      },
      {
        image:
          'https://res.cloudinary.com/dhachayhw/image/upload/v1720522669/Cry_Me_A..._14_bxlvzz.avif',
        symbol: 'TOKEN1',
        name: 'Cry Me A',
        totalSupply: 10,
        price: 1.2344,
        sub_category_id: 1,
      },
      {
        image: 'https://res.cloudinary.com/dhachayhw/image/upload/v1720522626/cc3_zfmc9u.avif',
        symbol: 'TOKEN1',
        name: 'ComplexCity',
        totalSupply: 10,
        price: 1.0023,
        sub_category_id: 3,
      },
    ])
  }
}
