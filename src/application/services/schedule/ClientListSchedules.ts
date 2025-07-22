import IScheduleRepository from "../../../database/repository/schedules.repository";
import ClientJWT from "../../../types/client.jwt";

export default async function ClientListSchedules({ Schedules_repository, user, isActive }: { Schedules_repository: IScheduleRepository, user: ClientJWT, isActive?: boolean }) {

    const schedules = await Schedules_repository.list_schedules_to_user(user.id, isActive);

    return schedules;

}