import { ClientProps } from "../../enterprise/entities/Client";

export interface UsersRepository {
  create(data: ClientProps): Promise<void>;
  findByPhoneNumber(phoneNumber: string): Promise<ClientProps | null>;
  findById(id: string): Promise<ClientProps | null>;
  list(params: ListUsersParams): Promise<ListResponse>;
  delete(id: string): Promise<void>;
  update(id: string, data: UpdateUserData): Promise<ClientProps>;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
}

export interface ListUsersParams {
  page: number;
  limit: number;
  role: string[];
}

export interface ListResponse {
  page: number;
  total: number;
  limit: number;
  totalPages: number;
  list: ClientProps[];
}