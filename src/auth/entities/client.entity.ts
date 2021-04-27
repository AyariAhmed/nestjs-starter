import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { JoinColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  OWNER = 'owner',
}

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable:false, unique : true})
  email: string;

  @Column('boolean', { default: false })
  validated_email: boolean;

  @Column()
  password: string;

  @Column('varchar', { length: 8 ,unique: true,nullable : false})
  phone: string;

  @Column({ type: 'date' })
  birthdate: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @OneToOne(() => Address, (address) => address.client)
  @JoinColumn()
  address: Address;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    birthdate: string,
    role: UserRole,
    address: Address,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.birthdate = birthdate;
    this.role = role;
    this.address = address;
  }
}
