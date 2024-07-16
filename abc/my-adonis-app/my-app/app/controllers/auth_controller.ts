import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, auth, response }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      //   await auth.use(middleware.auth({ basicAuthGuard: 'web' })).attempt(email, password)
      return response.ok({ message: 'Login successful' })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
