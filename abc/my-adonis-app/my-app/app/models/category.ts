import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Token from './token.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import SubToken from './sub_token.js'
import SubCategory from './sub_category.js'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @hasMany(() => Token, {
    foreignKey: 'category_id',
  })
  declare tokens: HasMany<typeof Token>
  declare subTokens: HasMany<typeof SubToken>

  @hasMany(() => SubCategory, {
    foreignKey: 'category_id',
  })
  declare subCategories: HasMany<typeof SubCategory>
}
