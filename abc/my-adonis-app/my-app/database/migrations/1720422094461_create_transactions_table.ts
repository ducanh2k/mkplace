import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('buyer_id').unsigned().references('id').inTable('users')
      table.integer('seller_id').unsigned().references('id').inTable('users')
      table.integer('nft_id').unsigned().references('id').inTable('nfts').nullable()
      table.integer('token_id').unsigned().references('id').inTable('tokens').nullable()
      table.decimal('amount', 30, 18).notNullable()
      table.decimal('price', 12, 2).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
