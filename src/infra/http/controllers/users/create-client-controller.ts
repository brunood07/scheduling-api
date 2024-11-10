import { Request, Response } from "express";
import { makeCreateUserUseCase } from "../factories/users/make-create-user-use-case"
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { z } from "zod";

const createClientSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  dateOfBirth: z.string(),
  password: z.string()
})

export class CreateClientController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const body = createClientSchema.parse(req.body);
      const sut = makeCreateUserUseCase();
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