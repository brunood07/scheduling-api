import { ListResponse, ListUsersParams, UsersRepository } from "../../src/domain/clients/application/repository/users-repository";
import { Client, ClientProps } from "../../src/domain/clients/enterprise/entities/Client";

export class UsersRepositoryInMemory implements UsersRepository {
  items: ClientProps[] = [];

  async create(data: Client): Promise<void> {
    this.items.push(data);
  }
  async findByPhoneNumber(phoneNumber: string): Promise<ClientProps | null> {
    const client = await this.items.find(client => client.phoneNumber === phoneNumber);
    if (!client) return null;
    return client;
  }

  async findById(id: string): Promise<ClientProps | null> {
    const client = await this.items.find(client => client.id?.toString() === id);
    if (!client) return null;
    return client;
  }

  async list(params: ListUsersParams): Promise<ListResponse> {
    const { page = 1, limit = 10 } = params;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const data = this.items.slice(startIndex, endIndex);
    const total = this.items.length;

    return {
      list: data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };

  }
  async delete(id: string): Promise<void> {
    const index = this.items.findIndex(client => client.id?.toString() === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }

  }
  async update(id: string, data: any): Promise<ClientProps> {
    const index = this.items.findIndex(client => client.id?.toString() === id);
    this.items[index] = { ...this.items[index], ...data };
    return this.items[index];
  }
}