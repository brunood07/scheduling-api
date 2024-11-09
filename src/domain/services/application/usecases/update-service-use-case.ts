import { ServiceNotFoundError } from "../../../../core/errors/service-not-found-error";
import { ServicesRepository } from "../repository/services-repository";

interface UpdateServiceRequestDTO {
  name: string;
  description: string;
  price: number;
  durationInMinutes: number;
}

export class UpdateServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) { }

  execute = async (id: string, data: UpdateServiceRequestDTO) => {
    const service = await this.servicesRepository.findById(id);
    if (!service) throw new ServiceNotFoundError();
    return await this.servicesRepository.update(id, data);
  }
}