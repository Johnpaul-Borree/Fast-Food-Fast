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
		this.price = 0;
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

	/**
   * Get menu from database
   * @method
   * */

	getMenu() {
		return this.pool.query('SELECT * from products')
			.then(result => result)
			.catch(err => err);
	}

	/**
   * Checks whether menuItem is already in the database
   * @method
	 * @param  {string} input - object to store menu details
	 */
	checkItemExistBefore(input) {
		this.productName = input.productName;
		this.description = input.description;
		this.price = input.price;
		return this.pool.query('SELECT * FROM products WHERE name = $1', [input.productName])
			.then((result) => {
				if (result.rows[0]) {
					return result.rows[0];
				}
				return false;
			})
			.catch(err => err);
	}
}
export default Menu;
