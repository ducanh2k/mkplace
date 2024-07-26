/* eslint-disable @typescript-eslint/no-shadow */
// import type { HttpContext } from '@adonisjs/core/http'

import SubToken from '#models/sub_token'
import { HttpContext } from '@adonisjs/core/http'
import cloudinary from '../../config/cloudinaryConfig.js'
export default class SubTokensController {
  async index({ response }: HttpContext) {
    // const tokens = await SubToken.query().paginate(params.page, params.perPage)
    const tokens = await SubToken.all()
    // return tokens.toJSON().data
    return response.ok(tokens)
  }
  async show({ params, response }: HttpContext) {
    const subToken = await SubToken.query().where('id', params.id).preload('token')
    return response.json(subToken)
  }

  async getByTokenID({ params, response }: HttpContext) {
    const subToken = await SubToken.query().where('token_id', params.id).preload('token')
    return response.json(subToken)
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
      const data = request.only([
        'name',
        'image',
        'token_id',
        'total_supply',
        'description',
        'price',
      ])
      const file = request.file('image', {
        extnames: ['jpg', 'jpeg', 'png', 'gif'],
        size: '2mb',
      })

      let imageUrl
      if (file) {
        imageUrl = await this.uploadImage(file)
        data.image = imageUrl // Gán URL của ảnh đã upload vào data
      }

      const subToken = await SubToken.create(data)
      return response.created(subToken)
    } catch (error) {
      console.error('Error storing subToken:', error)
      return response.status(500).send({ error: 'Failed to create subToken' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const subToken = await SubToken.findOrFail(params.id)
    const data = request.only(['name', 'image', 'sub_category_id', 'total_supply', 'price'])
    subToken.merge(data)
    await subToken.save()
    return response.json(subToken)
  }

  async destroy({ params, response }: HttpContext) {
    const subToken = await SubToken.findOrFail(params.id)
    await subToken.delete()
    return response.noContent()
  }
}
