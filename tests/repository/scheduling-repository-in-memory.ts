import { SchedulingRepository } from "../../src/domain/schedulings/application/repository/scheduling-repository";
import { Scheduling } from "../../src/domain/schedulings/enterprise/entities/Scheduling";

export class SchedulingRepositoryInMemory implements SchedulingRepository {
  items: Scheduling[] = [];

  async create(data: Scheduling): Promise<void> {
    this.items.push(data)
  }

  async findByAttendantId(attendantId: string): Promise<Scheduling[]> {
    const schedulings = await this.items.filter(scheduling => scheduling.attendantId.toString() === attendantId)

    return schedulings;
  }

  async findByClientId(clientId: string): Promise<Scheduling[]> {
    const schedulings = await this.items.filter(scheduling => scheduling.clientId.toString() === clientId)

    return schedulings;
  }

  async findById(id: string): Promise<Scheduling | null> {
    const scheduling = await this.items.find(scheduling => scheduling.id?.toString() === id)
    if (!scheduling) return null;
    return scheduling;
  }

}