export default class UserRepository {
	static async saveUser({ user, database }) {
		await database.insertOne({
			collectionName: 'users',
			entity: user,
		});
		return true;
	}

	static async getUserByUsername({ username, database }) {
		const user = await database.findOne({
			collectionName: 'users',
			filter: { username },
		});
		return user;
	}
}
