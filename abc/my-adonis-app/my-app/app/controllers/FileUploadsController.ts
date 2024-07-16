/* eslint-disable unicorn/filename-case */
import Token from '#models/token'
import { HttpContext } from '@adonisjs/core/http'
import cloudinary from 'cloudinary'
// import { result } from 'lodash'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default class FileUploadsController {
  async store({ request, response }: HttpContext) {
    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
    })

    if (!image) {
      return response.badRequest('No file uploaded')
    }

    // const result = await cloudinary.v2.uploader.upload(image.tmpPath, {
    //   folder: 'my_folder',
    // })

    // const url = result.secure_url

    // Lưu thông tin token vào cơ sở dữ liệu
    const token = await Token.create({
      name: request.input('name'),
      symbol: request.input('symbol'),
      //   image: "image.tmpPath",
    })

    return response.status(201).json(token)
  }
}
