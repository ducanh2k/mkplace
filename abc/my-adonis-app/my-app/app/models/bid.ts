import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Nft from './nft.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Bid extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nftId: number

  @column()
  declare userId: number

  @column()
  declare bidAmount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Nft)
  declare nft: BelongsTo<typeof Nft>
}
