// npm install express mongoose cors dotenv
import Word from "../models/wordModel.js";

// GET /api/words
// GET /api/words
export async function getAllWords(req, res) {
    try {
        const { search } = req.query

        const filter = {}

        if (search) {
            filter.word = {
                $regex: search,
                $options: 'i'
            }
        }

        const words = await Word.find(filter)

        res.json(words)
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

        res.status(201).json(savedWord)
    } 
    catch (error) {
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

        res.json(updatedWord)
    } 
    catch (error) {
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