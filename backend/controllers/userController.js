import User from '../models/userModel.js'
import Word from '../models/wordModel.js'

// POST /api/users/favourites/:wordId
export async function addFavourite(req, res) {
    try {
        const user = await User.findById(req.user._id)
        const word = await Word.findById(req.params.wordId)

        if (!word) {
            return res.status(404).json({
                message: 'Word not found.'
            })
        }

        if (!user.favourites.includes(word._id)) {
            user.favourites.push(word._id)
            await user.save()
        }

        res.json({
            message: 'Word added to favourites.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Cannot add favourite.',
            error: error.message
        })
    }
}

// DELETE /api/users/favourites/:wordId
export async function removeFavourite(req, res) {
    try {
        const user = await User.findById(req.user._id)

        user.favourites = user.favourites.filter(
            wordId => wordId.toString() !== req.params.wordId
        )

        await user.save()

        res.json({
            message: 'Word removed from favourites.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Cannot remove favourite.',
            error: error.message
        })
    }
}

// GET /api/users/favourites
export async function getFavourites(req, res) {
    try {
        const user = await User.findById(req.user._id)
            .populate('favourites')

        res.json(user.favourites)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot retrieve favourites.',
            error: error.message
        })
    }
}