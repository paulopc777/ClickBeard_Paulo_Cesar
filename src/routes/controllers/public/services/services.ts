import { FastifyInstance } from "fastify";
import PrismaServiceRepository from "../../../../database/model/service.model";
import PublicListServices from "../../../../application/services/services/PublicListServices";

export default async function Services(app: FastifyInstance) {
  app.get(
    "/",
    async (request, reply) => {
      const service_repository = new PrismaServiceRepository();
      const services = await PublicListServices({ service_repository });

      return reply.send({ services });
    }
  );
}
