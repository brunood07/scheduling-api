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

  static create(props: ServiceProps): ServiceProps {
    const service = new Service({
      ...props,
      id: randomUUID(),
    });
    return service.toObject();
  }

  toObject(): ServiceProps {
    return { ...this.props };
  }
}
