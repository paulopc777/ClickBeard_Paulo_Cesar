import { Schedules } from "../../generated/prisma";

export default interface IScheduleRepository {
    list({ start, end }: { start: Date, end: Date }): Promise<Schedules[]>;
    create({ start, end, barberId, serviceId, userId }: { start: Date, end: Date, barberId: string, serviceId: string, userId: string }): Promise<Schedules>;
    list_schedules_to_user(userId: string, isActive?: boolean): Promise<Schedules[]>;
    get_schedule_by_id(scheduleId: string): Promise<Schedules | null>;
    list_schedules_to_barber(barberId: string, isActive?: boolean): Promise<Schedules[]>;
    invalidate_schedule(scheduleId: string): Promise<Schedules | null>;
    get_schedule_start_time(barber_id: string, start: string): Promise<Schedules | null>;
    update(scheduleId: string, data: Partial<Schedules>): Promise<Schedules | null>;
}