import { ServiceNotFoundError } from "../../../../core/errors/service-not-found-error";
import { ServiceProps } from "../../enterprise/entities/Services";
import { ServicesRepository } from "../repository/services-repository";

export class GetServiceInfosUseCase {
  constructor(private serviceRepository: ServicesRepository) { }

  execute = async (id: string): Promise<ServiceProps> => {
    const service = await this.serviceRepository.findById(id);
    if (!service) throw new ServiceNotFoundError();
    return service;
  }
}