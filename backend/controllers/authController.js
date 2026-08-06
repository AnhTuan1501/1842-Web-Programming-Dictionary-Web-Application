// npm install bcryptjs jsonwebtoken

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'

function createToken(user) {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            name: user.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )
}

// POST /api/auth/register
export async function register(req, res) {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        })

        res.status(201).json({
            token: createToken(user),

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// POST /api/auth/login
export async function login(req, res) {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        )

        if (!passwordMatches) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        res.json({
            token: createToken(user),

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}