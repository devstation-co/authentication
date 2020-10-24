export default class UserEntity {
	constructor({ username, password, roles, createdAt, approved, emailValidated }) {
		if (!username) throw new Error('Username undefined');
		if (!password) throw new Error('Password undefined');
		if (!roles || roles.length === 0) throw new Error('Roles undefined');
		this.username = username;
		this.password = password;
		this.roles = roles;
		if (!createdAt) {
			this.createdAt = new Date();
		} else {
			this.createdAt = new Date();
		}
		if (approved === undefined && approved === null) {
			this.approved = false;
		} else {
			this.approved = approved;
		}
		if (emailValidated === undefined && emailValidated === null) {
			this.emailValidated = false;
		} else {
			this.emailValidated = emailValidated;
		}
	}
}
