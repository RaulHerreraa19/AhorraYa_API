// import * as jwt from 'jsonwebtoken'
// import { Request, Response, NextFunction } from 'express'

// export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers.authorization
//   if (authHeader == null) {
//     res.status(401).json({ message: 'No token provided' })
//     return
//   }
//   const token = authHeader.split(' ')[1]
//   if (token == null) {
//     res.status(401).json({ message: 'No token provided' })
//     return
//   }
//   try {
//     const secretKey = process.env.JWT_SECRET as string
//     const decoded = jwt.verify(token, secretKey)
//     (req as any).user = decoded
//     next()
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' })
//   }
// }
