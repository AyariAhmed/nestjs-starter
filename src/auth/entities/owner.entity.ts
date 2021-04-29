import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Address } from "./address.entity";
import { UserRole } from "./roles.enum";


@Entity()
export class Owner extends BaseEntity {
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

  @Column()
  restaurant_name : string;
  //TODO : Must be changed to a relation with an entity

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OWNER,
  })
  role: UserRole;

  @OneToOne(() => Address, (address) => address.owner,{eager : true})
  @JoinColumn()
  address: Address;

  @Column()
  addressId : number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    restaurant_name : string,
    password: string,
    phone: string,
    address: Address,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.restaurant_name = restaurant_name;
    this.password = password;
    this.phone = phone;
    this.role = UserRole.OWNER;
    this.address = address;
  }
}
