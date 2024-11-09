import { CreateServiceUseCase } from "../../../../../domain/services/application/usecases/create-service-use-case";
import { PrismaServicesRepository } from "../../../../database/repository/prisma-services-repository";

export function makeCreateServiceUseCase() {
  const servicesRepository = new PrismaServicesRepository();
  return new CreateServiceUseCase(servicesRepository);
}