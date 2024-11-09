import { Prisma, Scheduling as PrismaScheduling } from "@prisma/client";
import { Scheduling, SchedulingProps } from "../../../domain/schedulings/enterprise/entities/Scheduling";

export class PrismaSchedulingMapper {
  static toDomain(raw: PrismaScheduling): SchedulingProps {
    return Scheduling.create({
      id: raw.id,
      attendantId: raw.attendantId,
      clientId: raw.clientId,
      description: raw.description,
      rescheduled: raw.rescheduled,
      schedulingEnd: raw.schedulingEnd,
      schedulingStart: raw.schedulingStart,
      serviceId: raw.serviceId
    })
  }
  static toPrisma(service: SchedulingProps): Prisma.SchedulingUncheckedCreateInput {
    return {
      attendantId: service.attendantId,
      clientId: service.clientId,
      description: service.description,
      rescheduled: service.rescheduled,
      schedulingEnd: service.schedulingEnd,
      schedulingStart: service.schedulingStart,
      serviceId: service.serviceId,
      id: service.id
    }
  }
}