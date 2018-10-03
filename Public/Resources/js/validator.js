class Validation {
	constructor(input) {
		/**
       * Array errorMessage
       * stores error messages
       * for the setCustomValidity API for window popup
       */
		this.errorMessage = [];

		this.validInput = [];

		this.inputNode = input;

		this.addOnKeyListener();
	}

	addErrorMessage(message) {
		this.errorMessage.push(message);
	}

	getErrorMessage() {
		return this.errorMessage.join('. \n');
	}

	/**
 * Using HTML 5 checkvality method to give error
 * messages and meter the successful input.
 */
	checkValidInput(input) {
		for ( let i = 0; i < this.validInput.length; i++ ) {

			const isInvalid = this.validInput[i].isInvalid(input);
			if (isInvalid) {
				this.addErrorMessage(this.validInput[i].error);
			}

			/**
     * target Element of the password div.
     * print error on the div toggle dialog
     * show progress using the progress percentage.
     */
			const targetElement = this.validInput[i].element;
			if (targetElement) {
				if (isInvalid) {
					targetElement.classList.add('invalid');
					targetElement.classList.remove('valid');
				} else {
					targetElement.classList.remove('invalid');
					targetElement.classList.add('valid');
				}

			}
		}

		const statusBar = document.getElementById('password-status');
		const strengthMessage = document.getElementById('strength-status');

		if((input.value.length >= 6 && (input.value.length <= 12))){
			if(input.value.match(/([a-z],*[A-Z])|([A-Z],*[a-z])/g)){
				statusBar.classList.add(`strength${1}`);
				strengthMessage.innerHTML = '<strong> poor 25% </strong>';
				strengthMessage.style.color = '#ff4545';
			}
			if(input.value.match(/[a-zA-Z]/g) &&
      input.value.match(/[0-9]/g) &&
      input.value.match(/([a-z],*[A-Z])|([A-Z],*[a-z])/g)){

				statusBar.classList.add(`strength${2}`);
				strengthMessage.innerHTML = '<strong> Weak 50% </strong>';
				strengthMessage.style.color = 'rgb(228, 32, 228)';
			}
			if(input.value.match(/[\!\@\#\$\%\^\&\*\_\~]/g) && input.value.match(/[a-zA-Z]/g) &&
      input.value.match(/[0-9]/g) &&
      input.value.match(/([a-z],*[A-Z])|([A-Z],*[a-z])/g)){

				statusBar.classList.add(`strength${4}`);
				strengthMessage.innerHTML = '<strong> great 100% </strong>';
				strengthMessage.style.color = '#008000';
			}
		}

		if(input.value.length === 6){
			if(input.value.match(/([a-z],*[A-Z])|([A-Z],*[a-z])/g)){
				statusBar.classList.add(`strength${1}`);
				strengthMessage.innerHTML = '<strong> poor 25% </strong>';
				strengthMessage.style.color = '#ff4545';
			}
			if(input.value.match(/[a-zA-Z]/g) &&
      input.value.match(/[0-9]/g) &&
      input.value.match(/([a-z],*[A-Z])|([A-Z],*[a-z])/g)){

				statusBar.classList.add(`strength${2}`);
				strengthMessage.innerHTML = '<strong> Weak 50% </strong>';
				strengthMessage.style.color = 'rgb(228, 32, 228)';
			}
			if(input.value.match(/[\!\@\#\$\%\^\&\*\_\~]/g) && input.value.match(/[a-zA-Z]/g) &&
      input.value.match(/[0-9]/g) &&
      input.value.match(/([a-z],*[A-Z])|([A-Z],*[a-z])/g)){

				statusBar.classList.add(`strength${3}`);
				strengthMessage.innerHTML = '<strong> great 75% </strong>';
				strengthMessage.style.color = 'ffc824';
			}
		}


		if(input.value.length < 6){
			statusBar.classList.add(`strength${1}`);
			strengthMessage.innerHTML = '<strong> poor, minimum password length is 6 </strong>';
			strengthMessage.style.color = 'red';
		}

		if(input.value.length > 12){
			statusBar.classList.add(`strength${1}`);
			strengthMessage.innerHTML = '<strong> too long, maximun password length is 12 </strong>';
			strengthMessage.style.color = 'orange';
		}

	}

	confirmValidityMessage() {

		this.inputNode.Validation.errorMessage = [];
		this.checkValidInput(this.inputNode);

		if ( this.inputNode.Validation.errorMessage.length === 0 && this.inputNode.value !== '' ) {
			this.inputNode.setCustomValidity('');
		} else {
			const message = this.inputNode.Validation.getErrorMessage();
			this.inputNode.setCustomValidity(message);
		}
	}

	addOnKeyListener() {

		const onInputValidation = this;

		this.inputNode.addEventListener('keyup', () => {
			onInputValidation.confirmValidityMessage();
		});


	}
}


const fullnameValidation = [
	{
		isInvalid(input) {
			return input.value.length < 3;
		},
		error: 'full name should be 3 characters at least'
	},
	{
		isInvalid(input) {
			if(input.value.match(/[^a-zA-Z0-9]/g)){
				return true;
			}else{
				return false;
			}
		},
		error: 'special characters can not be in your full name'
	}
];

const phoneNumberValidation = [
	{
		isInvalid(input) {
			return input.value.length !== 11;
		},
		error: 'mobile number should be 11 numbers starting with 0'
	},
	{
		isInvalid(input) {
			if(input.value.match(/[^[0]\d{10}$]/g)){
				return true;
			}else{
				return false;
			}
		},
		error: 'This is not a Nigerian mobile number'
	}
];

const confirmPhoneNumberValidation = [
	{
		isInvalid() {
			return confirmPhoneNumber.value != phoneNumber.value;
		},
		error: 'Phone numbers did not match the first one'
	}
];

const passwordValidation = [
	{
		isInvalid(input) {
			return input.value.length < 6;
		},
		error: 'Minimum password length is 6',
		element: document.querySelector('.info .checks li:nth-child(1)')
	},

	{
		isInvalid(input) {
			return input.value.length > 12;
		},
		error: 'Maximun password length is 12',
		element: document.querySelector('.info .checks li:nth-child(2)')
	},

	{
		isInvalid(input) {
			return !input.value.match(/[a-z]/g);
		},
		error: 'At least 1 lowercase letter required',
		element: document.querySelector('.info .checks li:nth-child(3)')
	},

	{
		isInvalid(input) {
			return !input.value.match(/[A-Z]/g);
		},
		error: 'At least 1 uppercase letter required',
		element: document.querySelector('.info .checks li:nth-child(4)')
	},

	{
		isInvalid(input) {
			return !input.value.match(/[0-9]/g);
		},
		error: 'At least 1 number required',
		element: document.querySelector('.info .checks li:nth-child(5)')
	},

	{
		isInvalid(input) {
			return !input.value.match(/[\!\@\#\$\%\^\&\*\_\~]/g);
		},
		error: 'At least one of the required special character',
		element: document.querySelector('.info .checks li:nth-child(6)')
	}
];

const confirmPasswordValidation = [
	{
		isInvalid() {
			return confirmPassword.value != password.value;
		},
		error: 'Password did not match the first one'
	}
];



const fullname = document.getElementById('signup-fullname');
const phoneNumber = document.getElementById('signup-phone');
const confirmPhoneNumber = document.getElementById('confirm-phone');
const password = document.getElementById('signup-password');
const confirmPassword = document.getElementById('confirm-password');

fullname.Validation = new Validation(fullname);
fullname.Validation.validInput = fullnameValidation;

phoneNumber.Validation = new Validation(phoneNumber);
phoneNumber.Validation.validInput = phoneNumberValidation;

confirmPhoneNumber.Validation = new Validation(confirmPhoneNumber);
confirmPhoneNumber.Validation.validInput = confirmPhoneNumberValidation;

password.Validation = new Validation(password);
password.Validation.validInput = passwordValidation;

confirmPassword.Validation = new Validation(confirmPassword);
confirmPassword.Validation.validInput = confirmPasswordValidation;


const inputs = document.querySelectorAll('.signup-input');


const submit = document.querySelector('input[type="submit"');

function validate() {
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].Validation.confirmValidityMessage();
	}
}
/**
* password dialog box
* to display password validity
* passes.
*/
const toggleError = document.getElementById('require');

password.addEventListener('focus',()=>{
	toggleError.classList.add('show');
});

password.addEventListener('blur',()=>{
	if(toggleError.classList.contains('show')){
		toggleError.classList.remove('show');
	}
});

submit.addEventListener('click', validate);


