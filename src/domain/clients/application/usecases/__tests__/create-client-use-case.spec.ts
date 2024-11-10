import { beforeEach, describe, expect, it } from 'vitest';
import { CreateClientUseCase } from '../create-client-use-case';
import { FakeHasher } from '../../../../../../tests/cryptograph/fake-hasher';
import { UsersRepositoryInMemory } from '../../../../../../tests/repository/users-repository-in-memory';
import { HttpException } from '../../../../../core/errors/HttpException';

let usersRepository: UsersRepositoryInMemory;
let fakeHasher: FakeHasher;
let sut: CreateClientUseCase;

describe('Register client use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    fakeHasher = new FakeHasher();
    sut = new CreateClientUseCase(usersRepository, fakeHasher);
  });

  it('should be able to register a client', async () => {
    const result = await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
      phoneNumber: '119999999',
      dateOfBirth: '1991-01-07'
    });

    expect(result.client).toEqual(
      usersRepository.items[0]
    );
  });

  it('should not be able to register a client with already registered phone number', async () => {
    await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
      phoneNumber: '119999999',
      dateOfBirth: '1991-01-07'
    });

    expect(sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
      phoneNumber: '119999999',
      dateOfBirth: '1991-01-07'
    })).rejects.toBeInstanceOf(HttpException);
  });

  it('should be able to hash the client password', async () => {
    await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
      phoneNumber: '119999999',
      dateOfBirth: '1991-01-07'
    });

    const hashedPassword = await fakeHasher.hash('123456')

    expect(usersRepository.items[0].password).toEqual(hashedPassword);
  });
})