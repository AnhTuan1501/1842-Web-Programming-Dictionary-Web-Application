import express from 'express'

import {
    addFavourite,
    removeFavourite,
    getFavourites
} from '../controllers/userController.js'

import { protect } from '../middleware/authMiddleware.js'

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

export default router