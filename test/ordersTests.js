import chai from 'chai';
import chaiHttp from 'chai-http';

import router from '../src/server';

const should = chai.should();

chai.use(chaiHttp);
describe('ORDERS', () =>{
	describe('POST /orders', () => {
		it('should create orders on /orders and return a status code of 200', (done) => {
			const order = {
				type: 'Breakfast',
				name: 'Bread and Tea',
				orderDate: 'Dec 24th 2018, 9:00am',
				expires: 'Dec 24th 2018, 10:00am',
				quantities: 3,
			};
            
			chai.request(router)
				.post('/api/v1/orders')
				.send(order)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('justAdded').be.a('object');
					res.body.justAdded.should.have.property('orderDate').not.eql('');
					res.body.should.have.property('message').eql('order Created');
					done(err);
				});
		});
        
		it('should not create orders without required field(s) on /orders and return a status code of 400 with error message', (done) => {
			const order = {
				type: 'Breakfast',
				orderDate: 'Dec 24th 2018, 9:00am',
				expires: 'Dec 24th 2018, 10:00am',
				quantities: 3,
			};
            
			chai.request(router)
				.post('/api/v1/orders')
				.send(order)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('Failed to create order');
					res.body.should.have.property('message').eql('"name" is required');
					done(err);
        
				});
		});
        
		it('should not create orders without correct number of field(s) on /orders and return a status code of 400 with error message', (done) => {
			const order = {
				type: 'Breakfast',
				name: 'Bread and Tea',
				orderDate: 'Dec 24th 2018, 9:00am',
				expires: 'Dec',
				quantities: 3,
			};
            
			chai.request(router)
				.post('/api/v1/orders')
				.send(order)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('Failed to create order');
					res.body.should.have.property('message').eql('"expires" length must be at least 6 characters long');
					done(err);
        
				});
		});
    
        
        
       
	});

	describe('GET /orders', () => {
		it('Should list all order history on /orders', (done) => {
			chai.request(router)
				.get('/api/v1/orders')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('Orders').be.a('array');
					res.body.should.have.property('status').eql('Success');
					done();
				});
		});
	});
});
