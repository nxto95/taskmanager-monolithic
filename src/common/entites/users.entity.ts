import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../types';
import { Task } from './tasks.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @Index('email already exist', { unique: true })
  email: string;
  @Column()
  @Index('username already exist', { unique: true })
  username: string;
  @Column({ select: false })
  password: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
