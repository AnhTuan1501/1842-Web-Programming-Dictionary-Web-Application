import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        wordId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Word',
            required: true
        },

        reason: {
            type: String,
            required: true,
            enum: [
                'Incorrect meaning',
                'Incorrect example',
                'Typo',
                'Wrong language/category',
                'Other'
            ]
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                'pending',
                'resolved',
                'rejected'
            ],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Report', reportSchema)