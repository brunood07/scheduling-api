import { Request, Response } from "express";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { z } from "zod";
import { makeCreateServiceUseCase } from "../factories/services/make-create-service-use-case";

const createServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
  durationInMinutes: z.number(),
  price: z.number()
})
export class CreateServiceController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const body = createServiceSchema.parse(req.body);
      const sut = makeCreateServiceUseCase();
      const response = await sut.execute(body);
      return res.status(201).send({
        message: "success",
        responseCode: 201,
        date: new Date(),
        data: response
      })
    } catch (err) {
      return createErrorResponse(err, res);
    }
  }
}