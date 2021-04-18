import Specification from '@modules/cars/infra/typeorm/entities/Specification';

export default interface ICreateCarDto {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  specifications?: Specification[];
  id?: string;
}
