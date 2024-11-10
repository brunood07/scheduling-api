import { ClientProps } from "../../enterprise/entities/Client";
import { UsersRepository } from "../repository/users-repository";

interface ListUsersRequestDTO {
  page: number;
  limit: number;
  role: string[];
}

export interface ListUsersResponseDTO {
  page: number;
  total: number;
  limit: number;
  totalPages: number;
  list: ClientProps[];
}

export class ListUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) { }

  execute = async (params: ListUsersRequestDTO): Promise<ListUsersResponseDTO> => {
    const response = await this.usersRepository.list(params);

    return {
      page: response.page,
      total: response.total,
      limit: response.limit,
      totalPages: response.totalPages,
      list: response.list,
    };
  }
}