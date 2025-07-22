import IWorkingScheduleRepository from "../../../database/repository/workingschedule.repository";

interface PublicListWorkingScheduleDto {
  day: any;
  day_number: number;
  startTime: string;
  endTime: string;
  lunchStart?: string | null;
  lunchEnd?: string | null;
}

export default async function PublicListWorkingSchedule({
  working_schedule_repository,
}: {
  working_schedule_repository: IWorkingScheduleRepository;
}): Promise<PublicListWorkingScheduleDto[]> {


  const workingSchedules = await working_schedule_repository.findAll();
  return workingSchedules.map((schedule) => ({
    day: schedule.dayOfWeek,
    day_number: schedule.dayOfWeek_number,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    lunchStart: schedule.lunchStart,
    lunchEnd: schedule.lunchEnd,
  }));

}
