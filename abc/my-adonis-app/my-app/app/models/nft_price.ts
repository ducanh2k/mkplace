import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Nft from './nft.js'

export default class NftPrice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nftId: number

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare recordedAt: DateTime

  @belongsTo(() => Nft)
  declare nft: BelongsTo<typeof Nft>
}
