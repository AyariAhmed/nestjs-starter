import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientRepository } from "./client.repository";

@Module({
  imports : [
    TypeOrmModule.forFeature([ClientRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
