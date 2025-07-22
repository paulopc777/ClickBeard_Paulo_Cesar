import { FastifyInstance } from "fastify";
import AuthClient from "./public/auth/auth.client";
import ClientRegister from "./public/register/client.register";
import CompanyAuth from "./public/auth/auth.company";
import ClientRoutes from "./private/client/ClientRoutes";
import Services from "./public/services/services";
import { PublicScheduleRoute } from "./public/schedule/schedule.route";
import WorkingScheduleRoute from "./public/working_schedule/working_schedule";
import CompanyRoutes from "./private/company/CompanyRoutes";
import AdminRoutes from "./private/admin/AdminRoutes";

export default function Routes(app: FastifyInstance) {
  // Public
  app.register(AuthClient, {
    prefix: "/login",
  });

  app.register(ClientRegister, {
    prefix: "/register",
  });

  app.register(CompanyAuth, {
    prefix: "/company",
  });

  app.register(Services, {
    prefix: "/services",
  });

  app.register(PublicScheduleRoute, {
    prefix: "/schedule",
  });
  app.register(WorkingScheduleRoute, {
    prefix: "/working-schedule",
  });
  // Private
  app.register(ClientRoutes, {
    prefix: "/client",
  });
  // Admin pages
  app.register(AdminRoutes, {
    prefix: "/admin",
  });
  // Company
  app.register(CompanyRoutes, {
    prefix: "/company",
  })

}
