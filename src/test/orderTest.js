import chai from 'chai';
import chaiHttp from 'chai-http';

import router from '../server';


chai.should();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

let token1, token2;
describe('Create Order and get order', () => {
	before((done) => {
		const user1 = {
			email: 'judeman@gmail.com',
			password: 'mypassword',
		};
		chai.request(router)
			.post('/api/v1/auth/login')
			.send(user1)
			.end((err, res) => {
				token1 = res.body.token;
				done();
			});
	});

	before((done) => {
		const user2 = {
			email: 'ladipo@gmail.com',
			password: 'mypassword',
		};
		chai.request(router)
			.post('/api/v1/auth/login')
			.send(user2)
			.end((err, res) => {
				token2 = res.body.token;
				done();
			});
	});

	describe('POST /order', () => {
		it('should generate token', (done) => {
			token1.should.be.a('string');
			token2.should.be.a('string');
			done();
		});
		it('It should post order and return status code of 200', (done) => {
			const order = {
				token: token2,
				'item': 'Bread',
				'quantity': 3,
				'price': 800.09,
			};
			chai.request(router)
				.post('/api/v1/orders')
				.send(order)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('Success');
					res.body.should.have.property('message').eql('Order created successfully');
					done(err);
				});
		});
		it('Should not post order when token didn\'t match', (done) => {
			const order = {
				token: '56hhhi88090990-09jjhbbbtggbll*nbkj',
				'item': 'Bread',
				'quantity': 3,
				'price': 800.09,
			};
			chai.request(router)
				.post('/api/v1/orders')
				.send(order)
				.end((err, req) => {
					req.should.have.status(401);
					req.body.should.be.a('object');
					req.body.should.have.property('message').eql('Failed to authenticate');
					done(err);
				});
		});
	});
	describe('/GET', () => {
		it('should get user history', (done) => {
			chai.request(router)
				.get('/api/v1/users/4/orders')
				.set('x-auth-token', token2)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('Success');
					res.body.should.have.property('message').eql('Orders fetched successfully');
					res.body.should.have.property('userOrders').be.a('array');
					done();
				});
		});
		it('should get all user history', (done) => {
			chai.request(router)
				.get('/api/v1/orders')
				.set('x-auth-token', token1)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('Success');
					res.body.should.have.property('message').eql('Orders fetched successfully');
					res.body.should.have.property('allOrders').be.a('array');
					done();
				});
		});
		it('should not get all order if not admin', (done) => {
			chai.request(router)
				.get('/api/v1/orders')
				.send(token2)
				.end((err, res) => {
					res.should.have.status(403);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('No Token');
					done();
				});
		});
		it('should get a single order by id', (done) => {
			chai.request(router)
				.get('/api/v1/orders/3')
				.set('x-auth-token', token1)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('Success');
					res.body.should.have.property('message').eql('Order fetched successfully');
					res.body.should.have.property('singleOrder').be.a('object');
					done();
				});
		});
		it('should not get a single order by unknown id', (done) => {
			chai.request(router)
				.get('/api/v1/orders/34')
				.set('x-auth-token', token1)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('failed');
					res.body.should.have.property('message').eql('Order with the given Id was not found');
					done();
				});
		});
	});
	describe('/PUT', () => {
		it('should update order status', (done) => {
			const order = {
				token: token1,
				status: 'processing'
			};
			chai.request(router)
				.put('/api/v1/orders/8')
				.send(order)
				.set('x-auth-token', token1)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('Success');
					res.body.should.have.property('message').eql('Order updated successfully');
					res.body.should.have.property('justUpdated').be.a('object');
					res.body.justUpdated.should.have.property('status').eql('processing');
					done();
				});
		});
		it('should not update unknown id', (done) => {
			const order = {
				token: token1,
				status: 'processing'
			};
			chai.request(router)
				.put('/api/v1/orders/34')
				.send(order)
				.set('x-auth-token', token1)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('failed');
					res.body.should.have.property('message').eql('Order with the given Id was not found');
					done();
				});
		});
	});
});
