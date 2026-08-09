import express from 'express'

import { getAllWords, getWordById, createWord, updateWord, deleteWord } from '../controllers/wordController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

router
    .route('/')
    .get(getAllWords)
    .post(
        protect,
        authorize('admin'),
        createWord
    )

router
    .route('/:id')
    .get(getWordById)
    .put(
        protect,
        authorize('admin'),
        updateWord
    )
    .delete(
        protect,
        authorize('admin'),
        deleteWord
    )

export default router