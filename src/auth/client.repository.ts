import { EntityRepository, Repository } from "typeorm";
import { Client } from "./entities/client.entity";
import * as bcrypt from "bcrypt";
import { SignupCredentialsDto } from "./dto/signup-credentials.dto";
import { Address } from "./entities/address.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {

  async signup(signupCredentialsDto: SignupCredentialsDto): Promise<Object | void> {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      birthdate,
      role,
      governorate,
      municipality,
      street,
      location
    } = signupCredentialsDto;

    const address: Address = new Address(governorate, municipality, street, location);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: Client = new Client(firstName, lastName, email, hashedPassword, phone, birthdate, role, address);
    try {
      await address.save();
      await user.save();
    } catch (error) {
      if (error.code === "23505")
        throw new ConflictException("Email/Phone number already exists!");
      else throw new InternalServerErrorException();
    }
    delete user.password;
    return user;
  }


  async validateUserPassword(loginCredentialsDto: LoginCredentialsDto): Promise<Object | null> {
    const { email_or_phone, password } = loginCredentialsDto;

    let user: Client | undefined;

    if (this.isEmail(email_or_phone)){
      user = await this.findOne({ email : email_or_phone });
    }else if(this.isPhone(email_or_phone)){
      user = await this.findOne({phone : email_or_phone});
    }else {
      return null;
    }

      if (user && await bcrypt.compare(password, user.password)) {
        delete user.password;
        return user;
      } else {
        return null;
      }

  }

  private isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  private isPhone(phone) {
    const re = /^\d{8}$/;
    return re.test(phone);
  }


}
