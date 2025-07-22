import { Schedules } from "../../generated/prisma";
import prisma from "../prisma";
import IScheduleRepository from "../repository/schedules.repository";

export default class PrismaScheduleRepository implements IScheduleRepository {
    create({ start, end, barberId, serviceId, userId }: { start: Date, end: Date, barberId: string, serviceId: string, userId: string }): Promise<Schedules> {
        const schedule = prisma.schedules.create({
            data: {
                startTime: start,
                endTime: end,
                barberId: barberId,
                serviceId: serviceId,
                isActive: true,
                userId: userId
            }
        })
        return schedule;
    }

    list_schedules_to_user(userId: string, isActive?: boolean): Promise<Schedules[]> {
        const schedules = prisma.schedules.findMany({
            where: {
                userId: userId,
                isActive: isActive
            },
            include: {
                barber: true,
                service: true
            }
        });
        return schedules;
    }

    list_schedules_to_barber(barberId: string, isActive?: boolean): Promise<Schedules[]> {
        const schedules = prisma.schedules.findMany({
            where: {
                barberId: barberId,
                isActive: isActive
            },
            include: {
                service: true,
                User: true
            }
        });
        return schedules;
    }

    invalidate_schedule(scheduleId: string): Promise<Schedules | null> {
        const schedule = prisma.schedules.update({
            where: { id: scheduleId },
            data: { isCanceled: true }
        });
        return schedule;
    }

    get_schedule_by_id(scheduleId: string): Promise<Schedules | null> {
        const schedule = prisma.schedules.findUnique({
            where: { id: scheduleId },
            include: {
                barber: true,
                service: true,
                User: true
            }
        });
        return schedule;
    }
}