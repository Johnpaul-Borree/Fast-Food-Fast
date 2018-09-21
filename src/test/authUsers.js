import chai from 'chai';
import chaiHttp from 'chai-http';
import pool from '../helpers/connect';

import router from '../server';

const should = chai.should();

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
	describe('POST /auth/signup', () => {
		it('It should signup user, and asign a token', (done) => {
			const user = {
				name: 'udoka',
				email: 'myemail@gmail.com',
				phoneNumber: '09034523487',
				confirmPhone: '09034523487',
				password: 'mypassword345',
				confirmPassword: 'mypassword345',
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
				password: 'mypassword345',
				confirmPassword: 'mypassword345',
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
		it('It should not signup without phone number', (done) => {
			const user = {
				name: 'udoka',
				email: 'myemail@gmail.com',
				password: 'mypassword345',
				confirmPassword: 'mypassword345',
			};
			chai.request(router)
				.post('/api/v1/auth/signup')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Phone number should be a minimumof 11 characters');
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
				password: 'mypassword345'
			};
			chai.request(router)
				.post('/api/v1/auth/signup')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Password doesn\'t match');
					res.body.should.have.property('status').eql('failed');
					done();
				});
		});
	});
});
