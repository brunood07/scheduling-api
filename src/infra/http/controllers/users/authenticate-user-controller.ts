import { Request, Response } from "express";
import { z } from "zod";
import { makeAuthenticateUserUseCase } from "../factories/users/make-authenticate-user-use-case"
import { HttpException } from "../../../../core/errors/HttpException";
import { createErrorResponse } from "../../../../core/errors/create-error-response";

const authenticateUserSchema = z.object({
  phoneNumber: z.string(),
  password: z.string(),
})

export class AuthenticateUserController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const body = authenticateUserSchema.parse(req.body);
      const sut = makeAuthenticateUserUseCase();
      const response = await sut.execute(body);
      return res.status(200).send({
        message: "success",
        responseCode: 200,
        date: new Date(),
        data: response
      })
    } catch (err) {
      return createErrorResponse(err, res);
    }
  }
}