import { beforeEach, describe, expect, it } from 'vitest';
import { FakeHasher } from '../../../../../../tests/cryptograph/fake-hasher';
import { makeUser } from '../../../../../../tests/factories/make-user';
import { UsersRepositoryInMemory } from '../../../../../../tests/repository/users-repository-in-memory';
import { AuthenticateClientUseCase } from '../authenticate-client-use-case';
import { UsersTokensRepositoryInMemory } from '../../../../../../tests/repository/users-tokens-repository-in-memory';
import { FakeTokenGenerator } from '../../../../../../tests/jwt/fake-token-generator';
import { InvalidCredentialsError } from '../../../../../core/errors/invalid-credentials-error';

let usersRepository: UsersRepositoryInMemory
let fakeHasher: FakeHasher;
let tokenGenerator: FakeTokenGenerator;
let sut: AuthenticateClientUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    fakeHasher = new FakeHasher();
    tokenGenerator = new FakeTokenGenerator();
    sut = new AuthenticateClientUseCase(usersRepository, fakeHasher, tokenGenerator);
  })

  it('should be able to authenticate a user', async () => {
    const user = makeUser({ phoneNumber: '11999999999', password: '123456-hashed' });
    usersRepository.items.push(user);

    const { token } = await sut.execute({
      phoneNumber: '11999999999',
      password: '123456'
    });

    expect(token).toEqual(expect.any(String))
  })

  it('should not be able ot authenticate a user with invalid email', async () => {
    const user = makeUser()
    usersRepository.items.push(user)

    expect(sut.execute({
      phoneNumber: '11999999999',
      password: 'teste123'
    })).rejects.toEqual(new InvalidCredentialsError());
  })

  it('should not be able ot authenticate a user with invalid password', async () => {
    const user = makeUser()
    usersRepository.items.push(user)

    expect(sut.execute({
      phoneNumber: '11999999999',
      password: 'teste1234'
    })).rejects.toEqual(new InvalidCredentialsError())
  })
})