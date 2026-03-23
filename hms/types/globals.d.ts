export { Role } from "@prisma/client";


//Create a type for the roles in the system
export type Roles = Role;

declare global {
    interface CustomJwtSessioncClaims {
        metadata: {
            role?: Roles;
        }
    }
}