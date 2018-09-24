import chai from 'chai';
import chaiHttp from 'chai-http';
import pool from '../helpers/connect';

import router from '../server';

chai.should();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Users Authentication', () => {
	before((done) => {
		pool.query(('DELETE from users where email = \'myemail@gmail.com\''))
			.then(() => {
				done();
			})
			.catch(() => done());
	});
	describe('GET /', () => {
		it('it should Show a welcome message', (done) =>{
			chai.request(router)
				.get('/')
				.end((err, res) =>{
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});
	describe('POST /auth/signup', () => {
		it('It should signup user, and asign a token', (done) => {
			const user = {
				name: 'udoka',
				email: 'myemail@gmail.com',
				phoneNumber: '09034523487',
				confirmPhone: '09034523487',
				password: 'mypassword',
				confirmPassword: 'mypassword',
			};
			chai.request(router)
				.post('/api/v1/auth/signup')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('message').eql('Account created Successfully');
					res.body.should.have.property('token').be.a('string');
					done();
				});
		});
		it('It should not signup existing user', (done) => {
			const user = {
				name: 'udoka',
				email: 'myemail@gmail.com',
				phoneNumber: '09034523487',
				confirmPhone: '09034523487',
				password: 'mypassword',
				confirmPassword: 'mypassword',
			};
			chai.request(router)
				.post('/api/v1/auth/signup')
				.send(user)
				.end((err, res) => {
					res.should.have.status(422);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('email exist');
					res.body.should.have.property('status').eql('failed');
					done();
				});
		});
		it('It should not signup user when name is less than 3', (done) => {
			const user = {
				name: 'ud',
				email: 'myemail@gmail.com',
				phoneNumber: '09034523487',
				confirmPhone: '09034523487',
				password: 'mypassword',
				confirmPassword: 'mypassword',
			};
			chai.request(router)
				.post('/api/v1/auth/signup')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Enter a valid full Name');
					res.body.should.have.property('status').eql('failed');
					done();
				});
		});
		it('It should not signup user when phone number is less than 11', (done) => {
			const user = {
				name: 'udoka',
				email: 'myemail@gmail.com',
				phoneNumber: '0903452',
				confirmPhone: '0903452',
				password: 'mypassword345',
				confirmPassword: 'mypassword',
			};
			chai.request(router)
				.post('/api/v1/auth/signup')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('please enter a valid phone number');
					res.body.should.have.property('status').eql('failed');
					done();
				});
		});
		it('It should not signup without phone number', (done) => {
			const user = {
				name: 'udoka',
				email: 'myemail@gmail.com',
				password: 'mypassword',
				confirmPassword: 'mypassword',
			};
			chai.request(router)
				.post('/api/v1/auth/signup')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Phone number is required');
					res.body.should.have.property('status').eql('failed');
					done();
				});
		});
		it('It should not signup without confirm password', (done) => {
			const user = {
				name: 'udoka',
				email: 'myemail@gmail.com',
				phoneNumber: '09034523487',
				confirmPhone: '09034523487',
				password: 'mypassword'
			};
			chai.request(router)
				.post('/api/v1/auth/signup')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Passwords doesn\'t match');
					res.body.should.have.property('status').eql('failed');
					done();
				});
		});
		it('It should not signup without confirm phone', (done) => {
			const user = {
				name: 'udoka',
				email: 'myemail@gmail.com',
				phoneNumber: '09034898976',
				password: 'mypassword'
			};
			chai.request(router)
				.post('/api/v1/auth/signup')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Phone numbers doesn\'t match');
					res.body.should.have.property('status').eql('failed');
					done();
				});
		});
	});
	describe('POST /auth/login', () => {
		it('It should login user, and asign token', (done) => {
			const user = {
				email: 'myemail@gmail.com',
				password: 'mypassword',
			};
			chai.request(router)
				.post('/api/v1/auth/login')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('message').eql('You are logged in!');
					res.body.should.have.property('token').be.a('string');
					done();
				});
		});

		it('It should not login user, email field missing', (done) => {
			const user = {
				password: 'mypassword',
			};
			chai.request(router)
				.post('/api/v1/auth/login')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('failed');
					res.body.should.have.property('message').eql('Email is required');
					done();
				});
		});
		it('It should not login user, when password mismatch', (done) => {
			const user = {
				email: 'testpass@gmail.com',
				password: 'mypassword',
			};
			chai.request(router)
				.post('/api/v1/auth/login')
				.send(user)
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('invalid Email or Password');
					res.body.should.have.property('message').eql('Passwords doesn\'t match');
					res.body.should.have.property('status').eql('failed');
					done();
				});
		});
	});
});
