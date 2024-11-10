import { UsersRepository } from '../repository/users-repository';
import { ClientProps } from '../../enterprise/entities/Client';
import { HttpStatus } from '../../../../core/errors/http-status';
import { HttpException } from '../../../../core/errors/HttpException';

export class GetClientInfoUseCase {
  constructor(private usersRepository: UsersRepository) { }

  execute = async (id: string): Promise<{ client: ClientProps }> => {
    const client = await this.usersRepository.findById(id);
    if (!client) throw new HttpException(HttpStatus.NOT_FOUND, "register not found");
    return { client };
  }
}