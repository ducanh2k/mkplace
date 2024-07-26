import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const CartsController = () => import('#controllers/carts_controller')
const TransactionsController = () => import('#controllers/transactions_controller')
const SubCategoriesController = () => import('#controllers/sub_categories_controller')
const SubTokensController = () => import('#controllers/sub_tokens_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const TokensController = () => import('#controllers/tokens_controller')
const UsersController = () => import('#controllers/users_controller')
router.get('/', () => '')

//users
router
  .group(() => {
    router.get('', [UsersController, 'index']).use(middleware.pagination())
    router.post('', [UsersController, 'login'])
    router.get('/:id', [UsersController, 'show'])
    router.put('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'destroy'])
  })
  .prefix('/users')

router
  .group(() => {
    router
      .get('', async (ctx) => {
        const user = ctx.auth.user!
        console.log(user)
        return user
      })
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/user')
//tokens
router
  .group(() => {
    router.get('', [TokensController, 'index']).use(middleware.pagination())
    router.get('/:id', [TokensController, 'getByUserID'])
    router.post('', [TokensController, 'store'])
    router.post('/:id', [TokensController, 'show'])
    router.put('/:id', [TokensController, 'update'])
    router.delete('/:id', [TokensController, 'destroy'])
  })
  .prefix('/tokens')
//categories
router
  .group(() => {
    router.get('', [CategoriesController, 'index'])
  })
  .prefix('/categories')
//sub-tokens
router
  .group(() => {
    router.get('', [SubTokensController, 'index'])
    router.post('', [SubTokensController, 'store'])
    router.get('/:id', [SubTokensController, 'show'])
    router.post('/:id', [SubTokensController, 'getByTokenID'])
  })
  .prefix('/sub-tokens')
//sub-category
router
  .group(() => {
    router.post('/:id', [SubCategoriesController, 'show'])
    router.get('/:id', [SubCategoriesController, 'showOne'])
  })
  .prefix('/sub-categorys')
//transaction
router
  .group(() => {
    router.get('/:id', [TransactionsController, 'index'])
    router.post('/:id', [TransactionsController, 'show'])
    router.post('', [TransactionsController, 'store'])
  })
  .prefix('/transaction')

// cart
router
  .group(() => {
    router.get('/:id', [CartsController, 'index'])
    // router.get('/:id', [CartsController, 'show'])
    router.post('', [CartsController, 'store'])
    router.put('/:id', [CartsController, 'update'])
    router.delete('/:id', [CartsController, 'destroy'])
  })
  .prefix('/cart')
