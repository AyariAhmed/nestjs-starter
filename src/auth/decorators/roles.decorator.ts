import { SetMetadata } from "@nestjs/common";

export const hasRoles = (...hasRoles : String[]) => SetMetadata('roles',hasRoles);

