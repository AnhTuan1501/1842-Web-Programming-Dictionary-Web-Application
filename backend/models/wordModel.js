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
            },
        
        example: {
            type: String,
            trim: true,
            maxlength: 500
            },

        synonyms: {
            type: [String],
            trim: true,
            validate: {
                validator: function (v) {
                    return v.every(
                        synonym => /^[A-Za-zÀ-ỹ][A-Za-zÀ-ỹ0-9\s'’+.-]*$/.test(synonym)
                    )
                },
                message: props => `${props.value} contains invalid synonym(s).`
            }
        },

        language: {
            type: String,
            required: true,
            enum: ['English', 'Vietnamese', 'French'],
            trim: true,
        }

        
    },
    {
        timestamps: true
    }
)

const Word = mongoose.model('Word', wordSchema)

export default Word