import mongoose from 'mongoose'

const auditLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        action: {
            type: String,
            required: true,
            enum: [
                'CREATE',
                'UPDATE',
                'DELETE',
                'BULK_DELETE'
            ]
        },

        wordId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Word',
            default: null
        },

        details: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('AuditLog', auditLogSchema)