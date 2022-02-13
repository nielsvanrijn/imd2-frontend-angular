import "reflect-metadata";
import { Type } from "class-transformer";
import { Profile } from "./Profile";

export class User {
	id!: number;
	email!: string;
	role!: 'USER' | 'ADMIN';
	
	@Type(() => Date)
	createdAt!: Date;
	
	@Type(() => Date)
	updatedAt!: Date;
	
	profile!: Profile
}