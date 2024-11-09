import { GetSchedulingInfoUseCase } from "../../../../../domain/schedulings/application/usecases/get-scheduling-info-use-case";
import { PrismaSchedulingsRepository } from "../../../../database/repository/prisma-schedulings-repository";

export function makeGetSchedulingInfoUseCase() {
  const schedulingRepository = new PrismaSchedulingsRepository();
  return new GetSchedulingInfoUseCase(schedulingRepository);
}