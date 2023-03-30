import { Users } from '../users/users.entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurants {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'restaurant_id',
  })
  id: number;

  @Column({
    name: 'name',
    nullable: false,
    default: '',
  })
  firstName: string;

  @Column({
    name: 'address',
    nullable: false,
    default: '',
  })
  lastName: string;

  @Column({
    name: 'lat',
    nullable: false,
    default: '',
  })
  lat: string;

  @Column({
    name: 'long',
    nullable: false,
    default: '',
  })
  long: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    name: 'photo',
    nullable: false,
    default: '',
  })
  photo: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    name: 'created_on',
    nullable: false,
    default: new Date(),
  })
  createdOn: Date;

  @Column({
    name: 'is_verified',
    nullable: false,
    default: false,
  })
  isVerified: Boolean;

  @Column({
    name: 'is_deleted',
    nullable: false,
    default: false,
  })
  isDeleted: Boolean;

  @ManyToOne((type) => Users, (user) => user.restaurants)
  user: Users;
}
