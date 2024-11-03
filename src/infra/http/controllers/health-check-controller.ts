import { Request, Response } from 'express';

export class HealthCheckController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ok',
        timestamp: new Date().toISOString()
      });
    }
  }
}
