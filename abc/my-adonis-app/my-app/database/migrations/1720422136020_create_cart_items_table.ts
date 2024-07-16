import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users') // ID của người dùng sở hữu giỏ hàng
      table.integer('nft_id').unsigned().references('id').inTable('nfts').nullable() // ID của NFT (có thể là NULL)
      table.integer('token_id').unsigned().references('id').inTable('tokens').nullable() // ID của token (có thể là NULL)
      table.decimal('quantity', 30, 18) // Số lượng token hoặc NFT
      table.decimal('price', 12, 2) // Giá của item tại thời điểm thêm vào giỏ
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
