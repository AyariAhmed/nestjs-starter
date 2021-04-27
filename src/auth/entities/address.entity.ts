import {
  BaseEntity,
  Column,
  Entity, OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";


@Entity()
export class Address extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  governorate : string;

  @Column()
  municipality : string;

  @Column()
  street : string;

  @Column()
  location : string;

  @OneToOne(() => Client,client => client.address)
  client : Client;


  constructor(governorate : string,municipality : string,street : string,location : string) {
    super();
    this.governorate=governorate;
    this.municipality=municipality;
    this.street=street;
    this.location=location;
  }

}
