import { Service } from "../../generated/prisma";
import prisma from "../prisma";
import IServiceRepository from "../repository/service.repository";

export default class PrismaServiceRepository implements IServiceRepository {
  constructor() {}

  async findAll(): Promise<Service[]> {
    return await prisma.service.findMany();
  }

  async findById(id: string): Promise<Service | null> {
    return await prisma.service.findUnique({
      where: { id },
    });
  }

  async getServiceWithBarbers(){
     return await prisma.service.findMany({
      include: {
        BarberService: {
          include: {
            barber: true,
          },
        },
      },
    });
  }

  async create(data: any): Promise<Service> {
    return await prisma.service.create({ data });
  }

  async update(id: string, data: any): Promise<Service | null> {
    return await prisma.service.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.service.delete({
      where: { id },
    });
    return !!result;
  }
}
