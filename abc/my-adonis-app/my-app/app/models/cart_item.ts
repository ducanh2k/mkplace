/* eslint-disable @typescript-eslint/naming-convention */
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import SubToken from './sub_token.js'

export default class cart_items extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare token_id: number

  @column()
  declare user_id: number

  @column()
  declare quantity: number

  @column()
  declare price: number

  @column()
  declare name: string

  @column()
  declare image: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => SubToken, {
    foreignKey: 'token_id',
  })
  declare subToken: HasMany<typeof SubToken>
}
