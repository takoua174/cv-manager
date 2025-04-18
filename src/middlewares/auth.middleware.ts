import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
      const secret = process.env.JWT_SECRET || 'TP1NEST';
      const decoded = verify(token, secret) as { userId?: number };
      
      if (!decoded?.userId) {
        return res.status(401).json({ message: 'Invalid token: userId missing' });
      }

      (req as any).user = { userId: decoded.userId };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}