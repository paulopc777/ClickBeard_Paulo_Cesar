import { FastifyInstance } from "fastify";
import PrismaServiceRepository from "../../../../../database/model/service.model";
import { CreateNewServiceValidatorBody, UpdateServiceValidatorBody } from "../../../../../application/dto/service.admin.dto";
import { Static } from "@fastify/type-provider-typebox";
import CreateNewService from "../../../../../application/services/services/CreateNewService";
import UpdateService from "../../../../../application/services/services/UpdateService";

export default async function AdminServiceRoute(app: FastifyInstance) {

    app.get("/", async (req, res) => {
        const services = await new PrismaServiceRepository().getServiceWithBarbers();
        res.send({ services });
    })

    app.post("/", {
        schema: {
            body: CreateNewServiceValidatorBody
        }
    }, async (req, res) => {
        const { name, price, image, barbers } = req.body as Static<typeof CreateNewServiceValidatorBody>;

        const service = await CreateNewService({
            service_repository: new PrismaServiceRepository(),
            name,
            price,
            image,
            barbers
        });

        res.send({ service });
    })

    app.put("/:id", {
        schema: {
            body: UpdateServiceValidatorBody
            , params: { type: "object", properties: { id: { type: "string", minLength: 1 } }, required: ["id"] }
        }
    }, async (req, res) => {
        const { id } = req.params as { id: string };
        const { name, price, image,barbers } = req.body as Static<typeof UpdateServiceValidatorBody>;

        const service = await UpdateService({
            service_repository: new PrismaServiceRepository(),
            id,
            name,
            price,
            image,
            barbers
        });

        res.send({ service });
    })

    app.delete("/:id", async (req, res) => {
        const { id } = req.params as { id: string };

        const serviceRepository = new PrismaServiceRepository();
        const existingService = await serviceRepository.findById(id);
        if (!existingService) {
            return res.status(404).send({ error: "Service not found" });
        }

        try {
            await serviceRepository.delete(id);
            res.send({ message: "Service deleted successfully" });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ 
                    error: error.message 
                });
            }
            return res.status(500).send({ 
                error: "An unexpected error occurred while deleting the service" 
            });
        }
    })

}