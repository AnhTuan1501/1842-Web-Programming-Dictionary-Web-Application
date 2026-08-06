// npm install express mongoose cors dotenv
import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model('Book', bookSchema)

export default Book