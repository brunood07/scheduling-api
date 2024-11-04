import { PhoneAlreadyRegisteredError } from "../../../../core/errors/phone-already-registered-error";
import { Client, ClientProps } from "../../enterprise/entities/Client";
import { ClientRoles } from "../../enterprise/enums/ClientRoles";
import { HasherGenerator } from "../cryptograph/hash-generator";
import { UsersRepository } from "../repository/users-repository";

export interface CreateClientUseCaseRequestDTO {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
}

interface CreateClientUseCaseResponseDTO {
  client: ClientProps
}

export class CreateClientUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HasherGenerator
  ) { }

  execute = async (data: CreateClientUseCaseRequestDTO): Promise<CreateClientUseCaseResponseDTO> => {
    const { dateOfBirth, firstName, lastName, password, phoneNumber } = data;
    const clientExists = await this.usersRepository.findByPhoneNumber(phoneNumber);

    if (clientExists) throw new PhoneAlreadyRegisteredError();

    const hashedPassword = await this.hashGenerator.hash(password);

    const client = Client.create({
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      password: hashedPassword,
      phoneNumber,
      role: ClientRoles.CLIENT
    }).toJSON();

    await this.usersRepository.create(client);

    return { client };
  }
}