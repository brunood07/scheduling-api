import { UpdateSchedulingUseCase } from "../../../../../domain/schedulings/application/usecases/update-scheduling-use-case";
import { PrismaSchedulingsRepository } from "../../../../database/repository/prisma-schedulings-repository";

export function makeUpdateSchedulingUseCase() {
  const schedulingRepository = new PrismaSchedulingsRepository();
  return new UpdateSchedulingUseCase(schedulingRepository);
}