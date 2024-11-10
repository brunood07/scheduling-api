import { Request, Response } from "express";
import { z } from "zod";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { makeDeleteSchedulingUseCase } from "../factories/schedulings/make-delete-scheduling-use-case.";

const deleteSchedulingParams = z.object({
  id: z.string()
});

export class DeleteSchedulingController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = deleteSchedulingParams.parse(req.params);
      const sut = makeDeleteSchedulingUseCase();
      const response = await sut.execute(id);
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