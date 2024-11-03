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

  get attendantId() {
    return this.props.attendantId;
  }

  get clientId() {
    return this.props.clientId;
  }

  get selectedService() {
    return this.props.selectedService;
  }

  get scheduledStart() {
    return this.props.schedulingStart;
  }

  get scheduledEnd() {
    return this.props.schedulingEnd;
  }

  get description() {
    return this.props.description;
  }

  get rescheduled() {
    return this.props.rescheduled;
  }

  static create(props: SchedulingProps): SchedulingProps {
    const scheduling = new Scheduling({
      ...props,
      id: randomUUID(),
    });
    return scheduling.toObject();
  }

  toObject(): SchedulingProps {
    return { ...this.props };
  }
}
