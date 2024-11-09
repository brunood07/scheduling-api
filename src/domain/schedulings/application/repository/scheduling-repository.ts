import { Scheduling, SchedulingProps } from '../../enterprise/entities/Scheduling';

export abstract class SchedulingRepository {
  abstract create(data: Scheduling): Promise<void>;
  abstract findByAttendantId(attendantId: string): Promise<SchedulingProps[]>;
  abstract findByClientId(clientId: string): Promise<SchedulingProps[]>;
  abstract findById(id: string): Promise<SchedulingProps | null>;
  abstract delete(id: string): Promise<void>;
  abstract list(params: ListParams): Promise<ListResponse>;
  abstract update(id: string, data: UpdateDate): Promise<SchedulingProps>;
}

export interface ListParams {
  page: number;
  limit: number;
  clientId?: string;
  attendantId?: string;
  schedulingStart?: Date;
  schedulingEnd?: Date;
  serviceId?: string;
}

export interface ListResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  list: SchedulingProps[];
}

export interface UpdateDate {
  schedulingStart?: Date;
  schedulingEnd?: Date;
  descriptions?: string;
  attendantId?: string;
  selectedService?: number;
}