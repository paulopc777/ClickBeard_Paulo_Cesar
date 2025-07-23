import AdminListSchedules from '../../../../../application/services/schedule/AdminListShedule';
import UpdateSchedule from '../../../../../application/services/services/UpdateSchedule';
import PrismaScheduleRepository from '../../../../../database/model/schedules.model';
import { FastifyInstance } from "fastify";

export default async function AdminSchedulesRoute(app: FastifyInstance) {
    app.get("/", async (req, res) => {

        const { start, end } = req.query as { start?: string, end?: string };

        const schedules = await AdminListSchedules({
            Schedules_repository: new PrismaScheduleRepository(),
            start,
            end
        })
        res.send({ schedules });
    })

    app.put("/:id", async (req, res) => {
        const { id } = req.params as { id: string };
        const { barberId, isActive, isCanceled, isCompleted } = req.body as {
            barberId?: string;
            isActive?: boolean;
            isCanceled?: boolean;
            isCompleted?: boolean;
        };


        const update = UpdateSchedule({
            schedule_repository: new PrismaScheduleRepository(),
            scheduleId: id,
            data: {
                barberId,
                isActive,
                isCanceled,
                isCompleted
            }
        });
        if (!update) {
            return res.status(404).send({ error: "Schedule not found" });
        }
        res.send({ message: "Schedule updated successfully" });
    })
}
