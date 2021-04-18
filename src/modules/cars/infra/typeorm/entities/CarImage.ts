import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Car from '@modules/cars/infra/typeorm/entities/Car';

@Entity('cars_image')
class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @OneToMany()
  // car: Car;

  @Column({ name: 'car_id' })
  carId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}

export default CarImage;
