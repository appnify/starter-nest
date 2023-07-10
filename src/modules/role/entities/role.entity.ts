import { User } from 'src/modules/user';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.roles)
  user: User;
}
