import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'] as string;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    console.log('Token:', token); // Log the token for debugging

    try {
      const decoded = verify(token, 'TP1NEST') as { userId: number };
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
