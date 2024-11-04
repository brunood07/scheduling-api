import { UseCaseError } from "./use-case-error";

export class PhoneAlreadyRegisteredError extends Error implements UseCaseError {
  constructor() {
    super('Phone number already registered')
  }
}