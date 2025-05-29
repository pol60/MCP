import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../config/database'
import { User } from '../entities/User'

interface JwtPayload {
  userId: number
}

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new Error()
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload
    const user = await AppDataSource.getRepository(User).findOneBy({ id: decoded.userId })

    if (!user) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' })
  }
}

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Please authenticate' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' })
    }

    next()
  }
} 