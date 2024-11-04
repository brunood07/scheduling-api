import { randomUUID } from "node:crypto";

export interface ClientProps {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  dateOfBirth: Date;
  password: string;
}

export class Client {
  private props: ClientProps;

  private constructor(props: ClientProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get phoneNumber() {
    return this.props.phoneNumber;
  }

  get role() {
    return this.props.role;
  }

  get dateOfBirth() {
    return this.props.dateOfBirth;
  }

  get password() {
    return this.props.password;
  }

  static create(props: ClientProps): Client {
    return new Client({
      ...props,
      id: props.id ? props.id : randomUUID(),
    });
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      role: this.role,
      dateOfBirth: this.dateOfBirth,
      password: this.password,
    };
  }
}
