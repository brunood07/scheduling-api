import { Scheduling } from '../../enterprise/entities/Scheduling';

export abstract class SchedulingRepository {
  abstract create(data: Scheduling): Promise<void>;
  abstract findByAttendantId(attendantId: string): Promise<Scheduling[]>;
  abstract findByClientId(clientId: string): Promise<Scheduling[]>;
  abstract findById(id: string): Promise<Scheduling | null>;
}