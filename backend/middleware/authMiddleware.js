import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export async function protect(req, res, next) {
    try {
        const authorization = req.headers.authorization

        if (
            !authorization ||
            !authorization.startsWith('Bearer ')
        ) {
            return res.status(401).json({
                message: 'Authentication required'
            })
        }

        const token = authorization.split(' ')[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const user = await User
            .findById(decoded.id)
            .select('-password')

        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            })
        }

        req.user = user

        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }
}

export function authorize(...allowedRoles) {
    return function (req, res, next) {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You do not have permission'
            })
        }

        next()
    }
}