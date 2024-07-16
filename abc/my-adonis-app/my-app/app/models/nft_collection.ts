import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class NftCollection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nftId: number

  @column()
  declare collectionId: number
}
