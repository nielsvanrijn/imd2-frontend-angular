export class Character {
	id!: number;
	firstName!: string;
	lastName!: string;
	birthday!: Date;
	bio?: string;
	createdAt!: Date;
	updatedAt!: Date;

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
}