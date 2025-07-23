import { Service } from "../../generated/prisma";
import prisma from "../prisma";
import IServiceRepository from "../repository/service.repository";

export default class PrismaServiceRepository implements IServiceRepository {
  constructor() { }

  async findAll(): Promise<Service[]> {
    return await prisma.service.findMany();
  }

  async findById(id: string): Promise<Service | null> {
    return await prisma.service.findUnique({
      where: { id },
    });
  }

  async getServiceWithBarbers() {
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

  async create(data: { name: string, price: number, image?: string }): Promise<Service> {
    return await prisma.service.create({
      data: {
        name: data.name,
        image: data.image,
        price: data.price,
      }
    });
  }

  async update(id: string, data: { name?: string, price?: number, image?: string, barbers?: string[] }): Promise<Service | null> {
    if (data.barbers) {
      await prisma.barberServices.deleteMany({
        where: { serviceId: id },
      });

      if (data.barbers.length > 0) {
        await prisma.barberServices.createMany({
          data: data.barbers.map(barberId => ({
            serviceId: id,
            barberId,
          })),
        });
      }
    }

    return await prisma.service.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        image: data.image,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    const activeSchedules = await prisma.schedules.findFirst({
      where: {
        serviceId: id,
        isActive: true,
        isCanceled: false
      },
    });

    if (activeSchedules) {
      throw new Error("Cannot delete service: There are active schedules using this service");
    }

    await prisma.barberServices.deleteMany({
      where: { serviceId: id },
    });
    await prisma.schedules.deleteMany({
      where: { serviceId: id },
    });

    const result = await prisma.service.delete({
      where: { id },
    });
    return !!result;
  }

  findByName(name: string): Promise<Service | null> {
    return prisma.service.findFirst({
      where: { name },
    });
  }
  async addBarbers(serviceId: string, barberIds: string[]): Promise<void> {
    await prisma.barberServices.createMany({
      data: barberIds.map(barberId => ({
        serviceId,
        barberId,
      })),
    });
  }
}
