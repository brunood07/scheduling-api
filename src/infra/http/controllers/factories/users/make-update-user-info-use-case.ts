import { UpdateUserInfoUsecase } from "../../../../../domain/clients/application/usecases/update-user-info-use-case";
import { PrismaUsersRepository } from "../../../../database/repository/prisma-users-repository";

export function makeUpdateUserInfoUseCase() {
  const usersRepository = new PrismaUsersRepository();
  return new UpdateUserInfoUsecase(usersRepository);
}