import AuditLog from '../models/auditLogModel.js'

export async function createAuditLog({
    userId,
    action,
    wordId = null,
    details = ''
}) {
    await AuditLog.create({
        userId,
        action,
        wordId,
        details
    })
}

export async function getAuditLogs(req, res) {
    try {
        const logs = await AuditLog.find()
            .populate('userId', 'name email role')
            .populate('wordId', 'word language')
            .sort({ createdAt: -1 })

        res.json(logs)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot retrieve audit logs.',
            error: error.message
        })
    }
}