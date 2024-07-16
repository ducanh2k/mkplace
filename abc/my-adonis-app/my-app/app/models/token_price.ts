import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TokenPrice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tokenId: number

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare recorded_at: DateTime
}
