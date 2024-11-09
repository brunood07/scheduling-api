import { UsersRepository } from "../repository/users-repository";

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  execute = async (id: string) => {
    await this.usersRepository.delete(id);
  }
}