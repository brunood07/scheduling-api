import { Request, Response } from "express";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { makeGetSchedulingInfoUseCase } from "../factories/schedulings/make-get-scheduling-info-use-case";
import { z } from "zod";

const getSchedulingParams = z.object({
  id: z.string()
});

export class GetSchedulingInfoController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = getSchedulingParams.parse(req.params);
      const sut = makeGetSchedulingInfoUseCase();
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