import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'nft_collections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('nft_id').unsigned().references('id').inTable('nfts')
      table.integer('collection_id').unsigned().references('id').inTable('collections')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
