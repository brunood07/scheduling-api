import { ListSchedulingsUseCase } from "../../../../../domain/schedulings/application/usecases/list-schedulings-use-case";
import { PrismaSchedulingsRepository } from "../../../../database/repository/prisma-schedulings-repository";

export function makeListSchedulingsUseCase() {
  const schedulingsRepository = new PrismaSchedulingsRepository();
  return new ListSchedulingsUseCase(schedulingsRepository);
}