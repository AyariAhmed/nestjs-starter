import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions = {
  type : "postgres",
  host : "localhost",
  port : 5432,
  username : "foodimap_admin",
  password : "foodimap_admin",
  database : "foodimap",
  // entities : ["dist/**/*.entity{.ts,.js}"],
  entities : [__dirname+ '/../**/*.entity.{ts,js}'],
  synchronize : true /* in production it must be set to false */
}
