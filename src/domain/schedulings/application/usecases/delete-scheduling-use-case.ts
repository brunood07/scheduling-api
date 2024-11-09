import { SchedulingRepository } from "../repository/scheduling-repository";

export class DeleteSchedulingUseCase {
  constructor(private schedulingRepository: SchedulingRepository) { }

  execute = async (id: string): Promise<void> => {
    await this.schedulingRepository.delete(id);
  }
}