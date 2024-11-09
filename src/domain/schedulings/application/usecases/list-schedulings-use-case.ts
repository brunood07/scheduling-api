import { SchedulingProps } from "../../enterprise/entities/Scheduling";
import { SchedulingRepository } from "../repository/scheduling-repository";

interface ListSchedulingsRequestDTO {
  page: number;
  limit: number;
  clientId?: string;
  attendantId?: string;
  schedulingStart?: Date;
  schedulingEnd?: Date;
  selectedService?: number;
}

interface ListSchedulingsResponseDTO {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  list: SchedulingProps[];
}

export class ListSchedulingsUseCase {
  constructor(private schedulingRepository: SchedulingRepository) { }

  execute = async (params: ListSchedulingsRequestDTO): Promise<ListSchedulingsResponseDTO> => {
    const response = await this.schedulingRepository.list(params);

    return {
      page: response.page,
      limit: response.limit,
      total: response.total,
      totalPages: response.totalPages,
      list: response.list,
    }
  }
}