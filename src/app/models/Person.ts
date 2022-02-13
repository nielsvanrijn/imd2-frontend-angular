export class Person {
	id!: number;
	firstName!: string;
	lastName!: string;
	birthday!: Date;
	country?: number;
	bio?: string;
	avatarUrl?: string;
	director?: number[];
	writer?: number[];
	character?: number[];
	cast?: number[];
	createdAt!: Date;
	updatedAt!: Date;

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	get hasAvatar() {
		return this.avatarUrl;
	}
}