import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientRepository } from "./client.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import * as config from 'config';
import * as dotenv from "dotenv";

dotenv.config();

const jwtConfig = config.get('jwt');

@Module({
  imports : [
    TypeOrmModule.forFeature([ClientRepository]),
    JwtModule.register({
    secret : process.env.JWT_SECRET || jwtConfig.secret,
      signOptions : {
        expiresIn : jwtConfig.expiresIn
      }
    }),
    PassportModule.register({defaultStrategy : 'jwt'})
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports : [JwtStrategy,PassportModule]
})
export class AuthModule {}
