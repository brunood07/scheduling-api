import { UpdateServiceUseCase } from "../../../../../domain/services/application/usecases/update-service-use-case";
import { PrismaServicesRepository } from "../../../../database/repository/prisma-services-repository";

export function makeUpdateServiceUseCase() {
  const servicesRepository = new PrismaServicesRepository();
  return new UpdateServiceUseCase(servicesRepository);
}