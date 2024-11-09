import { randomUUID } from "node:crypto";

export interface ServiceProps {
  id?: string;
  name: string;
  description: string;
  price: number;
  durationInMinutes: number;
}

export class Service {
  private props: ServiceProps;

  private constructor(props: ServiceProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }

  get durationInMinutes() {
    return this.props.durationInMinutes;
  }

  static create(props: ServiceProps): Service {
    return new Service({
      ...props,
      id: props.id ? props.id : randomUUID(),
    });
  }

  toJSON() {
    // Return properties directly as a plain object
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      durationInMinutes: this.durationInMinutes,
    };
  }
}
