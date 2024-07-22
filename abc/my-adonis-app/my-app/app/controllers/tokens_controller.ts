// import type { HttpContext } from '@adonisjs/core/http'

import Token from '#models/token'
import type { HttpContext } from '@adonisjs/core/http'
import cloudinary from '../../config/cloudinaryConfig.js'

export default class TokensController {
  async index({ params, response }: HttpContext) {
    const tokens = await Token.query().paginate(params.page, params.perPage)
    return tokens.toJSON().data
  }

  async show({ params, response }: HttpContext) {
    const token = await Token.findOrFail(params.id)
    return response.json(token)
  }

  async destroy({ params, response }: HttpContext) {
    const token = await Token.findOrFail(params.id)
    await token.delete()
    return response.json(token)
  }

  async update({ params, response, request }: HttpContext) {
    await Token.findOrFail(params.id)
    const data = request.only(['name', 'image', 'sub_category_id'])
    const token = await Token.query().where('id', params.id).update(data)
    return response.json(token)
  }

  private async uploadImage(file: any): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(file.tmpPath, {
        folder: 'Tokens',
      })
      return result.secure_url
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error)
      throw new Error('Failed to upload image')
    }
  }
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'image', 'symbol', 'user_id', 'sub_category_id'])
      const file = request.file('image', {
        extnames: ['jpg', 'jpeg', 'png', 'gif'],
        size: '2mb',
      })
      let imageUrl
      if (file) {
        imageUrl = await this.uploadImage(file)
        data.image = imageUrl // Gán URL của ảnh đã upload vào data
      }
      const token = await Token.create(data)
      return response.status(201).json(token)
    } catch (error) {
      console.error('Error storing Token:', error)
      return response.status(500).send({ error: 'Failed to create Token' })
    }
  }
  async getByUserID({ params, response }: HttpContext) {
    const token = await Token.query().where('user_id', params.id).preload('user')
    return response.json(token)
  }
}
