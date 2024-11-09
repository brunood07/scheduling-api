import { Prisma, Service as PrismaService } from "@prisma/client";
import { Service, ServiceProps } from "../../../domain/services/enterprise/entities/Services";

export class PrismaServiceMapper {
  static toDomain(raw: PrismaService): ServiceProps {
    return Service.create({
      id: raw.id,
      description: raw.description,
      durationInMinutes: raw.durationInMinutes,
      name: raw.name,
      price: raw.price,
    })
  }
  static toPrisma(service: ServiceProps): Prisma.ServiceUncheckedCreateInput {
    return {
      description: service.description,
      durationInMinutes: service.durationInMinutes,
      name: service.name,
      price: service.price,
      id: service.id,
    }
  }
}