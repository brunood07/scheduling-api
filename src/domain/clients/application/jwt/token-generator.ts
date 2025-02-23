export interface TokenGenerator {
  token(id: string): string;
  refreshToken(phoneNumber: string, id: string): string;
  decode(token: string): string;
}