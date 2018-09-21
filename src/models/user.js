import bcrypt from 'bcrypt';
import pool from '../helpers/connect';

class User {
	constructor(name, email, phoneNumber, password) {
		this.pool = pool;
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.password = password;
	}

	signup() {
		const hash = bcrypt.hashSync(this.password, 10);
		const query = {
			text: `INSERT INTO users (
        name, email, phone_number,
        hashed_password
        ) VALUES($1, $2, $3, $4) RETURNING id, is_admin`,
			values: [this.name, this.email, this.phoneNumber, hash],
		};
		return this.pool.query(query)
			.then((result) => {
				const userId = result.rows[0].id;
				const admin = result.rows[0].is_admin;
				// wrong input
				if (!userId) throw new Error();
				return { userId, admin };
			})
			.catch(() => { throw new Error(); });
	}

	checkUserExistBefore(input) {
		this.name = input.name;
		this.email = input.email;
		this.phoneNumber = input.phoneNumber;
		this.password = input.password;
		return this.pool.query('SELECT * FROM users WHERE email = $1', [input.email])
			.then((result) => {
				if (result.rows[0]) {
					return result.rows[0];
				}
				return false;
			})
			.catch(err => err);
	}
}
export default User;
