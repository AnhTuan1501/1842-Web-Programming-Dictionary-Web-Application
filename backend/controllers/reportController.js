import Report from '../models/reportModel.js'
import Word from '../models/wordModel.js'

// POST /api/reports
export async function createReport(req, res) {
    try {
        const word = await Word.findById(req.body.wordId)

        if (!word) {
            return res.status(404).json({
                message: 'Word not found.'
            })
        }

        const report = new Report({
            userId: req.user._id,
            wordId: req.body.wordId,
            reason: req.body.reason,
            description: req.body.description
        })

        const savedReport = await report.save()

        res.status(201).json(savedReport)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(
                err => err.message
            )

            return res.status(400).json({
                message: 'Report validation failed.',
                errors
            })
        }

        res.status(500).json({
            message: 'Cannot create report.',
            error: error.message
        })
    }
}

// GET /api/reports
export async function getReports(req, res) {
    try {
        const reports = await Report.find()
            .populate('userId', 'name email role')
            .populate('wordId', 'word language')
            .sort({ createdAt: -1 })

        res.json(reports)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot retrieve reports.',
            error: error.message
        })
    }
}

// PUT /api/reports/:id/resolve
export async function resolveReport(req, res) {
    try {
        const report = await Report.findByIdAndUpdate(
            req.params.id,
            {
                status: 'resolved'
            },
            {
                new: true
            }
        )

        if (!report) {
            return res.status(404).json({
                message: 'Report not found.'
            })
        }

        res.json(report)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot resolve report.',
            error: error.message
        })
    }
}

// PUT /api/reports/:id/reject
export async function rejectReport(req, res) {
    try {
        const report = await Report.findByIdAndUpdate(
            req.params.id,
            {
                status: 'rejected'
            },
            {
                new: true
            }
        )

        if (!report) {
            return res.status(404).json({
                message: 'Report not found.'
            })
        }

        res.json(report)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot reject report.',
            error: error.message
        })
    }
}