import { ListUsersUseCase } from "../../../../../domain/clients/application/usecases/list-users-use-case";
import { PrismaUsersRepository } from "../../../../database/repository/prisma-users-repository";

export function makeListUsersUseCase() {
  const usersRepository = new PrismaUsersRepository();
  return new ListUsersUseCase(usersRepository);
}