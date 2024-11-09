import { beforeEach, describe, expect, it } from 'vitest';
import { ServicesRepositoryInMemory } from '../../../../../../tests/repository/services-repository-in-memory';
import { CreateServiceUseCase } from '../create-service-use-case';

let servicesRepository: ServicesRepositoryInMemory;
let sut: CreateServiceUseCase;

describe('Create service test', () => {

  beforeEach(() => {
    servicesRepository = new ServicesRepositoryInMemory();
    sut = new CreateServiceUseCase(servicesRepository);
  });

  it("should be able to create a service", async () => {
    const { service } = await sut.execute({
      description: "Test",
      durationInMinutes: 60,
      name: "Test",
      price: 100
    });

    expect(service.name).toBe("Test");
  });
})