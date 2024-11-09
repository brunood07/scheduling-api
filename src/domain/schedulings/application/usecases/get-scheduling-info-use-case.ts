import { SchedulingNotFoundError } from "../../../../core/errors/scheduling-not-found-error";
import { SchedulingRepository } from "../repository/scheduling-repository";

export class GetSchedulingInfoUseCase {
  constructor(private schedulingRepository: SchedulingRepository) { }

  execute = async (id: string) => {
    const scheduling = await this.schedulingRepository.findById(id);
    if (!scheduling) throw new SchedulingNotFoundError();
    return scheduling;
  }
}