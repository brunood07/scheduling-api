import { UserTokensRepository } from "../../src/domain/clients/application/repository/user-tokens-repository";

interface UserToken {
  clientId: string;
  refreshToken: string;
  expiresDate: Date;
}

export class UsersTokensRepositoryInMemory implements UserTokensRepository {

  public items: UserToken[] = [];

  create(clientId: string, refreshToken: string, expiresDate: Date): void {
    const userToken: UserToken = {
      clientId,
      refreshToken,
      expiresDate
    };

    this.items.push(userToken);
  }
}