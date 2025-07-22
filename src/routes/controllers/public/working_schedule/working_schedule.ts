import { FastifyInstance } from "fastify";
import PublicListWorkingSchedule from "../../../../application/services/working_schedule/PublicWorkingSchedule";
import PrismaWorkingScheduleRepository from "../../../../database/model/workingschedule.model";

export default async function WorkingScheduleRoute(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const workingSchedules = await PublicListWorkingSchedule({
      working_schedule_repository: new PrismaWorkingScheduleRepository(),
    });
    return reply.send(workingSchedules);
  });
}
