import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ name: 'driver_license' })
    driverLicense: string;

    @Column({ name: 'is_admin' })
    isAdmin: boolean;

    @Column({ name: 'created_at' })
    createdAt: Date;
}

export default User;
