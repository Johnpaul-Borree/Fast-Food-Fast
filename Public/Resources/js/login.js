
const login = document.querySelector('.loginForm');

const userLogin = (evt) => {
	evt.preventDefault();
	const email = document.getElementById('signin-email').value;
	const password = document.getElementById('signin-password').value;

	const loginMessage = document.querySelector('.login > .error');
	fetch('https://fast-food-fast-johnpaul.herokuapp.com/api/v1/auth/login', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	})
		.then((res) => res.json())
		.then((data) => {
			const status = data.status;
			const message = data.message;
			if(status === 'failed') {
				if(message === 'invalid Email or Password') {
					loginMessage.classList.add('visible');
					loginMessage.innerHTML = message;
					document.getElementById('signin-email').style.borderColor = 'red';
					return;
				}
				return;
			}

			const jwtDecode = (t) => {
				let token = {};
				token.raw = t;
				token.header = JSON.parse(window.atob(t.split('.')[0]));
				token.payload = JSON.parse(window.atob(t.split('.')[1]));
				return (token);
			};
			const { token } = data;
			localStorage.setItem('token', token);
			const storedToken = localStorage.getItem('token');
			const decoded = jwtDecode(storedToken);
			if (!decoded.payload.admin) {
				location.assign('views.html');
			} else {
				location.assign('admin.html');
			}
		})
		.catch(err => err);
};

login.addEventListener('submit', userLogin);
