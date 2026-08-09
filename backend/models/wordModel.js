// npm install express mongoose cors dotenv
import mongoose from 'mongoose'

const wordSchema = new mongoose.Schema(
    {
       word: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 100,
            match: /^[A-Za-zÀ-ỹ][A-Za-zÀ-ỹ0-9\s'’+.-]*$/
            },

        meaning: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 500
            }
    },
    {
        timestamps: true
    }
)

const Word = mongoose.model('Word', wordSchema)

export default Word