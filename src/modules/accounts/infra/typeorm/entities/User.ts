import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

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

  @Column()
  avatar: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (process.env.STORAGE) {
      case 'disk':
        return `${process.env.BASE_URL}/avatar/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return '';
    }
  }
}

export default User;
