# Fast-Food-Fast
<<<<<<< HEAD
[![Build Status](https://travis-ci.org/Johnpaul-Borree/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/Johnpaul-Borree/Fast-Food-Fast)[![Coverage Status](https://coveralls.io/repos/github/Johnpaul-Borree/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/Johnpaul-Borree/Fast-Food-Fast?branch=develop)[![Maintainability](https://api.codeclimate.com/v1/badges/986bd5041af6543c1b1e/maintainability)](https://codeclimate.com/github/Johnpaul-Borree/Fast-Food-Fast/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/986bd5041af6543c1b1e/test_coverage)](https://codeclimate.com/github/Johnpaul-Borree/Fast-Food-Fast/test_coverage)
## Project Overview
Fast-Food-Fast​ is a food delivery service app for a restaurant.
=======
[![Build Status](https://travis-ci.org/Johnpaul-Borree/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/Johnpaul-Borree/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/Johnpaul-Borree/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/Johnpaul-Borree/Fast-Food-Fast?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/986bd5041af6543c1b1e/maintainability)](https://codeclimate.com/github/Johnpaul-Borree/Fast-Food-Fast/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/986bd5041af6543c1b1e/test_coverage)](https://codeclimate.com/github/Johnpaul-Borree/Fast-Food-Fast/test_coverage)
## Project Overview
Fast-Food-Fast​ is a food delivery service app for a restaurant.
The app is a mini restaurant application channelled to serve food to customers from the pot.
Customers are served from the nearest restaurants close to them. There is no online payment integration yet,
for now we pay on delivery.

## Getting Started
- Install nodejs version 8.11.3
- Clone this repository
    $ git clone https://github.com/Johnpaul-Borree/Fast-Food-Fast.git
    $cd Fast-Food-Fast
- Checkout to develop branch
- run command npm install to install all dependencies in the package.json file
- use npm run start_dev to start server for development
- test endpoints on postman

## ENDPOINTS
- get all orders -- GET /api/v1/orders
- get a single order -- GET /api/v1/orders/<orderId>
- post order  -- POST /api/v1/orders
- update order status PUT /api/v1/orders/<orderId>

## Running the tests
- npm run test
- integrate travis CI coveralls and codeclinate
## Deployment
- create account on <a href="heroku.com">heroku</a> and signup with github
- push required branch to heroku
    $git push heroku <branch name>:master
    see url from $heroku open
>>>>>>> ch-mocha-test-update-status-#160538571
### Required Features
1. Users can create an account and log in
2. A user should be able to order for food
3. The admin should be able to add, edit or delete the fast-food items
4. The admin should be able to see a list of fast-food items
5. The admin user should be able to do the following:
    - See a list of orders
    - Accept and decline orders
    - Mark orders as completed
<<<<<<< HEAD
6. A user should be able to see a history of ordered food
=======
6. A user should be able to see a history of ordered food
>>>>>>> ch-mocha-test-update-status-#160538571
