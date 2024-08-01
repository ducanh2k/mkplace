import Wallet from '#models/wallet'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Wallet.createMany([
      {
        userId: 1,
        balance: 1000,
      },
      {
        userId: 2,
        balance: 500,
      },
    ])
  }
}
