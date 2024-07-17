import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Token from './token.js'

export default class SubToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare image: string

  @column()
  declare token_id: number

  @column()
  declare price: number

  @column()
  declare total_supply: number

  @column()
  declare description: string

  @belongsTo(() => Token, {
    foreignKey: 'token_id',
  })
  declare token: BelongsTo<typeof Token>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
