import { Service } from "../../generated/prisma";

export default interface IServiceRepository {
  findAll(): Promise<Service[]>;
  findById(id: string): Promise<Service | null>;
  getServiceWithBarbers(): Promise<
    ({
      BarberService: ({
        barber: {
          name: string;
          id: string;
          createdAt: Date;
          updatedAt: Date;
          admin: boolean;
          avatar: string | null;
          age: number;
          email: string;
          password: string;
          contact_date: Date | null;
        };
      } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        barberId: string;
        serviceId: string;
      })[];
    } & {
      name: string;
      id: string;
      image: string | null;
      price: number;
      createdAt: Date;
      updatedAt: Date;
    })[]
  >;
  create(data: any): Promise<Service>;
  update(id: string, data: any): Promise<Service | null>;
  delete(id: string): Promise<boolean>;
}
