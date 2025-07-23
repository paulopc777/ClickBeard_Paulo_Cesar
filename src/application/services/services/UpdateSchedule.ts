import IScheduleRepository from "../../../database/repository/schedules.repository";
import { Schedules } from "../../../generated/prisma";

export default async function UpdateSchedule({
    schedule_repository,
    scheduleId,
    data
}: {
    schedule_repository: IScheduleRepository;
    scheduleId: string;
    data: Partial<Schedules>;
}): Promise<Schedules | null> {
    if (!scheduleId || !data) {
        throw new Error("Invalid input data");
    }


    const updatedSchedule = await schedule_repository.update(scheduleId, data);

    return updatedSchedule;

}