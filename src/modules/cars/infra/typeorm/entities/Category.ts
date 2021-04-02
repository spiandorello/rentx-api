import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ name: 'created_at' })
    createdAt: Date
}

export default Category;
