
const signin = document.querySelector('.signup');

const userSignUp = (evt) => {
	evt.preventDefault();
	const fullName = document.getElementById('signup-fullname').value;
	const email = document.getElementById('signup-email').value;
	const phoneNumber = document.getElementById('signup-phone').value;
	const confirmPhoneNumber = document.getElementById('confirm-phone').value;
	const password = document.getElementById('signup-password').value;
	const confirmPassword = document.getElementById('confirm-password').value;

	const messageBody = document.querySelector('.signin-modal-block > .error');

	fetch('https://fast-food-fast-johnpaul.herokuapp.com/api/v1/auth/signup', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			name: fullName,
			email: email,
			phoneNumber: phoneNumber,
			confirmPhone: confirmPhoneNumber,
			password: password,
			confirmPassword: confirmPassword
		})
	})
		.then((res) => res.json())
		.then((data) => {
			const status = data.status;
			const message = data.message;

			if(status === 'failed') {
				if(message === 'email exist') {
					messageBody.classList.add('visible');
					messageBody.innerHTML = `${data.email} Already exist in the database`;
					document.getElementById('signup-email').style.borderColor = 'red';
					return;
				}
				return;
			}
			const { token } = data;
			localStorage.setItem('token', token);
			location.assign('views.html');
		})
		.catch(err => err);
};

signin.addEventListener('submit', userSignUp);
