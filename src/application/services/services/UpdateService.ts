import IServiceRepository from "../../../database/repository/service.repository";

interface UpdateServiceInput {
    service_repository: IServiceRepository;
    id: string;
    name?: string;
    price?: number;
    image?: string;
    barbers?: string[];
}

export default async function UpdateService({ service_repository, id, name, price, image, barbers }: UpdateServiceInput) {

    if (price && price <= 0) {
        throw new Error("Price must be greater than zero");
    }
    if (name) {
        const existingService = await service_repository.findByName(name);
        if (existingService && existingService.id !== id) {
            throw new Error("Service with this name already exists");
        }
    }

    const updateData: { name?: string, price?: number, image?: string, barbers?: string[] } = {};

    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (image !== undefined) updateData.image = image;
    if (barbers !== undefined && barbers.length > 0) {
        updateData.barbers = barbers;
    }

    const updatedService = await service_repository.update(id, updateData);
    return updatedService;
}