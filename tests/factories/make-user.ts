import { Client, ClientProps } from "../../src/domain/clients/enterprise/entities/Client";
import { ClientRoles } from "../../src/domain/clients/enterprise/enums/ClientRoles";
import { faker } from '@faker-js/faker';
import { prisma } from "../../src/infra/database/prisma";
import { PrismaUserMapper } from "../../src/infra/database/mappers/prisma-user-mapping";

export function makeUser(
  override: Partial<ClientProps> = {},
) {

  return Client.create({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.number(),
    role: ClientRoles.CLIENT,
    dateOfBirth: new Date(),
    ...override
  }).toJSON();
}

export class UserFactory {
  async makePrismaUser(data: Partial<ClientProps>) {
    const user = makeUser(data);
    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(user)
    });

    return user;
  }
}