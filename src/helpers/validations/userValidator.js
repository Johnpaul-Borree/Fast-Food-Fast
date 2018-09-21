import { check, validationResult } from 'express-validator/check';

const trimSpaces = (input) => {
	const trimedString = input.replace(/^\s+|\s+$/g, '');
	return trimedString;
};

const validateAuth = {

	login: [
		check('email', 'email is required')
			.exists(),
		check('email', 'please, enter a valid email')
			.isEmail(),
		check('password', 'password is required')
			.exists(),
	],
	singUp: [
		check('name', 'name is required and should be a minimum of 3 characters')
			.isLength({ min: 3 })
			.custom((value) => {
				if (trimSpaces(value).length < 3) {
					throw new Error('name should be a minimum of 3 characters');
				} else {
					return value;
				}
			}),
		check('email', 'email is required')
			.exists(),
		check('email', 'please, enter a valid email')
			.isEmail(),
		check('phoneNumber', 'Phone number should be a minimumof 11 characters')
			.isLength({ min: 11 })
			.custom((value, { req }) => {
				if (trimSpaces(value).length < 11) {
					throw new Error('Number should be a minimum of 11 characters');
				}
				if (value !== req.body.confirmPhone) {
					throw new Error('Phone numbers doesn\'t match');
				} else {
					return value;
				}
			}),
		check('password', 'password should be a minimum of 6 characters')
			.isLength({ min: 6 })
			.custom((value, { req }) => {
				if (trimSpaces(value).length < 6) {
					throw new Error('password should be a minimum of 6 characters');
				}
				if (value !== req.body.confirmPassword) {
					throw new Error('Password doesn\'t match');
				} else {
					return value;
				}
			}),
	],
	validationResult,
};

export default validateAuth;
