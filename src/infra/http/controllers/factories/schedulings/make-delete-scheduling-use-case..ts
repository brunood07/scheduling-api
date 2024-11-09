import { DeleteSchedulingUseCase } from "../../../../../domain/schedulings/application/usecases/delete-scheduling-use-case";
import { PrismaSchedulingsRepository } from "../../../../database/repository/prisma-schedulings-repository";

export function makeDeleteSchedulingUseCase() {
  const schedulingRepository = new PrismaSchedulingsRepository();
  return new DeleteSchedulingUseCase(schedulingRepository);
}