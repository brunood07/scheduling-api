import { ListResponse, ListUsersParams, UpdateUserData, UsersRepository } from "../../../domain/clients/application/repository/users-repository";
import { ClientProps } from "../../../domain/clients/enterprise/entities/Client";
import { prisma } from "../prisma";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: ClientProps): Promise<void> {
    await prisma.user.create({
      data: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        password: data.password,
        role: data.role,
        phoneNumber: data.phoneNumber,
      }
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<ClientProps | null> {
    const client = await prisma.user.findUnique({
      where: {
        phoneNumber
      }
    });

    if (!client) {
      return null;
    }

    return client;
  }

  async findById(id: string): Promise<ClientProps | null> {
    const client = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!client) {
      return null;
    }

    return client;
  }

  async list(params: ListUsersParams): Promise<ListResponse> {
    const { page = 1, limit = 10, role } = params;
    const skip = (page - 1) * limit;

    const [clients, total] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          role: {
            in: role
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({
        where: {
          role: {
            in: role
          }
        },
      })
    ])

    return {
      list: clients,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id
      }
    });
  }

  async update(id: string, data: UpdateUserData): Promise<ClientProps> {
    const updatedClient = await prisma.user.update({
      where: {
        id
      },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });

    return updatedClient;
  }
}