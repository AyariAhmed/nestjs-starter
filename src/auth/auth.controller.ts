import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupCredentialsDto } from "./dto/signup-credentials.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";

@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService) {
  }

  @Post('signup')
  async signup(@Body(ValidationPipe) signupCredentialsDto:SignupCredentialsDto) : Promise<Object | void>{
    return this.authService.signup(signupCredentialsDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginCredentialsDto:LoginCredentialsDto) : Promise<Object | void>{
    return this.authService.login(loginCredentialsDto);
  }


}
