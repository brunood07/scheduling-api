import { Request, Response } from "express";
import { makeUpdateUserInfoUseCase } from "../factories/users/make-update-user-info-use-case"
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { extractUserIdFromAccessToken } from "../../../../core/request/extract-user-id-from-access-token";
import { z } from "zod";

const updateUserInfoBody = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.date().optional()
})
export class UpdateUserInfoController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = extractUserIdFromAccessToken(req.headers.authorization as string);
      const body = updateUserInfoBody.parse(req.body);
      const sut = makeUpdateUserInfoUseCase();
      const response = await sut.execute(userId, body);
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