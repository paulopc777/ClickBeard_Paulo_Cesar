import { WorkingSchedule } from "../../generated/prisma";
import prisma from "../prisma";
import IWorkingScheduleRepository from "../repository/workingschedule.repository";

class PrismaWorkingScheduleRepository implements IWorkingScheduleRepository {
  constructor() {}

  async findAll(): Promise<WorkingSchedule[]> {
    return await prisma.workingSchedule.findMany();
  }
  async findById(id: string): Promise<WorkingSchedule | null> {
    return await prisma.workingSchedule.findUnique({
      where: { id },
    });
  }

  async create(data: any): Promise<WorkingSchedule> {
    return await prisma.workingSchedule.create({ data });
  }
  delete(id: string): Promise<boolean> {
    return prisma.workingSchedule
      .delete({
        where: { id },
      })
      .then(() => true)
      .catch(() => false);
  }
  async update(id: string, data: any): Promise<WorkingSchedule | null> {
    return await prisma.workingSchedule.update({
      where: { id },
      data,
    });
  }
}

export default PrismaWorkingScheduleRepository;
