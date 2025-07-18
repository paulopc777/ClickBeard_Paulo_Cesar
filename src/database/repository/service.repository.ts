import { Service } from "../../generated/prisma";

export default interface IServiceRepository {
    findAll(): Promise<Service[]>;
    findById(id: string): Promise<Service | null>;
    create(data: any): Promise<Service>;
    update(id: string, data: any): Promise<Service | null>;
    delete(id: string): Promise<boolean>;
}