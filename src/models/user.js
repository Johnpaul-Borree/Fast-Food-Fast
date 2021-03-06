import bcrypt from 'bcrypt';
import pool from '../helpers/connect';

class User {
/**
 * Describes a user
 * @constructor
 * @param  {string} name - User Full Name
 * @param  {string} email - User Email
 * @param  {string} phoneNumber - User Phone Number
 * @param  {string} password - User Password
 */

	constructor(name, email, phoneNumber, password) {
		this.pool = pool;
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.password = password;
	}
/**
 * Sign Up user to the database
 * @method
 * */
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
				if (!userId) throw new Error();
				return { userId, admin };
			})
			.catch(() => { throw new Error(); });
	}

	/**
   * Sign In user to the database
   * @method
   * */

	login() {
		const query = {
			text: 'SELECT * FROM users WHERE email = $1',
			values: [this.email],
		};

		return this.pool.query(query)
			.then((result) => {
				if (!result.rows[0]) return ({ code: 1, id: null });
				const passwordMatch = bcrypt.compareSync(this.password, result.rows[0].hashed_password);
				if (passwordMatch) {
					return ({ code: 2, id: result.rows[0].id, admin: result.rows[0].is_admin });
				}
				return ({ code: 3, id: null });
			})
			.catch(err => err);
	}
	/**
   * Checks whether user email is already in the database
   * @method
	 * @param  {string} input - object to store user details
	 */
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

	createAdmin(input){
		return this.pool.query('UPDATE users SET is_admin = $1 WHERE email = $2 RETURNING name, email, is_admin', [true, input])
			.then(result => result)
			.catch(err => err);
	}
}
export default User;
