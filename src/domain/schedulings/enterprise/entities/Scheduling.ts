import { randomUUID } from "node:crypto";

export interface SchedulingProps {
  id?: string;
  attendantId: string;
  clientId: string;
  selectedService: number;
  schedulingStart: Date;
  schedulingEnd: Date;
  description: string;
  rescheduled: boolean;
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

  get selectedService() {
    return this.props.selectedService;
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

  static create(props: Omit<SchedulingProps, "id">): Scheduling {
    return new Scheduling({
      ...props,
      id: randomUUID(),
    });
  }

  toJSON() {
    // Return properties directly as a plain object
    return {
      id: this.id,
      attendantId: this.attendantId,
      clientId: this.clientId,
      selectedService: this.selectedService,
      schedulingStart: this.schedulingStart,
      schedulingEnd: this.schedulingEnd,
      description: this.description,
      rescheduled: this.rescheduled,
    };
  }
}
