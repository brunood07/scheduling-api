import { Prisma, User as PrismaUser } from "@prisma/client"
import { Client, ClientProps } from "../../../domain/clients/enterprise/entities/Client"

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): ClientProps {
    return Client.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      password: raw.password,
      phoneNumber: raw.phoneNumber,
      role: raw.role,
      dateOfBirth: raw.dateOfBirth,
      id: raw.id,
    })
  }
  static toPrisma(user: ClientProps): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id?.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      password: user.password,
      role: user.role,
      dateOfBirth: user.dateOfBirth
    }
  }
}