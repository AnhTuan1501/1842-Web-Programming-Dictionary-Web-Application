import express from 'express'

import {
    createReport,
    getReports,
    resolveReport,
    rejectReport
} from '../controllers/reportController.js'

import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

// User submits a vocabulary report
router.post(
    '/',
    protect,
    createReport
)

// Admin views all reports
router.get(
    '/',
    protect,
    authorize('admin'),
    getReports
)

// Admin resolves a report
router.put(
    '/:id/resolve',
    protect,
    authorize('admin'),
    resolveReport
)

// Admin rejects a report
router.put(
    '/:id/reject',
    protect,
    authorize('admin'),
    rejectReport
)

export default router