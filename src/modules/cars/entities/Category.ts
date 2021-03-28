import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as v4uuid } from 'uuid';

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

    constructor() {
        this.id = v4uuid();
    }

}

export default Category;
