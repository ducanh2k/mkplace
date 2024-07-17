import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('image', 255).nullable()
      table.integer('sub_category_id').unsigned().references('id').inTable('sub_categories')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('symbol', 50).notNullable()
      table.string('name', 255).notNullable()
      table.decimal('total_supply', 30, 18).notNullable()
      table.decimal('price', 12, 2)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
