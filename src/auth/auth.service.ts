import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientRepository } from "./repositories/client.repository";
import { ClientSignupCredentialsDto } from "./dto/client-signup-credentials.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { JwtService } from "@nestjs/jwt";
import { Client } from "./entities/client.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { UserRole } from "./entities/roles.enum";
import { OwnerRepository } from "./repositories/owner.repository";
import { Owner } from "./entities/owner.entity";
import { OwnerSignupCredentialsDto } from "./dto/owner-signup-credentials.dto";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(ClientRepository) private clientRepository:ClientRepository,
    @InjectRepository(OwnerRepository) private ownerRepository:OwnerRepository,
    private jwtService : JwtService
  ) {
  }

  async clientSignup(signupCredentialsDto : ClientSignupCredentialsDto) : Promise<{ accessToken : string}|void>{
    const newUser : Client|null = await this.clientRepository.signup(signupCredentialsDto);
    if(newUser)
      return this.signJwt(newUser.email,newUser.role);
  }

  async clientLogin(loginCredentialsDto:LoginCredentialsDto) : Promise<{ accessToken : string} | null>{
    const user : Client|null = await this.clientRepository.validateUserPassword(loginCredentialsDto);
    if(!user){
      throw new UnauthorizedException('Invalid Credentials');
    }
    return this.signJwt(user.email,user.role);

  }

  async ownerSignup(signupCredentialsDto : OwnerSignupCredentialsDto) : Promise<{ accessToken : string}|void>{
    const newUser : Owner|null = await this.ownerRepository.signup(signupCredentialsDto);
    if(newUser)
      return this.signJwt(newUser.email,newUser.role);
  }

  async ownerLogin(loginCredentialsDto:LoginCredentialsDto) : Promise<{ accessToken : string} | null>{
    const user : Owner|null = await this.ownerRepository.validateUserPassword(loginCredentialsDto);
    if(!user){
      throw new UnauthorizedException('Invalid Credentials');
    }
    return this.signJwt(user.email,user.role);

  }

  private async signJwt(email : string,role : UserRole) : Promise<{ accessToken : string}>{
  const payload : JwtPayload = {email,role};
  const accessToken : string= await this.jwtService.sign(payload);
  return {accessToken};
}

}
