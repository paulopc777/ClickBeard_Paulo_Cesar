import { Schedules } from "../../generated/prisma";

export default interface IScheduleRepository {
    create({ start, end, barberId, serviceId, userId }: { start: Date, end: Date, barberId: string, serviceId: string, userId: string }): Promise<Schedules>;
    list_schedules_to_user(userId: string): Promise<Schedules[]>;
    list_schedules_to_barber(barberId: string): Promise<Schedules[]>;
    invalidate_schedule(scheduleId: string): Promise<Schedules | null>;
}