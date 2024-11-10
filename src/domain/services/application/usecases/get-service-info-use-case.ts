import { HttpStatus } from "../../../../core/errors/http-status";
import { HttpException } from "../../../../core/errors/HttpException";
import { ServiceProps } from "../../enterprise/entities/Services";
import { ServicesRepository } from "../repository/services-repository";

export class GetServiceInfosUseCase {
  constructor(private serviceRepository: ServicesRepository) { }

  execute = async (id: string): Promise<ServiceProps> => {
    const service = await this.serviceRepository.findById(id);
    if (!service) throw new HttpException(HttpStatus.NOT_FOUND, "service not found");
    return service;
  }
}