import { UserNotFoundError } from '../../../../core/errors/user-not-found-error';
import { UsersRepository } from '../repository/users-repository';
import { ClientProps } from '../../enterprise/entities/Client';

export class GetClientInfoUseCase {
  constructor(private usersRepository: UsersRepository) { }

  execute = async (id: string): Promise<{ client: ClientProps }> => {
    const client = await this.usersRepository.findById(id);
    if (!client) throw new UserNotFoundError();
    return { client };
  }
}