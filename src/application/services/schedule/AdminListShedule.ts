import IScheduleRepository from "../../../database/repository/schedules.repository";

export default async function AdminListSchedules({ Schedules_repository, start, end }: { Schedules_repository: IScheduleRepository, start?: string, end?: string }) {

    let start_date = new Date();
    let end_date = new Date();

    if (start) {
        start_date = new Date(start);
    }
    if (end) {
        end_date = new Date(end);
    }
    start_date.setHours(start_date.getHours(), start_date.getMinutes(), 0, 0);
    end_date.setHours(end_date.getHours() + 24, end_date.getMinutes(), 0, 0);

    const schedules = await Schedules_repository.list({ start: start_date, end: end_date });

    return schedules;

}