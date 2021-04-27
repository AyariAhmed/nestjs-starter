import { UserRole } from "./entities/client.entity";

export interface JwtPayload{
  email : string;
  role : UserRole
}
