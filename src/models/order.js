import format from 'pg-format';
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
	postOrder(input, reqBody) {
		let items = reqBody;
		let values = [];
		for(let i = 0; i < items.length; i++) {
			let query = `((select ids from new_orders), ${items[i].name}, ${items[i].quantity}, (select price from products where name = '${items[i].name}'))`;
			values.push(query);
		}
		console.log(values.join(', '));
		const query = {
			text: `with new_orders as (
                  INSERT INTO orders (user_id, address, total_price)
                  values ${input.userId}, ${input.address}, ${600}
                  RETURNING *
      )
              INSERT INTO order_items (order_id, item, quantity, price)
              values ${values.join(', ')}`
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
		this.userId = input.userId;
		this.orderId = input.orderId;

		const query = {
			text: `SELECT *
            FROM orders
            INNER JOIN users ON
            orders.user_id = users.id WHERE id = $1
            AND user_id = $2`,
			values: [input.orderId, input.userId]
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

	calculateTotal(reqBody){
	  this.total = 0;
		const items = reqBody;
		let price = 0;
		const totalArr = [];
		for(let i = 0; i < items.length; i++) {
			const totalArrayItem = this.fetchPrice(items[i].name)
				.then((result) => {
					if(result){
						price = result.price;
						this.total += (items[i].quantity * price);
					}
					// console.log(this.total);
				})
				.catch(err => err);
			totalArr.push(totalArrayItem);
		}
		Promise.all(totalArr)
			.then(() => {
				console.log(this.total);
			});
	}

	/**
   * Get price of selected item to calculate total
   * @method
	 * @param  {float} item - the item to calculate price
	 */
	fetchPrice(reqBody) {
		return this.pool.query('SELECT price FROM products WHERE name = $1', [reqBody])
			.then((result) => {
				if (result.rows[0]) {
					return result.rows[0];
				}
				return false;
			})
			.catch(err => err);
	}

	/**
   * Get My Order
   */
	getOrderByUserId(userId) {
		return this.pool.query(`SELECT
                            name, email, phone_number, orders.id,
                            item, quantity, price, address,
                            total_price, created_at, updated_at, status
                             FROM orders INNER JOIN users ON
                             orders.user_id = users.id
                             INNER JOIN order_items ON
                             orders.id = order_items.order_id
                             WHERE user_id = $1`, [userId])
			.then((result) => {
				if (result.rows) {
					return result.rows;
				}
				return false;
			})
			.catch(err => err);
	}

	/**
   * Admin can view all oeders
   */
	getAllOrders() {
		return this.pool.query(`SELECT
                            name, email, phone_number, orders.id,
                            item, quantity, price, address,
                            total_price, created_at, updated_at, status
                             FROM orders INNER JOIN users ON
                             orders.user_id = users.id
                             INNER JOIN order_items ON
                             orders.id = order_items.order_id`
		)
			.then((result) => {
				if (result.rows) {
					return result.rows;
				}
				return false;
			})
			.catch(err => err);
	}

	/**
   * Admin get single order
   * @method
   * @param {integer} orderId - integer id for connection url
   */
	getSpecificOrder(orderId) {
		return this.pool.query(`SELECT
                            name, email, phone_number, orders.id,
                            item, quantity, price, address,
                            total_price, created_at, updated_at, status
                             FROM orders INNER JOIN users ON
                             orders.user_id = users.id
                             INNER JOIN order_items ON
                             orders.id = order_items.order_id
                             WHERE orders.id = $1`, [orderId])
			.then((result) => {
				if (result.rows[0]) {
					return result.rows[0];
				}
				return false;
			})
			.catch(err => err);
	}

	/**
   * Admin update order status
   * @method
   * @param {string} status - Admin updates status
   * @param {integer} oderId - Represent id of order
    */
	updateOrders(status, orderId) {
		return this.pool.query(`UPDATE orders SET status = $1,
                            updated_at = NOW()
                            where id = $2 RETURNING *`
		, [status, orderId])
			.then(result => result)
			.catch(err => err);
	}
}
export default Orders;
