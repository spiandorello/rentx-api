import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specifications')
class Specification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ name: 'created_at' })
    createdAt: Date;
}

export default Specification;
