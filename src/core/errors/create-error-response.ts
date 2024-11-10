import { Response } from 'express';
import { HttpException } from './HttpException';
import { ZodError } from 'zod';
import { HttpStatus } from './http-status';

async function createErrorResponse(error: unknown, res: Response): Promise<Response> {
  if (error instanceof HttpException) {
    return res.status(error.status).send({
      message: error.message,
      responseCode: error.status,
      date: new Date(),
    });
  }

  if (error instanceof ZodError) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      message: error.message,
      responseCode: HttpStatus.BAD_REQUEST,
      date: new Date(),
      data: error.issues
    });
  }

  return res.status(400).send({
    message: "General Exception",
    responseCode: 400,
    date: new Date(),
  });
}

export { createErrorResponse };