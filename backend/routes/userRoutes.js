import express from 'express'

import {
    addFavourite,
    removeFavourite,
    getFavourites,
    addRecent,
    getRecents
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