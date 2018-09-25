import pool from '../helpers/connect';

class Menu {
/**
 * Describes a food menu
 * @constructor
 */

	constructor() {
		this.pool = pool;
		this.productName = null;
		this.description = null;
		this.userId = null;
		this.admin = false;
		this.price = null;
	}
	/**
 * add menu to the database
 * @method
 * */
	addMenu(input) {
		const query = {
			text: `INSERT INTO products (
          name, description, price
          ) VALUES($1, $2, $3) RETURNING *`,
			values: [input.productName, input.description, input.price],
		};
		return this.pool.query(query)
			.then(result => result)
			.catch(err => err);
	}



}
export default Menu;
