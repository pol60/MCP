import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../config/database'
import { User } from '../entities/User'
import { auth } from '../middleware/auth'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userRepository = AppDataSource.getRepository(User)
    const existingUser = await userRepository.findOneBy({ email })

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await userRepository.save(user)

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ email })

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = req.user
    res.json({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router 