import { Request, Response } from "express";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { z } from "zod";
import { makeListServicesUseCase } from "../factories/services/make-list-services-use-case";

const listServicesParams = z.object({
  page: z.number(),
  limit: z.number(),
  role: z.array(z.string())
})
export class ListServicesController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const params = listServicesParams.parse(req.query);
      const sut = makeListServicesUseCase();
      const response = await sut.execute(params);
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