import chai from 'chai';
import chaiHttp from 'chai-http';

import router from '../server';

chai.should();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Create Order and get order', () => {
	const tokenObject = {};
	before((done) => {
		const user = {
			email: 'judeman@gmail.com',
			password: 'mypassword',
		};
		chai.request(router)
			.post('/api/v1/auth/login')
			.send(user)
			.end((err, res) => {
				tokenObject.token = res.body.token;
				done();
			});
	});

	describe('POST /order', () => {
		it('It should post order and return status code of 200', (done) => {
			const order = {
				token: tokenObject.token,
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
			const menuItem = {
				token: '56hhhi88090990-09jjhbbbtggbll*nbkj',
				'item': 'Bread',
				'quantity': 3,
				'price': 800.09,
			};
			chai.request(router)
				.post('/api/v1/menu')
				.send(menuItem)
				.end((err, req) => {
					req.should.have.status(401);
					req.body.should.be.a('object');
					req.body.should.have.property('message').eql('Failed to authenticate');
					done(err);
				});
		});
	});
});
