import IServiceRepository from "../../../database/repository/service.repository";

interface CreateNewServiceInput {
    service_repository: IServiceRepository;
    name: string;
    price: number;
    image?: string;
    barbers?: string[];
}

export default async function CreateNewService({ service_repository, name, price, image,barbers }: CreateNewServiceInput) {

    if (price <= 0) {
        throw new Error("Price must be greater than zero");
    }
    if (!name || name.trim() === "") {
        throw new Error("Service name cannot be empty");
    }

    const existingService = await service_repository.findById(name);
    if (existingService) {
        throw new Error("Service with this name already exists");
    }

    const service = await service_repository.create({
        name,
        price,
        image
    });

    if (barbers && barbers.length > 0) {
        await service_repository.addBarbers(service.id, barbers);
    }

    return service;
}

