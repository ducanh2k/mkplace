import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        id: 1,
        fullName: 'user1',
        email: 'user1@example.com',
        password: '1securepassword',
        isAdmin: true,
      },
      {
        id: 2,
        fullName: 'user2',
        email: 'user2@example.com',
        password: '2securepassword',
        isAdmin: false,
      },
      {
        id: 3,
        fullName: 'user3',
        email: 'user3@example.com',
        password: '3securepassword',
        isAdmin: false,
      },
      {
        id: 4,
        fullName: 'user4',
        email: 'user5@example.com',
        password: '4securepassword',
        isAdmin: false,
      },
      {
        id: 5,
        fullName: 'user5',
        email: 'user6@example.com',
        password: '5securepassword',
        isAdmin: true,
      },
    ])
  }
}
