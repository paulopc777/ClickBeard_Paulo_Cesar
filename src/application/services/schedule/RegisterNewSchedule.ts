import IScheduleRepository from '../../../database/repository/schedules.repository';
import ClientJWT from '../../../types/client.jwt';

interface RegisterNewScheduleInput {
    Schedules_repository: IScheduleRepository;
    barber: string;
    user: ClientJWT;
    start: Date;
    service_id: string; // Optional, if serviceId is needed in the future
}

interface RegisterNewScheduleResponse {
    success: boolean;
    message: string;
    user_id?: string;
    schedule?: {
        id: string;
        barber: string;
    };
}

export default async function RegisterNewSchedule({ Schedules_repository, user, service_id, barber, start }: RegisterNewScheduleInput): Promise<RegisterNewScheduleResponse> {

    const end = new Date(start.getTime() + 60 * 30 * 1000); // Assuming a 30-min duration

    console.log({
        start,
        end,
        barberId: barber,
        serviceId: service_id,
        userId: user.id
    })
    const Schedule = await Schedules_repository.create({
        start,
        end,
        barberId: barber,
        serviceId: service_id,
        userId: user.id
    });

    return {
        success: true,
        message: 'Schedule created successfully',
        user_id: user.id,
        schedule: {
            id: Schedule.id,
            barber
        }
    };
}