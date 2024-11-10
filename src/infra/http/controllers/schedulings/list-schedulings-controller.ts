import { Request, Response } from "express";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { z } from "zod";
import { makeListSchedulingsUseCase } from "../factories/schedulings/make-list-schedulings-use-case";

const listSchedulingsParams = z.object({
  page: z.number(),
  limit: z.number(),
  clientId: z.string().optional(),
  attendantId: z.string().optional(),
  schedulingStart: z.coerce.date().optional(),
  schedulingEnd: z.coerce.date().optional(),
  selectedService: z.number().optional()
})

export class ListSchedulingsController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const params = listSchedulingsParams.parse(req.query);
      const sut = makeListSchedulingsUseCase();
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