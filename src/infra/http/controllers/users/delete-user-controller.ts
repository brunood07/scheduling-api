import { Request, Response } from "express";
import { makeDeleteUserUseCase } from "../factories/users/make-delete-user-use-case";
import { z } from "zod";
import { createErrorResponse } from "../../../../core/errors/create-error-response";

const deleteUserParams = z.object({
  id: z.string()
});

export class DeleteUserController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = deleteUserParams.parse(req.params);
      const sut = makeDeleteUserUseCase();
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