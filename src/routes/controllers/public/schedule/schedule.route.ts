import { FastifyInstance } from "fastify";
import prisma from "../../../../database/prisma";

export default async function ScheduleRoute(app: FastifyInstance) {
  app.get("/:service", async (request, reply) => {
    const { service } = request.params as { service: string };

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    // Last 7 days
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    end.setDate(end.getDate() + 7);

    const schedule = await prisma.schedules.findMany({
      where: {
        serviceId: service,
        startTime: {
          gte: start,
          lte: end,
        },
      },
    });

    return reply.send({ service, schedule });
  });
}
