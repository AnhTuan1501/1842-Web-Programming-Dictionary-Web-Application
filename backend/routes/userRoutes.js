import express from 'express'

import { addFavourite,removeFavourite,  getFavourites, addRecent, getRecents, getAllUsers} from '../controllers/userController.js'

import { protect, authorize } from '../middleware/authMiddleware.js'


const router = express.Router()

router.get(
    '/favourites',
    protect,
    getFavourites
)

router
    .route('/favourites/:wordId')
    .post(
        protect,
        addFavourite
    )
    .delete(
        protect,
        removeFavourite
    )

router
    .route('/recent/:wordId')
    .post(
        protect,
        addRecent
    )

router.get(
    '/recent',
    protect,
    getRecents
)

export default router

// GET /api/users
router.get(
    '/',
    protect,
    authorize('admin'),
    getAllUsers
)