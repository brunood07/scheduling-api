import { DeleteServiceUseCase } from "../../../../../domain/services/application/usecases/delete-service-use-case";
import { PrismaServicesRepository } from "../../../../database/repository/prisma-services-repository";

export function makeDeleteServiceUseCase() {
  const servicesRepository = new PrismaServicesRepository();
  return new DeleteServiceUseCase(servicesRepository);
}