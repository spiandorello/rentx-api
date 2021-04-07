import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rentals')
class Rental {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'car_id' })
    carId: string;

    @Column({ name: 'start_at' })
    startAt: Date;

    @Column({ name: 'finish_at' })
    finishAt: Date;

    @Column({ name: 'expect_return_date' })
    expectReturnDate: Date;

    @Column()
    total: number;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'updated_at' })
    updateAt: Date;
}

export default Rental;
