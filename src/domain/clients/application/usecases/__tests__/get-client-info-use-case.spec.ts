import { beforeEach, describe, expect, it } from 'vitest';
import { GetClientInfoUseCase } from '../get-client-info-use-case';
import { UsersRepositoryInMemory } from '../../../../../../tests/repository/users-repository-in-memory';
import { makeUser } from '../../../../../../tests/factories/make-user';
import { HttpException } from '../../../../../core/errors/HttpException';

let usersRepository: UsersRepositoryInMemory;
let sut: GetClientInfoUseCase;;

describe("Get client info use case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    sut = new GetClientInfoUseCase(usersRepository);
  });

  it("should be able to return client info", async () => {
    const client = makeUser();
    usersRepository.items.push(client);
    const result = await sut.execute(client.id?.toString() ?? "");
    expect(result.client).toEqual(client);
  });

  it("should not be able to return client info if client does not exist", async () => {
    expect(sut.execute("123")).rejects.toBeInstanceOf(HttpException);
  });
})