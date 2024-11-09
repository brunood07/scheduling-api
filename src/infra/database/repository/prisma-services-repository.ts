import { ListParams, ListParamsResponse, ServicesRepository, UpdateService } from "../../../domain/services/application/repository/services-repository";
import { Service, ServiceProps } from "../../../domain/services/enterprise/entities/Services";
import { PrismaServiceMapper } from "../mappers/prisma-service-mapper";
import { prisma } from "../prisma";

export class PrismaServicesRepository implements ServicesRepository {
  async create(data: Service): Promise<void> {
    await prisma.service.create({
      data: {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        durationInMinutes: data.durationInMinutes,
      }
    });
  }

  async update(id: string, data: UpdateService): Promise<ServiceProps> {
    const service = await prisma.service.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        durationInMinutes: data.durationInMinutes
      }
    });
    return service;
  }

  async findById(id: string): Promise<ServiceProps | null> {
    const service = await prisma.service.findUnique({
      where: { id }
    });
    if (!service) return null;
    return PrismaServiceMapper.toDomain(service);
  }

  async list(params: ListParams): Promise<ListParamsResponse> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [services, total] = await prisma.$transaction([
      prisma.service.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.service.count()
    ]);

    return {
      list: services,
      limit,
      page,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.service.delete({
      where: { id }
    });
  }

}