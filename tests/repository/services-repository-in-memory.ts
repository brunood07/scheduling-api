import { ListParams, ListParamsResponse, ServicesRepository, UpdateService } from "../../src/domain/services/application/repository/services-repository";
import { Service, ServiceProps } from "../../src/domain/services/enterprise/entities/Services";

export class ServicesRepositoryInMemory implements ServicesRepository {
  public items: ServiceProps[] = [];

  async create(data: Service): Promise<void> {
    this.items.push(data);
  }

  async update(id: string, data: UpdateService): Promise<ServiceProps> {
    const serviceIndex = this.items.findIndex(item => item.id === id);

    if (serviceIndex === -1) {
      throw new Error("Service not found");
    }

    this.items[serviceIndex] = {
      ...this.items[serviceIndex],
      ...data
    };

    return this.items[serviceIndex];
  }

  async findById(id: string): Promise<ServiceProps> {
    const service = this.items.find(item => item.id === id);

    if (!service) {
      throw new Error("Service not found");
    }

    return service;
  }

  async list(params: ListParams): Promise<ListParamsResponse> {
    const { page = 1, limit = 10 } = params;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const items = this.items.slice(startIndex, endIndex);
    const total = this.items.length;

    return {
      list: items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async delete(id: string): Promise<void> {
    const serviceIndex = this.items.findIndex(item => item.id === id);

    if (serviceIndex === -1) {
      throw new Error("Service not found");
    }

    this.items.splice(serviceIndex, 1);
  }
}