import { CreateSchedulingUseCase } from "../../../../../domain/schedulings/application/usecases/create-scheduling-use-case";
import { PrismaSchedulingsRepository } from "../../../../database/repository/prisma-schedulings-repository";
import { PrismaUsersRepository } from "../../../../database/repository/prisma-users-repository";

export function makeCreateSchedulingUseCase() {
  const schedulingsRepository = new PrismaSchedulingsRepository();
  const usersRepository = new PrismaUsersRepository();
  return new CreateSchedulingUseCase(schedulingsRepository, usersRepository);
}