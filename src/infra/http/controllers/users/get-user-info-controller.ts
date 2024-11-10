import { Request, Response } from "express";
import { makeGetUserInfoUseCase } from "../factories/users/make-get-user-info-use-case"
import { createErrorResponse } from "../../../../core/errors/create-error-response";
import { extractUserIdFromAccessToken } from "../../../../core/request/extract-user-id-from-access-token";

export class GetUserInfoController {

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = extractUserIdFromAccessToken(req.headers.authorization as string);
      const sut = makeGetUserInfoUseCase();
      const response = await sut.execute(userId);
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