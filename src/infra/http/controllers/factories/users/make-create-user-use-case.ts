import { CreateClientUseCase } from "../../../../../domain/clients/application/usecases/create-client-use-case";
import { BcryptHasher } from "../../../../cryptograph/bcrypt-hasher";
import { PrismaUsersRepository } from "../../../../database/repository/prisma-users-repository";
import { JwtTokenGenerator } from "../../../../jwt/jwt-token-generator";

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUsersRepository();
  const hasher = new BcryptHasher();
  return new CreateClientUseCase(userRepository, hasher);
}