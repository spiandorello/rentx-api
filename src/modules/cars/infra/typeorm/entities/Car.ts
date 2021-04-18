import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Category from '@modules/cars/infra/typeorm/entities/Category';
import Specification from '@modules/cars/infra/typeorm/entities/Specification';

@Entity('cars')
class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'daily_rate' })
  dailyRate: number;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @Column({ name: 'fine_amount' })
  fineAmount: number;

  @Column({ name: 'brand' })
  brand: string;

  @Column({ name: 'is_available' })
  isAvailable = true;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'x_cars_specifications',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  @Column({ name: 'created_at' })
  createdAt: Date;
}

export default Car;
