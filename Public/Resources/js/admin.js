//Create Meals modal

const modalBox = document.querySelector('.post-meal-modal');
const trigger = document.querySelector('.add-meals');
const close = document.querySelector('.close-button');

function toggleModal() {
	modalBox.classList.toggle('show-modal');
}

function windowOnClick(event) {
	if (event.target === modalBox) {
		toggleModal();
	}
}

const postMeal = document.querySelector('.post-meal-input');

trigger.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dahddvlgy/upload';
const CLOUDINARY_UPLOAD_PRESET = 'l9iyner1';
const image = document.getElementById('image-file');
let imageUrl;

image.addEventListener('change', (event) => {
	const file = event.target.files[0];
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

	axios({
		url: CLOUDINARY_URL,
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: formData
	}).then((imgRes) => {
		console.log(imgRes);
		imageUrl = imgRes.data.secure_url;
	}).catch(err => console.log(err));
});

const postMenu = (evt) => {
	evt.preventDefault();
	const name = document.getElementById('name').value;
	const description = document.getElementById('meal-description').value;
	const price = document.getElementById('price').value;
	const token = localStorage.getItem('token');

	const messageBody = document.querySelector('.post-meal-input > .error');

	fetch('https://fast-food-fast-johnpaul.herokuapp.com/api/v1/menu', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json',
			'x-auth-token': token
		},
		body: JSON.stringify({
			name: name,
			description: description,
			image: imageUrl,
			price: price
		})
	})
		.then((res) => res.json())
		.then((data) => {
			const status = data.status;
			const message = data.message;

			if(status === 'failed') {
				if(message === 'item exist') {
					messageBody.classList.add('visible');
					messageBody.innerHTML = `${data.name} Already exist in the database`;
					document.getElementById('name').style.borderColor = 'red';
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
			const storedToken = token;
			const decoded = jwtDecode(storedToken);
			if (!decoded.payload.admin) {
				messageBody.classList.add('visible');
				messageBody.innerHTML = message;
			} else {
				// location.assign('menu.html');
				console.log(data);
			}
		})
		.catch(err => err);
};

postMeal.addEventListener('submit', postMenu);

