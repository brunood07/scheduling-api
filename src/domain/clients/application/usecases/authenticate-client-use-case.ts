import { UsersRepository } from '../repository/users-repository';
import { HashComparer } from '../cryptograph/hash-comparer';
import { add } from 'date-fns';
import { TokenGenerator } from '../jwt/token-generator';
import { HttpException } from '../../../../core/errors/HttpException';
import { HttpStatus } from '../../../../core/errors/http-status';

interface AuthenticateClientRequestDTO {
  phoneNumber: string;
  password: string;
}

interface AuthenticateClientResponseDTO {
  token: string;
  client: {
    fullName: string;
    phoneNumber: string;
  };
  refreshToken: string;
}

export class AuthenticateClientUseCase {
  constructor(
    private clientsRepository: UsersRepository,
    private hashComparer: HashComparer,
    private tokenGenerator: TokenGenerator
  ) { }

  execute = async ({
    phoneNumber,
    password
  }: AuthenticateClientRequestDTO): Promise<AuthenticateClientResponseDTO> => {
    const client = await this.clientsRepository.findByPhoneNumber(phoneNumber);
    if (!client || !client.id) throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid credentials");

    const passwordMatch = await this.hashComparer.compare(password, client.password);
    if (!client || !client.id) throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid credentials");

    const token = this.tokenGenerator.token(client.id);
    const refreshToken = this.tokenGenerator.refreshToken(phoneNumber, client.id);

    const refreshTokenExpiresDate = add(new Date(), {
      days: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS)
    });

    const tokenReturn = {
      token,
      client: {
        fullName: `${client.firstName} ${client.lastName}`,
        phoneNumber: client.phoneNumber
      },
      refreshToken
    };

    return tokenReturn;
  };
}