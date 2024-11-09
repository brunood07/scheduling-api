import { GetClientInfoUseCase } from "../../../../../domain/clients/application/usecases/get-client-info-use-case";
import { PrismaUsersRepository } from "../../../../database/repository/prisma-users-repository";

export function makeGetUserInfoUseCase() {
  const usersRepository = new PrismaUsersRepository();
  return new GetClientInfoUseCase(usersRepository);
}