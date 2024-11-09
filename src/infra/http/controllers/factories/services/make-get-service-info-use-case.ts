import { GetServiceInfosUseCase } from "../../../../../domain/services/application/usecases/get-service-info-use-case";
import { PrismaServicesRepository } from "../../../../database/repository/prisma-services-repository";

export function makeGetServiceInfoUseCase() {
  const servicesRepository = new PrismaServicesRepository();
  return new GetServiceInfosUseCase(servicesRepository);
}