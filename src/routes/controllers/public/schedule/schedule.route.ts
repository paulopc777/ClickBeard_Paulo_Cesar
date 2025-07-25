import { FastifyInstance } from "fastify";
import prisma from "../../../../database/prisma";
import RegisterNewSchedule from "../../../../application/services/schedule/RegisterNewSchedule";
import '@fastify/jwt'
import ClientJWT from "../../../../types/client.jwt";
import PrismaScheduleRepository from "../../../../database/model/schedules.model";
import { RegisterNewScheduleValidatorBody, RegisterNewScheduleValidatorParams } from "../../../../application/dto/RegisterNewScheduleValidator";
import { Static } from "@fastify/type-provider-typebox";
import ClientListSchedules from "../../../../application/services/schedule/ClientListSchedules";
import CancelSchedule from "../../../../application/services/schedule/CancelSchedule";

async function PublicScheduleRoute(app: FastifyInstance) {
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

async function ClientScheduleRoute(app: FastifyInstance) {
  app.post("/:service", {
    schema: {
      body: RegisterNewScheduleValidatorBody,
      params: RegisterNewScheduleValidatorParams
    }
  }, async (request, reply) => {
    const { service } = request.params as Static<typeof RegisterNewScheduleValidatorParams>;
    const { barber_id, start } = request.body as Static<typeof RegisterNewScheduleValidatorBody>;

    const user = request.user as ClientJWT;
    console.log(user)
    if (!user || !user.id) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const schedule = await RegisterNewSchedule({
      Schedules_repository: new PrismaScheduleRepository(),
      barber: barber_id,
      service_id: service,
      user: user,
      start: new Date(start)
    })
    reply.send(schedule);
  });

  app.get("/", async (request, reply) => {
    const user = request.user as ClientJWT;
    const { isActive } = request.query as { isActive?: boolean };
    if (!user || !user.id) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const schedules = await ClientListSchedules({
      Schedules_repository: new PrismaScheduleRepository(),
      user,
      isActive
    });

    return reply.send(schedules);
  });

  app.delete("/cancel/:id", async (request, reply) => {
    const user = request.user as ClientJWT;
    const { id } = request.params as { id: string };

    if (!user || !user.id) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const schedule = CancelSchedule({
      Schedules_repository: new PrismaScheduleRepository(),
      user,
      scheduleId: id
    });


    if (!schedule) {
      return reply.status(404).send({ message: "Schedule not found" });
    }

    return reply.send({ message: "Schedule cancelled successfully" });
  })

}

export {
  PublicScheduleRoute,
  ClientScheduleRoute
}