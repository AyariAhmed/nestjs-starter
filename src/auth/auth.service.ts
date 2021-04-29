import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientRepository } from "./repositories/client.repository";
import { ClientSignupCredentialsDto } from "./dto/client-signup-credentials.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { JwtService } from "@nestjs/jwt";
import { Client } from "./entities/client.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { UserRole } from "./entities/roles.enum";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(ClientRepository) private clientRepository:ClientRepository,
    private jwtService : JwtService
  ) {
  }

  async signup(signupCredentialsDto : ClientSignupCredentialsDto) : Promise<{ accessToken : string}|void>{
    const newUser : Client|null = await this.clientRepository.signup(signupCredentialsDto);
    if(newUser)
      return this.signJwt(newUser.email,newUser.role);
  }

  async login(loginCredentialsDto:LoginCredentialsDto) : Promise<{ accessToken : string} | null>{
    const user : Client|null = await this.clientRepository.validateUserPassword(loginCredentialsDto);
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
