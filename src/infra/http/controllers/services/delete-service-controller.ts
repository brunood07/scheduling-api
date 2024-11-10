import { Request, Response } from "express";
import { z } from "zod";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { makeDeleteServiceUseCase } from "../factories/services/make-delete-service-use-case";

const deleteServicerParams = z.object({
  id: z.string()
});

export class DeleteServiceController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = deleteServicerParams.parse(req.params);
      const sut = makeDeleteServiceUseCase();
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