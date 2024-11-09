import { ServicesRepository } from "../repository/services-repository";

export class DeleteServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) { }

  execute = async (id: string): Promise<void> => {
    await this.servicesRepository.delete(id);
  }
}