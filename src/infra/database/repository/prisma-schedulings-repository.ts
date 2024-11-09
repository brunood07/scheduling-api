import { ListParams, ListResponse, SchedulingRepository, UpdateDate } from "../../../domain/schedulings/application/repository/scheduling-repository";
import { Scheduling, SchedulingProps } from "../../../domain/schedulings/enterprise/entities/Scheduling";
import { PrismaSchedulingMapper } from "../mappers/prisma-scheduling-mapper";
import { prisma } from "../prisma";

export class PrismaSchedulingsRepository implements SchedulingRepository {
  async create(data: Scheduling): Promise<void> {
    await prisma.scheduling.create({
      data: {
        id: data.id,
        clientId: data.clientId,
        attendantId: data.attendantId,
        description: data.description,
        rescheduled: data.rescheduled,
        schedulingEnd: data.schedulingEnd,
        schedulingStart: data.schedulingStart,
        serviceId: data.serviceId,
      }
    })
  }

  async findByAttendantId(attendantId: string): Promise<SchedulingProps[]> {
    const schedulings = await prisma.scheduling.findMany({
      where: {
        attendantId
      }
    })
    return schedulings.map(PrismaSchedulingMapper.toDomain)
  }

  async findByClientId(clientId: string): Promise<SchedulingProps[]> {
    const schedulings = await prisma.scheduling.findMany({
      where: {
        clientId
      }
    })
    return schedulings.map(PrismaSchedulingMapper.toDomain)
  }

  async findById(id: string): Promise<SchedulingProps | null> {
    const scheduling = await prisma.scheduling.findUnique({
      where: {
        id
      }
    })
    if (!scheduling) return null
    return PrismaSchedulingMapper.toDomain(scheduling);
  }

  async delete(id: string): Promise<void> {
    await prisma.scheduling.delete({
      where: {
        id
      }
    })
  }

  async list(params: ListParams): Promise<ListResponse> {
    const { page = 1, limit = 10, attendantId, clientId, schedulingEnd, schedulingStart, serviceId } = params
    const skip = (page - 1) * limit

    const where: any = {}
    if (attendantId) where.attendantId = attendantId
    if (clientId) where.clientId = clientId
    if (serviceId) where.serviceId = serviceId
    if (schedulingStart && schedulingEnd) {
      where.schedulingStart = {
        gte: schedulingStart
      }
      where.schedulingEnd = {
        lte: schedulingEnd
      }
    }

    const [total, schedulings] = await prisma.$transaction([
      prisma.scheduling.count({ where }),
      prisma.scheduling.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      })
    ]);

    return {
      list: schedulings.map(PrismaSchedulingMapper.toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }

  async update(id: string, data: UpdateDate): Promise<SchedulingProps> {
    const scheduling = await prisma.scheduling.update({
      where: {
        id
      },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
    return scheduling
  }
}