import { Service } from "../../enterprise/entities/Services";
import { ServicesRepository } from "../repository/services-repository";

interface CreateServiceRequestDTO {
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
}

interface CreateServiceResponseDTO {
  service: Service
}

export class CreateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) { }

  execute = async (data: CreateServiceRequestDTO): Promise<CreateServiceResponseDTO> => {
    const service = Service.create({
      name: data.name,
      description: data.description,
      durationInMinutes: data.durationInMinutes,
      price: data.price
    });

    await this.servicesRepository.create(service);

    return {
      service
    }
  }
}