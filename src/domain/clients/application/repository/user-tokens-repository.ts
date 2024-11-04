export interface UserTokensRepository {
  create(clientId: string, refreshToken: string, expiresDate: Date): void;
}