import { Request, Response } from "express";
import { z } from "zod";
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { makeGetServiceInfoUseCase } from "../factories/services/make-get-service-info-use-case";

const getServiceinfoParams = z.object({
  id: z.string()
});

export class GetServiceInfoController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = getServiceinfoParams.parse(req.params);
      const sut = makeGetServiceInfoUseCase();
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