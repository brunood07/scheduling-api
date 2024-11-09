import { UseCaseError } from './use-case-error';

export class SchedulingNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Scheduling not found');
  }
}