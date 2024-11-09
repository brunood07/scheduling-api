import { beforeEach, describe, expect, it } from 'vitest';
import { ClientRoles } from '../../../../clients/enterprise/enums/ClientRoles';
import { makeUser } from '../../../../../../tests/factories/make-user';
import { SchedulingRepositoryInMemory } from '../../../../../../tests/repository/scheduling-repository-in-memory';
import { UsersRepositoryInMemory } from '../../../../../../tests/repository/users-repository-in-memory';
import { CreateSchedulingUseCase } from '../create-scheduling-use-case';
import { randomUUID } from 'node:crypto';

let usersRepository: UsersRepositoryInMemory;
let schedulingRepository: SchedulingRepositoryInMemory;
let sut: CreateSchedulingUseCase;

describe('Create scheduling test', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    schedulingRepository = new SchedulingRepositoryInMemory();
    sut = new CreateSchedulingUseCase(schedulingRepository, usersRepository);
  });

  it('should be able to create a scheduling', async () => {
    const client = makeUser();
    const employee = makeUser({ role: ClientRoles.EMPLOYEE });
    usersRepository.items.push(client);
    usersRepository.items.push(employee);
    const date = new Date();
    const startingScheduling = new Date(date);
    startingScheduling.setDate(date.getDate() + 1);

    const result = await sut.execute({
      attendantId: employee.id?.toString() ?? "",
      clientId: client.id?.toString() ?? "",
      description: 'raspar o cabelo',
      schedulingEnd: new Date(startingScheduling.getTime() + (1 * 60 * 60 * 1000)),
      schedulingStart: startingScheduling,
      serviceId: randomUUID()
    });

    expect(result.scheduling).toEqual(
      schedulingRepository.items[0]
    );
  });
});