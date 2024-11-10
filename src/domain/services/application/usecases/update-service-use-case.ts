import { HttpStatus } from "../../../../core/errors/http-status";
import { HttpException } from "../../../../core/errors/HttpException";
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
    if (!service) throw new HttpException(HttpStatus.NOT_FOUND, "service not found");
    return await this.servicesRepository.update(id, data);
  }
}