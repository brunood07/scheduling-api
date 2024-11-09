import { randomUUID } from "node:crypto";

export interface SchedulingProps {
  id?: string;
  attendantId: string;
  clientId: string;
  schedulingStart: Date;
  schedulingEnd: Date;
  description: string;
  rescheduled: boolean;
  serviceId: string;
}

export class Scheduling {
  private props: SchedulingProps;

  private constructor(props: SchedulingProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get attendantId() {
    return this.props.attendantId;
  }

  get clientId() {
    return this.props.clientId;
  }

  get schedulingStart() {
    return this.props.schedulingStart;
  }

  get schedulingEnd() {
    return this.props.schedulingEnd;
  }

  get description() {
    return this.props.description;
  }

  get rescheduled() {
    return this.props.rescheduled;
  }

  get serviceId() {
    return this.props.serviceId;
  }

  static create(props: SchedulingProps): Scheduling {
    return new Scheduling({
      ...props,
      id: props.id ? props.id : randomUUID(),
    });
  }

  toJSON() {
    // Return properties directly as a plain object
    return {
      id: this.id,
      attendantId: this.attendantId,
      clientId: this.clientId,
      schedulingStart: this.schedulingStart,
      schedulingEnd: this.schedulingEnd,
      description: this.description,
      rescheduled: this.rescheduled,
      serviceId: this.serviceId
    };
  }
}
