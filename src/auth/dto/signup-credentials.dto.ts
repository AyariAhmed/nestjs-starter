import { IsEmail, IsString, MaxLength, MinLength, Length, IsIn } from "class-validator";
import { IsNotBlank } from "../../custom-validators/isNotBlank.validator";
import { UserRole } from "../entities/client.entity";
import { pgDateFormat } from "../../custom-validators/pgDateFormat.validator";


export class SignupCredentialsDto{

  @IsNotBlank()
  @IsString()
  @MinLength(4,{message : "firstName must be at least 4 characters long."})
  @MaxLength(20,{message : "firstName must be at most 20 characters long."})
  firstName : string;

  @IsNotBlank()
  @IsString()
  @MinLength(4,{message : "lastName must be at least 4 characters long."})
  @MaxLength(20,{message : "lastName must be at most 20 characters long."})
  lastName : string;

  @IsNotBlank({message : 'Email field can\'t be empty.'})
  @IsEmail()
  email : string;

  @IsNotBlank({message : 'Password field can\'t be empty.'})
  @IsString()
  @MinLength(6,{message : "password must be at least 6 characters long!"})
  @MaxLength(20,{message : "password must be at most 20 characters long!"})
  password : string;

  @IsNotBlank({message : 'Password field can\'t be empty.'})
  @IsString()
  @Length(8,8,{message : 'Phone number must be 8 characters long!'})
  phone : string;

  @pgDateFormat()
  birthdate : string;

  @IsIn([
    UserRole.ADMIN,UserRole.CLIENT,UserRole.OWNER
  ])
  role : UserRole;

  @IsNotBlank({message : 'Password field can\'t be empty.'})
  @IsString()
  governorate : string;

  @IsNotBlank({message : 'Password field can\'t be empty.'})
  @IsString()
  municipality : string;

  @IsNotBlank({message : 'Password field can\'t be empty.'})
  @IsString()
  street : string;

  @IsNotBlank({message : 'Password field can\'t be empty.'})
  @IsString()
  location : string;


}