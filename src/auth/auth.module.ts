import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientRepository } from "./client.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports : [
    TypeOrmModule.forFeature([ClientRepository]),
    JwtModule.register({
    secret : "secret",
      signOptions : {
        expiresIn : 3600
      }
    }),
    PassportModule.register({defaultStrategy : 'jwt'})
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports : [JwtStrategy,PassportModule]
})
export class AuthModule {}
