import IScheduleRepository from '../../../database/repository/schedules.repository';
export default async function CancelSchedule({
    Schedules_repository,
    user,
    scheduleId
}: {
    Schedules_repository: IScheduleRepository;
    user: { id: string };
    scheduleId: string;
}) {

    const schedule = await Schedules_repository.get_schedule_by_id(scheduleId);

    if (!schedule) {
        return {
            success: false,
            message: 'Schedule not found'
        };
    }

    if (schedule.userId !== user.id) {
        return {
            success: false,
            message: 'Forbidden'
        };
    }

    const twoHoursBefore = new Date(schedule.startTime.getTime() - 2 * 60 * 60 * 1000);
    if (new Date() > twoHoursBefore) {
        return {
            success: false,
            message: 'Cancellation period has expired'
        };
    }

    await Schedules_repository.invalidate_schedule(scheduleId);

    return {
        success: true,
        message: 'Schedule cancelled successfully'
    };

}