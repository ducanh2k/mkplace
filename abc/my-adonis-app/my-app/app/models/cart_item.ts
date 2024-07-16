import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Nft from './nft.js'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Token from './token.js'
import SubToken from './sub_token.js'

export default class Bid extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare token_id: number

  @column()
  declare userId: number

  @column()
  declare bidAmount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => SubToken, {
    foreignKey: 'token_id',
  })
  declare subToken: HasMany<typeof SubToken>
}
