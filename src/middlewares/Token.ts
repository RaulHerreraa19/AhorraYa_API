import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface CustomJwtPayload extends JwtPayload {
  id: string
  email: string
  role: string
}

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization
  if (authHeader == null) {
    res.status(401).json({ message: 'No token provided' })
    return
  }
  const token = authHeader.split(' ')[1]
  if (token == null) {
    res.status(401).json({ message: 'No token provided' })
    return
  }
  try {
    const secretKey = process.env.JWT_SECRET as string
    jwt.verify(token, secretKey)
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export const validateAdminToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization
  console.log('Auth Header:', authHeader)
  if (authHeader == null) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  const token = authHeader.split(' ')[1]
  if (token == null) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  try {
    const secretKey = process.env.JWT_SECRET as string
    const decoded = jwt.verify(token, secretKey) as JwtPayload

    if (decoded.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admins only.' })
      return
    }

    req.body.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
