import chai from 'chai';
import chaiHttp from 'chai-http';
import pool from '../helpers/connect';

import router from '../server';

chai.should();

process.env.NODE_ENV = 'test';
let token1, token2;
chai.use(chaiHttp);

describe('Food Menu', () => {
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

	describe('POST /menu', () => {
		it('should generate token', (done) => {
			token1.should.be.a('string');
			token2.should.be.a('string');
			done();
		});
		it('It should add menu and return status code of 200', (done) => {
			const menuItem = {
				token: token1,
				productName: 'myproduct',
				description: 'This is a product designed by me',
				price: '1050',
			};
			chai.request(router)
				.post('/api/v1/menu')
				.send(menuItem)
				.set('x-auth-token', token1)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('menuEntry').be.a('object');
					res.body.menuEntry.should.have.property('created_at').not.eql('');
					res.body.should.have.property('message').eql('Created');
					done(err);
				});
		});
		it('Should not post menu when token didn\'t match', (done) => {
			const menuItem = {
				token: '56hhhi88090990-09jjhbbbtggbll*nbkj',
				productName: 'myproduct',
				description: 'This is a product designed by me',
				price: '1050',
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
		it('It should not post item more than once', (done) => {
			const menuItem = {
				token: token1,
				productName: 'myproduct',
				description: 'This is a product designed by me',
				price: '1050',
			};
			chai.request(router)
				.post('/api/v1/menu')
				.send(menuItem)
				.end((err, res) => {
					res.should.have.status(403);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('item exist');
					res.body.should.have.property('status').eql('failed');
					done();
				});
		});
		it('Should not post menu when user is not admin', (done) => {
			const menuItem = {
				token: token2,
				productName: 'myproduct',
				description: 'This is a product designed by me',
				price: '1050',
			};
			chai.request(router)
				.post('/api/v1/menu')
				.send(menuItem)
				.end((err, req) => {
					req.should.have.status(401);
					req.body.should.be.a('object');
					req.body.should.have.property('message').eql('access denied, contact admin');
					done(err);
				});
		});

		after((done) => {
			pool.query(('DELETE from products where name = \'myproduct\''))
				.then(() => {
					done();
				})
				.catch(err => err);
		});
	});

	describe('/GET', () => {
		it('should get all menu without token', (done) => {
			chai.request(router)
				.get('/api/v1/menu')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('menu').be.a('array');
					done();
				});
		});
	});
});
