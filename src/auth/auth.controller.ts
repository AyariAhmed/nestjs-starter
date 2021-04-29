import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClientSignupCredentialsDto } from "./dto/client-signup-credentials.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { GetUser } from "./decorators/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { OwnerSignupCredentialsDto } from "./dto/owner-signup-credentials.dto";
import { JwtAuthGuard } from "./guards/jwt-guard";
import { RolesGuard } from "./guards/roles.guard";
import { hasRoles } from "./decorators/roles.decorator";
import { UserRole } from "./entities/roles.enum";

@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService) {
  }

  @Post('client/signup')
  async clientSignup(@Body(ValidationPipe) signupCredentialsDto:ClientSignupCredentialsDto) : Promise<{ accessToken : string} | void>{
    return this.authService.clientSignup(signupCredentialsDto);
  }

  @Post('client/login')
  async clientLogin(@Body(ValidationPipe) loginCredentialsDto:LoginCredentialsDto) : Promise<{ accessToken : string} | void>{
    return this.authService.clientLogin(loginCredentialsDto);
  }

  @Post('owner/signup')
  async ownerSignup(@Body(ValidationPipe) signupCredentialsDto:OwnerSignupCredentialsDto) : Promise<{ accessToken : string} | void>{
    return this.authService.ownerSignup(signupCredentialsDto);
  }

  @Post('owner/login')
  async login(@Body(ValidationPipe) loginCredentialsDto:LoginCredentialsDto) : Promise<{ accessToken : string} | void>{
    return this.authService.ownerLogin(loginCredentialsDto);
  }

  @Get('/test')
  @hasRoles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  testUserExtraction(@GetUser() client){
    return client;
  }


}
