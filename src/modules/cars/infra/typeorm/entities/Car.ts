import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

import Category from '@modules/cars/infra/typeorm/entities/Category';

@Entity('cars')
class Car {
    @PrimaryGeneratedColumn("uuid")
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
    isAvailable: boolean = true;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id'})
    category: Category;

    @Column({ name: 'category_id' })
    categoryId: string;

    @Column({ name: 'created_at' })
    createdAt: Date
}

export default Car;
