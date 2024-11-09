import { AuthenticateClientUseCase } from "../../../../../domain/clients/application/usecases/authenticate-client-use-case";
import { BcryptHasher } from "../../../../cryptograph/bcrypt-hasher";
import { PrismaUsersRepository } from "../../../../database/repository/prisma-users-repository";
import { JwtTokenGenerator } from "../../../../jwt/jwt-token-generator";

export function makeAuthenticateUserUseCase() {
  const userRepository = new PrismaUsersRepository();
  const hasher = new BcryptHasher();
  const jwtTokenGenerator = new JwtTokenGenerator();
  return new AuthenticateClientUseCase(userRepository, hasher, jwtTokenGenerator);
}