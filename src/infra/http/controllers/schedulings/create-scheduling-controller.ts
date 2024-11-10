import { Request, Response } from "express";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { z } from "zod";
import { makeCreateSchedulingUseCase } from "../factories/schedulings/make-create-scheduling-use-case";

const createSchedulingSchema = z.object({
  attendantId: z.string(),
  clientId: z.string(),
  serviceId: z.string(),
  schedulingStart: z.coerce.date(),
  schedulingEnd: z.coerce.date(),
  description: z.string()
});
export class CreateSchedulingController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const body = createSchedulingSchema.parse(req.body);
      const sut = makeCreateSchedulingUseCase();
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