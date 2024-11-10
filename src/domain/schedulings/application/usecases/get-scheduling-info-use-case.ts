import { HttpStatus } from "../../../../core/errors/http-status";
import { HttpException } from "../../../../core/errors/HttpException";
import { SchedulingRepository } from "../repository/scheduling-repository";

export class GetSchedulingInfoUseCase {
  constructor(private schedulingRepository: SchedulingRepository) { }

  execute = async (id: string) => {
    const scheduling = await this.schedulingRepository.findById(id);
    if (!scheduling) throw new HttpException(HttpStatus.NOT_FOUND, "scheduling not found");
    return scheduling;
  }
}