import { Request, Response } from "express";
import { makeListUsersUseCase } from "../factories/users/make-list-users-use-case"
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { z } from "zod";

const listUsersParams = z.object({
  page: z.number(),
  limit: z.number(),
  role: z.array(z.string())
})
export class ListUsersController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const params = listUsersParams.parse(req.query);
      const sut = makeListUsersUseCase();
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