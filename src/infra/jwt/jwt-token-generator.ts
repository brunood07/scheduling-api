import { sign, decode } from "jsonwebtoken";
import { TokenGenerator } from "../../domain/clients/application/jwt/token-generator";
import { env } from "../env";

export class JwtTokenGenerator implements TokenGenerator {
  token(id: string): string {
    const token = sign({}, env.JWT_SECRET, {
      subject: id,
      expiresIn: env.JWT_TOKEN_EXPIRES_IN
    });

    return token;
  }

  refreshToken(phoneNumber: string, id: string): string {
    const refreshToken = sign({ phoneNumber: phoneNumber }, env.JWT_SECRET, {
      subject: id,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
    });

    return refreshToken;
  }

  decode(token: string): string {
    const { sub } = decode(token, {
      json: true
    }) as { sub: string }

    return sub;
  }
}