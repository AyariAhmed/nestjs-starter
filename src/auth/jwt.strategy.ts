import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientRepository } from "./client.repository";
import { Client } from "./entities/client.entity";
import * as config from 'config';
import { ConfigService } from "@nestjs/config";

const jwtConfig = config.get('jwt');


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(ClientRepository) private userRepository: ClientRepository,
    private configService: ConfigService
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret
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
