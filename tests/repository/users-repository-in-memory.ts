import { UsersRepository } from "../../src/domain/clients/application/repository/users-repository";
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
}