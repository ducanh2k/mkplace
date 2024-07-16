// eslint-disable-next-line unicorn/filename-case
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import SubCategory from './sub_category.js'
import SubToken from './sub_token.js'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare image: string
  @column()
  declare symbol: string

  @column()
  declare name: string

  @column()
  declare totalSupply: number

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare sub_category_id: number

  @belongsTo(() => SubCategory, {
    foreignKey: 'sub_category_id',
  })
  declare category: BelongsTo<typeof SubCategory>

  @hasMany(() => SubToken, {
    foreignKey: 'token_id',
  })
  declare tokens: HasMany<typeof SubToken>
}
