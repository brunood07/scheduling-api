import { Scheduling, SchedulingProps } from '../../enterprise/entities/Scheduling';

export abstract class SchedulingRepository {
  abstract create(data: Scheduling): Promise<void>;
  abstract findByAttendantId(attendantId: string): Promise<Scheduling[]>;
  abstract findByClientId(clientId: string): Promise<Scheduling[]>;
  abstract findById(id: string): Promise<Scheduling | null>;
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
  selectedService?: number;
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