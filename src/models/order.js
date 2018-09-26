import pool from '../helpers/connect';

class Orders {
/**
 * Describes a food menu order
 * @constructor
 */

	constructor() {
		this.pool = pool;
		this.quantity = null;
		this.userId = null;
		this.orderId = null;
		this.admin = false;
		this.item = null;
		this.price = null;
		this.total = null;
		this.totalPrice = null;
		this.totalQuantities = null;
		this.totalItem = null;
		this.address = null;
	}

	/**
   * Make Order
   * @method
   */
	postOrder(input) {
		const query = {
			text: `with new_orders as (
              INSERT INTO orders (user_id, address, total_price)
              values($1, $2, $3)
              RETURNING *
      )
              INSERT INTO order_items (order_id, item, quantity, price)
              values((select id from new_orders), $4, $5, $6)`,
			values: [
				input.userId, input.address, input.total,
				input.item, input.quantity, input.price
			]
		};
		return this.pool.query(query)
			.then(result => result)
			.catch(err => err);
	}

	/**
   * Checks whether order has been made before by the same person
   * @method
	 * @param  {string} input - object to store input details
	 */
	checkOrderExistBefore(input) {
		this.item = input.item;
		this.userId = input.userId;
		this.orderId = input.orderId;
		this.quantity = input.quantity;

		const query = {
			text: `SELECT *
            FROM order_items
            INNER JOIN orders ON
            order_items.order_id = orders.id
            INNER JOIN users ON
            orders.user_id = users.id WHERE item = $1
            AND user_id = $2`,
			values: [input.item, input.userId]
		};
		return this.pool.query(query)
			.then((result) => {
				if (result.rows[0]) {
					return result.rows[0];
				}
				return false;
			})
			.catch(err => err);
	}


	/**
   * Get price of selected item to calculate total
   * @method
	 * @param  {float} item - the item to calculate price
	 */
	fetchPrice(item) {
		return this.pool.query('SELECT price FROM products WHERE name = $1', [item])
			.then((result) => {
				if (result.rows[0]) {
					return result.rows[0];
				}
				return false;
			})
			.catch(err => err);
	}
}
export default Orders;
