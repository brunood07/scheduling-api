import { SchedulingProps } from "../../enterprise/entities/Scheduling";
import { SchedulingRepository } from "../repository/scheduling-repository";

interface UpdateSchedulingRequestDTO {
  schedulingStart?: Date;
  schedulingEnd?: Date;
  descriptions?: string;
  attendantId?: string;
  selectedService?: number;
}

export class UpdateSchedulingUseCase {
  constructor(private readonly schedulingRepository: SchedulingRepository) { }

  execute = async (id: string, data: UpdateSchedulingRequestDTO): Promise<SchedulingProps> => {
    return this.schedulingRepository.update(id, data);
  }
}