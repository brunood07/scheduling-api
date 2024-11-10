import { Request, Response } from "express";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { z } from "zod";
import { makeUpdateServiceUseCase } from "../factories/services/make-update-service-use-case";

const updateServiceInfoParams = z.object({
  id: z.string()
})

const updateServiceInfoBody = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  durationInMinutes: z.number()
})

export class UpdateServiceController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = updateServiceInfoParams.parse(req.params);
      const body = updateServiceInfoBody.parse(req.body);
      const sut = makeUpdateServiceUseCase();
      const response = await sut.execute(id, body);
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