import IServiceRepository from "../../../database/repository/service.repository";

interface PublicListServicesData {
  service_repository: IServiceRepository;
}

interface PublicListServicesDto {
  id: string;
  name: string;
  price: number;
  BarberService: {
    barber: {
      id: string;
      name: string;
    };
  }[];
}

export default async function PublicListServices({
  service_repository,
}: PublicListServicesData) {
  const services = await service_repository.getServiceWithBarbers();
  const formattedServices: PublicListServicesDto[] = services.map(
    (service) => ({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.image,
      BarberService: service.BarberService.map((barberService) => ({
        barber: {
          id: barberService.barber.id,
            name: barberService.barber.name,
            avatar: barberService.barber.avatar,
        },
      })),
    })
  );
  return formattedServices;
}
