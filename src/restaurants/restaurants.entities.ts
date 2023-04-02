import { Users } from '../users/users.entities';
import {
  Column,
  Entity,
  Geometry,
  ManyToOne,
  PrimaryGeneratedColumn,
  Point,
} from 'typeorm';

// import { Point } from 'geojson';

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
  name: string;

  @Column({
    name: 'location',
    nullable: true,
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Geometry;

  @Column({
    name: 'photo',
    nullable: true,
    default: '',
  })
  photo: string;

  @Column({
    name: 'created_on',
    nullable: false,
    default: new Date(),
  })
  createdOn: Date;

  @Column({
    name: 'is_deleted',
    nullable: false,
    default: false,
  })
  isDeleted: Boolean;

  @ManyToOne((type) => Users, (user) => user.restaurants)
  user: Users;
  restaurant: Promise<Users>;
}
