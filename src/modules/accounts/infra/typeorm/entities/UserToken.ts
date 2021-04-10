import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '@modules/accounts/infra/typeorm/entities/User';

@Entity('user_tokens')
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'refresh_token' })
    refreshToken: string;

    @ManyToOne(() => User)
    @JoinColumn({  name: 'user_id' })
    user: User;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'expires_date' })
    expiresDate: Date;

    @Column({ name: 'created_at' })
    createdAt: Date;
}

export default UserToken;
