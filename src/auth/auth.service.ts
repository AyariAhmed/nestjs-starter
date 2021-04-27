import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientRepository } from "./client.repository";
import { SignupCredentialsDto } from "./dto/signup-credentials.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(ClientRepository) private clientRepository:ClientRepository
  ) {
  }

  async signup(signupCredentialsDto : SignupCredentialsDto) : Promise<Object|void>{
    return this.clientRepository.signup(signupCredentialsDto);
  }

  async login(loginCredentialsDto:LoginCredentialsDto) : Promise<Object | null>{
    const result : Object|null = await this.clientRepository.validateUserPassword(loginCredentialsDto);
    if(!result){
      throw new UnauthorizedException('Invalid Credentials');
    }
    return result;

  }

}
