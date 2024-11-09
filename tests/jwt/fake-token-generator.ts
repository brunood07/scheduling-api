import { TokenGenerator } from "../../src/domain/clients/application/jwt/token-generator";

export class FakeTokenGenerator implements TokenGenerator {
  token(id: string): string {
    return id;
  }

  refreshToken(phoneNumber: string, id: string): string {
    return `${phoneNumber}-${id}`;
  }

  decode(token: string): string {
    return token;
  }
}