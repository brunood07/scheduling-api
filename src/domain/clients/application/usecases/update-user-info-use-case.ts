import { UserNotFoundError } from "../../../../core/errors/user-not-found-error";
import { ClientProps } from "../../enterprise/entities/Client";
import { UsersRepository } from "../repository/users-repository";

interface UpdateUserRequestDTO {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
}

export class UpdateUserInfoUsecase {
  constructor(private usersRepository: UsersRepository) { }

  execute = async (id: string, data: UpdateUserRequestDTO): Promise<ClientProps> => {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new UserNotFoundError();
    return await this.usersRepository.update(id, data);
  }
} 