import { ServiceProps } from "../../enterprise/entities/Services";
import { ServicesRepository } from "../repository/services-repository";

export interface ListServicesRequestDTO {
  page: number;
  limit: number;
}

export interface ListServicesResponseDTO {
  page: number;
  total: number;
  limit: number;
  totalPages: number;
  list: ServiceProps[];
}

export class ListServicesUseCase {
  constructor(private readonly serviceRepository: ServicesRepository) { }

  execute = async (params: ListServicesRequestDTO): Promise<ListServicesResponseDTO> => {
    const response = await this.serviceRepository.list(params);

    return {
      limit: response.limit,
      page: response.page,
      total: response.total,
      totalPages: response.totalPages,
      list: response.list
    }
  }
}