import { ClientProps } from "../../enterprise/entities/Client";

export interface UsersRepository {
  create(data: ClientProps): Promise<void>;
  findByPhoneNumber(phoneNumber: string): Promise<ClientProps | null>;
  findById(id: string): Promise<ClientProps | null>;
}