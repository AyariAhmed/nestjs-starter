import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientRepository } from "./client.repository";
import { Client } from "./entities/client.entity";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(ClientRepository) private userRepository: ClientRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret"
    });
  }

  async validate(payload: JwtPayload): Promise<Client> {
    const { email,role} = payload;
    const user: Client = await this.userRepository.findOne({ email,role });
    if (!user)
      throw new UnauthorizedException("User Not found!");

    return user;
  }
}
