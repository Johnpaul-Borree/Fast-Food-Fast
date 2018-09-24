/**
 * validator object to validate user details
 * @param {array} errors - store error messages
 * @param {object} requestInput - collects input from body
 * @param {function} trimSpaces - Removes excess spaces from input
 */

const validator = {
	errors: [],
	requestsInput: null,
	trimSpaces: (input) => {
		const validType = validator.requestsInput[input];
		return validType ? validType.replace(/^\s+|\s+$/g, ''): '';
  },
/**
 * validates input values
 * @param  {object} req - object in req.body
 * @param  {string} inputs - main input from body
 */

	validate: (req, inputs) => {
    validator.errors = [];
		Object.getOwnPropertyNames(validator).filter((name) => {
			if (inputs.indexOf(name) !== -1) {
				validator.requestsInput = req;
				validator[name]('');
			}
		});
		return validator.errors;
	},

	name: () => {
		const nameArr = validator.trimSpaces('name').split(' ');
		let name = '';
		if (nameArr.length > 2) {
			const error = 'Full name must be firstname space lastname or just firstname';
			validator.errors.push({ message: error });
		} else if (nameArr.length === 1) {
			name = nameArr[0];
		} else {
			const firstname = nameArr[0].replace(/^\s+|\s+$/g, '');
			const lastname = nameArr[1].replace(/^\s+|\s+$/g, '');
			name = `${firstname} ${lastname}`;
		}
		if (name === '' || name.length < 3) {
			const error = 'Enter a valid full Name';
			validator.errors.push({ message: error });
		}
	},


	email: () => {
		const email = validator.trimSpaces('email');
		if (email === '') {
			const error = 'Email is required';
			validator.errors.push({ message: error });
		} else {
			const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
			if (!regex.test(email)) {
				const error = 'Please enter a valid email address.';
				validator.errors.push({ message: error });
			}
		}
	},

	phoneNumber: () => {
		const phoneNumber = validator.trimSpaces('phoneNumber');
		const regex = /^[0]\d{10}$/gm;
		if (phoneNumber === '') {
			const error = 'Phone number is required';
			validator.errors.push({ message: error });
		} else if (!regex.test(phoneNumber)) {
			const error = 'please enter a valid phone number';
			validator.errors.push({ message: error });
		}
	},

	confirmPhone: () => {
		if(validator.trimSpaces('phoneNumber') !== validator.trimSpaces('confirmPhone')) {
			const error = 'Phone numbers doesn\'t match';
			validator.errors.push({ message: error });
		}
	},

	password: () => {
		const password = validator.trimSpaces('password');
		if (password === '') {
			const error = 'Password is required';
			validator.errors.push({ message: error });
		} else if (password.length < 6 || password.length > 12) {
			const error = 'Password lenght should be greater than 6 and less than 12';
			validator.errors.push({ message: error });
		}
	},

	confirmPassword: () => {
		if (validator.trimSpaces('password') !== validator.requestsInput['confirmPassword'])  {
			const error = 'Passwords doesn\'t match';
			validator.errors.push({ message: error });
		}
	},

};

export default validator;
