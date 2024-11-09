import { ListParams, ListResponse, SchedulingRepository, UpdateDate } from "../../src/domain/schedulings/application/repository/scheduling-repository";
import { Scheduling, SchedulingProps } from "../../src/domain/schedulings/enterprise/entities/Scheduling";

export class SchedulingRepositoryInMemory implements SchedulingRepository {
  items: Scheduling[] = [];

  async create(data: Scheduling): Promise<void> {
    this.items.push(data)
  }

  async findByAttendantId(attendantId: string): Promise<SchedulingProps[]> {
    const schedulings = await this.items.filter(scheduling => scheduling.attendantId.toString() === attendantId)

    return schedulings;
  }

  async findByClientId(clientId: string): Promise<SchedulingProps[]> {
    const schedulings = await this.items.filter(scheduling => scheduling.clientId.toString() === clientId)

    return schedulings;
  }

  async findById(id: string): Promise<SchedulingProps | null> {
    const scheduling = await this.items.find(scheduling => scheduling.id?.toString() === id)
    if (!scheduling) return null;
    return scheduling;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex(scheduling => scheduling.id?.toString() === id);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  async list(params: ListParams): Promise<ListResponse> {
    const { page = 1, limit = 10, attendantId, clientId, schedulingEnd, schedulingStart, serviceId } = params;
    const start = (page - 1) * limit;
    const end = start + limit;

    let filteredItems = this.items;

    if (attendantId) {
      filteredItems = filteredItems.filter(item => item.attendantId.toString() === attendantId);
    }

    if (clientId) {
      filteredItems = filteredItems.filter(item => item.clientId.toString() === clientId);
    }

    if (schedulingStart) {
      filteredItems = filteredItems.filter(item => item.schedulingStart >= schedulingStart);
    }

    if (schedulingEnd) {
      filteredItems = filteredItems.filter(item => item.schedulingEnd <= schedulingEnd);
    }

    if (serviceId) {
      filteredItems = filteredItems.filter(item => item.serviceId === serviceId);
    }

    const items = filteredItems.slice(start, end);
    const total = filteredItems.length;

    return {
      list: items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async update(id: string, data: UpdateDate): Promise<SchedulingProps> {
    const scheduling = await this.findById(id);
    if (!scheduling) {
      throw new Error('Scheduling not found');
    }

    const index = this.items.findIndex(item => item.id?.toString() === id);
    if (index >= 0) {
      Object.assign(this.items[index], data);
      return this.items[index];
    }

    throw new Error('Scheduling not found');
  }
}