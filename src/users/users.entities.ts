/**
 * @author Talha Hasan
 */
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    name: 'first_name',
    nullable: false,
    default: '',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    nullable: false,
    default: '',
  })
  lastName: string;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    name: 'photo',
    nullable: true,
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

  /**
   * Hooks
   */
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with ID: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with ID: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with ID ', this.id);
  }
}
