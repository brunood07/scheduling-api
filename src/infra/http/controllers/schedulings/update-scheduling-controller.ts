import { Request, Response } from "express";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { z } from "zod";
import { makeUpdateSchedulingUseCase } from "../factories/schedulings/make-update-scheduling-use-case";

const updateSchedulingParams = z.object({
  id: z.string()
});

const updateSchedulingInfoBody = z.object({
  schedulingStart: z.date().optional(),
  schedulingEnd: z.date().optional(),
  descriptions: z.string().optional(),
  attendantId: z.string().optional(),
  selectedService: z.number().optional()
})
export class UpdateSchedulingController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = updateSchedulingParams.parse(req.params);
      const body = updateSchedulingInfoBody.parse(req.body);
      const sut = makeUpdateSchedulingUseCase();
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