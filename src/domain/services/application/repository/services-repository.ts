import { Service, ServiceProps } from "../../enterprise/entities/Services";

export interface ServicesRepository {
  create(data: Service): Promise<void>;
  update(id: string, data: UpdateService): Promise<ServiceProps>;
  findById(id: string): Promise<ServiceProps>;
  list(params: ListParams): Promise<ListParamsResponse>;
  delete(id: string): Promise<void>;
}

export interface ListParams {
  page: number;
  limit: number;
}

export interface ListParamsResponse {
  page: number;
  total: number;
  limit: number;
  totalPages: number;
  list: ServiceProps[];
}

export interface UpdateService {
  durationInMinutes: number;
  name: string;
  description: string;
  price: number;
}