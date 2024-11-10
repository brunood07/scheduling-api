import { HttpStatus } from "../../../../core/errors/http-status";
import { HttpException } from "../../../../core/errors/HttpException";
import { UsersRepository } from "../../../clients/application/repository/users-repository";
import { Scheduling } from "../../enterprise/entities/Scheduling";
import { SchedulingRepository } from "../repository/scheduling-repository";

interface CreateSchedulingRequestDTO {
  attendantId: string;
  clientId: string;
  serviceId: string;
  schedulingStart: Date;
  schedulingEnd: Date;
  description: string;
}

interface CreateSchedulingResponseDTO {
  scheduling: Scheduling
}

export class CreateSchedulingUseCase {
  constructor(private schedulingRepository: SchedulingRepository, private usersRepository: UsersRepository) { }

  execute = async (data: CreateSchedulingRequestDTO): Promise<CreateSchedulingResponseDTO> => {
    const clientExists = await this.usersRepository.findById(data.clientId);
    if (!clientExists) throw new HttpException(HttpStatus.NOT_FOUND, "client not found");
    const employeeExists = await this.usersRepository.findById(data.attendantId);
    if (!employeeExists) throw new HttpException(HttpStatus.NOT_FOUND, "employee not found");

    const scheduling = Scheduling.create({
      attendantId: data.attendantId,
      clientId: data.clientId,
      description: data.description,
      rescheduled: false,
      schedulingEnd: new Date(data.schedulingEnd),
      schedulingStart: new Date(data.schedulingStart),
      serviceId: data.serviceId
    });

    await this.schedulingRepository.create(scheduling);

    return {
      scheduling
    }
  }
}