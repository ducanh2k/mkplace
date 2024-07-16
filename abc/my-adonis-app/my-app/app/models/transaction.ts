import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import Nft from './nft.js'
import Token from './token.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare buyerId: number

  @column()
  declare sellerId: number

  @column()
  declare nftId: number | null

  @column()
  declare tokenId: number | null

  @column()
  declare amount: number

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, { foreignKey: 'buyerId' })
  declare buyer: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'sellerId' })
  declare seller: BelongsTo<typeof User>

  @belongsTo(() => Nft, { foreignKey: 'nftId' })
  declare nft: BelongsTo<typeof Nft>

  @belongsTo(() => Token, { foreignKey: 'tokenId' })
  declare token: BelongsTo<typeof Token>
}
