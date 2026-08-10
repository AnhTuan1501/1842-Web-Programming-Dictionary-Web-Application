// npm install express mongoose cors dotenv
import Word from "../models/wordModel.js";
import { createAuditLog } from './auditLogController.js'

// GET /api/words
export async function getAllWords(req, res) {
    try {
        const {
            search,
            language,
            page = 1,
            limit = 10,
            sort
        } = req.query

        const filter = {}

        if (search) {
            const escapedSearch = search.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
            )

            filter.word = {
                $regex: `^${escapedSearch}`,
                $options: 'i'
            }
        }

        if (language) {
            filter.language = language
        }

        const skip = (page - 1) * limit

        const totalWords = await Word.countDocuments(filter)

        let query = Word.find(filter)

        if (sort === 'az') {
            query = query.sort({ word: 1 })
        }

        if (sort === 'za') {
            query = query.sort({ word: -1 })
        }

        const words = await query
            .skip(skip)
            .limit(Number(limit))

        res.json({
            words,
            page: Number(page),
            limit: Number(limit),
            totalWords,
            totalPages: Math.ceil(
                totalWords / limit
            )
        })
    } catch (error) {
        res.status(500).json({
            message: 'Cannot retrieve words.',
            error: error.message
        })
    }
}

// GET /api/words/:id
export async function getWordById(req, res) {
    try {
        const word = await Word.findById(req.params.id)

        if (!word) {
            return res.status(404).json({
                message: 'Word not found.'
            })
        }

        res.json(word)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot retrieve a word.',
            error: error.message
        })
    }
}

// POST /api/words
export async function createWord(req, res) {
    try {
        const word = new Word({
            word: req.body.word,
            meaning: req.body.meaning,
            example: req.body.example,
            synonyms: req.body.synonyms,
            language: req.body.language
        })

        const savedWord = await word.save()

        await createAuditLog({
            userId: req.user._id,
            action: 'CREATE',
            wordId: savedWord._id,
            details: `Created word: ${savedWord.word}`
        })

        res.status(201).json(savedWord)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(
                err => err.message
            )

            return res.status(400).json({
                message: 'Word validation failed.',
                errors
            })
        }

        res.status(500).json({
            message: 'Cannot create a word.',
            error: error.message
        })
    }
}

// PUT /api/words/:id
export async function updateWord(req, res) {
    try {
        const updatedWord = await Word.findByIdAndUpdate(
            req.params.id,
            {
                word: req.body.word,
                meaning: req.body.meaning,
                example: req.body.example,
                synonyms: req.body.synonyms,
                language: req.body.language
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedWord) {
            return res.status(404).json({
                message: 'Word not found.'
            })
        }

        await createAuditLog({
            userId: req.user._id,
            action: 'UPDATE',
            wordId: updatedWord._id,
            details: `Updated word: ${updatedWord.word}`
        })

        res.json(updatedWord)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(
                err => err.message
            )

            return res.status(400).json({
                message: 'Word validation failed.',
                errors
            })
        }

        res.status(500).json({
            message: 'Cannot update the word.',
            error: error.message
        })
    }
}

// DELETE /api/words/:id
export async function deleteWord(req, res) {
    try {
        const deletedWord = await Word.findByIdAndDelete(req.params.id)

        if (!deletedWord) {
            return res.status(404).json({
                message: 'Word not found.'
            })
        }

        await createAuditLog({
            userId: req.user._id,
            action: 'DELETE',
            wordId: deletedWord._id,
            details: `Deleted word: ${deletedWord.word}`
        })

        res.json({
            message: 'Word deleted successfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Cannot delete the word.',
            error: error.message
        })
    }
}

// DELETE /api/words/bulk
export async function bulkDeleteWords(req, res) {
    try {
        const { ids } = req.body

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                message: 'No words selected.'
            })
        }

        const result = await Word.deleteMany({
            _id: { $in: ids }
        })

        await createAuditLog({
            userId: req.user._id,
            action: 'BULK_DELETE',
            details: `Deleted ${result.deletedCount} word(s).`
        })

        res.json({
            message: 'Words deleted successfully.',
            deletedCount: result.deletedCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Cannot delete selected words.',
            error: error.message
        })
    }
}