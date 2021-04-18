import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('cars_image')
class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'car_id' })
  carId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}

export default CarImage;
