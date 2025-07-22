import { WorkingSchedule } from "../../generated/prisma";

export default interface IWorkingScheduleRepository {
  findAll(): Promise<WorkingSchedule[]>;
  findById(id: string): Promise<WorkingSchedule | null>;
  create(data: any): Promise<WorkingSchedule>;
  update(id: string, data: any): Promise<WorkingSchedule | null>;
  delete(id: string): Promise<boolean>;
}
