import { Static } from '@fastify/type-provider-typebox';
import { FastifyInstance } from "fastify";
import { BarberRequest, BarberUpdateRequest } from "../../../../../application/dto/barber.admin.dto";
import CreateNewBarber from '../../../../../application/services/barber/CreateNewBarber';
import UpdateBarber from '../../../../../application/services/barber/UpdateBarber';
import PrismaBarberRepository from '../../../../../database/model/barber.model';

export default async function BarberRoute(app: FastifyInstance) {

  app.get("/", async (req, res) => {
    const barbers = await new PrismaBarberRepository().findAll();
    res.send(barbers);
  });

  app.post("/", {
    schema: {
      body: BarberRequest
    }
  }, async (req, res) => {
    const { name, age, contract_date, email, password } = req.body as Static<typeof BarberRequest>;
    const contractDate = new Date(contract_date);
    if (isNaN(contractDate.getTime())) {
      return res.status(400).send({ message: "Invalid contract date" });
    }

    const barber = CreateNewBarber({
      name,
      age,
      contact_date: contractDate,
      email,
      password,
      barber_repository: new PrismaBarberRepository()
    });

    res.send({ message: "Barber created successfully", barber });
  })

  app.delete("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" }
        },
        required: ["id"]
      }
    }
  }, async (req, res) => {
    const { id } = req.params as { id: string };

    const barber = await new PrismaBarberRepository().findById(id);
    if (!barber) {
      return res.status(404).send({ message: "Barber not found" });
    }

    await new PrismaBarberRepository().delete(id);
    res.send({ message: "Barber deleted successfully" });
  })

  app.put("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" }
        },
        required: ["id"]
      },
      body: BarberUpdateRequest
    }
  }, async (req, res) => {
    try {
      const { id } = req.params as { id: string };
      const { name, age, contact_date, email, password, admin, avatar } = req.body as Static<typeof BarberUpdateRequest>;

      // Converter contact_date para Date se fornecido
      let contactDate: Date | undefined;
      if (contact_date) {
        contactDate = new Date(contact_date);
        if (isNaN(contactDate.getTime())) {
          return res.status(400).send({ message: "Invalid contact date" });
        }
      }

      const updatedBarber = await UpdateBarber({
        id,
        name,
        age,
        contact_date: contactDate,
        email,
        password,
        admin,
        avatar,
        barber_repository: new PrismaBarberRepository()
      });

      if (!updatedBarber) {
        return res.status(404).send({ message: "Barber not found" });
      }

      res.send({ message: "Barber updated successfully", barber: updatedBarber });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Barber not found") {
          return res.status(404).send({ message: "Barber not found" });
        }
        if (error.message === "Email already exists") {
          return res.status(400).send({ message: "Email already exists" });
        }
      }
      return res.status(500).send({ message: "Internal server error" });
    }
  })
}