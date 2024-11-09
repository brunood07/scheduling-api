import { DeleteUserUseCase } from "../../../../../domain/clients/application/usecases/delete-user-use-case";
import { PrismaUsersRepository } from "../../../../database/repository/prisma-users-repository";

export function makeDeleteUserUseCase() {
  const userRepository = new PrismaUsersRepository();
  return new DeleteUserUseCase(userRepository);
}