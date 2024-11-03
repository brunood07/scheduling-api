import { randomUUID } from "node:crypto";
import { ClientRoles } from "../enums/ClientRoles";

export interface UserProps {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: ClientRoles;
  dateOfBirth: Date;
  password: string;
}

export class Client {
  private props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
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

  static create(props: UserProps): UserProps {
    const client = new Client({
      ...props,
      id: randomUUID(),
    });
    return client.toObject();
  }

  toObject(): UserProps {
    return { ...this.props };
  }
}