import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  Admin = 'admin',
  Teacher = 'Teacher',
  Student = 'Student',
}

// mapping classes to tables
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.Student })
  role: Role;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
