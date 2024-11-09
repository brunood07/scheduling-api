import { ListServicesUseCase } from "../../../../../domain/services/application/usecases/list-services-use-case";
import { PrismaServicesRepository } from "../../../../database/repository/prisma-services-repository";

export function makeListServicesUseCase() {
  const servicesRepository = new PrismaServicesRepository();
  return new ListServicesUseCase(servicesRepository);
}