import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClientSignupCredentialsDto } from "./dto/client-signup-credentials.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { GetUser } from "./get-user.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService) {
  }

  @Post('signup')
  async signup(@Body(ValidationPipe) signupCredentialsDto:ClientSignupCredentialsDto) : Promise<{ accessToken : string} | void>{
    return this.authService.clientSignup(signupCredentialsDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginCredentialsDto:LoginCredentialsDto) : Promise<{ accessToken : string} | void>{
    return this.authService.clientLogin(loginCredentialsDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  testUserExtraction(@GetUser() client){
    console.log(client);
    return client;
  }


}
