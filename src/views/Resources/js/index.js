const menu = document.querySelector('.menu-toggle');

const toggleNav = (element,data1,data2) =>{
	element = document.querySelector(element);
	element.setAttribute('data-mode', element.getAttribute('data-mode') === data1 ? data2 : data1);
};

menu.addEventListener('click', (event)=>{
	toggleNav('.wrapper > ul','close','open');
	event.preventDefault();
});

//Login and signup

class ModalSignin {
	constructor(element) {
		this.element = element;
		this.blocks = this.element.getElementsByClassName('js-signin-modal-block');
		this.switchers = this.element.getElementsByClassName('js-signin-modal-switcher')[0].getElementsByTagName('a');
		this.triggers = document.getElementsByClassName('js-signin-modal-trigger');
		this.init();
	}

	init() {
		const self = this;
		//open modal and switch form
		for(let i =0; i < this.triggers.length; i++) {
			self.triggers[i].addEventListener('click', event => {
				if( event.target.hasAttribute('data-signin') ) {
					event.preventDefault();
					self.showSigninForm(event.target.getAttribute('data-signin'));
				}
			});
		}

		//close modal
		this.element.addEventListener('click', event => {
			if( hasClass(event.target, 'js-signin-modal') || hasClass(event.target, 'js-close') ) {
				event.preventDefault();
				removeClass(self.element, 'signin-modal--is-visible');
			}
		});
		//close modal when clicking the esc keyboard button
		document.addEventListener('keydown', event => {
			(event.which=='27') && removeClass(self.element, 'signin-modal--is-visible');
		});

	}

	showSigninForm(type) {
		// show modal if not visible
		!hasClass(this.element, 'signin-modal--is-visible') && addClass(this.element, 'signin-modal--is-visible');
		// show selected form
		for( let i=0; i < this.blocks.length; i++ ) {
			this.blocks[i].getAttribute('data-type') == type ? addClass(this.blocks[i], 'signin-modal-block--is-selected') : removeClass(this.blocks[i], 'signin-modal-block--is-selected');
		}
		//update switcher appearance
		const switcherType = (type == 'signup') ? 'signup' : 'login';
		for( let i=0; i < this.switchers.length; i++ ) {
			this.switchers[i].getAttribute('data-type') == switcherType ? addClass(this.switchers[i], 'selected') : removeClass(this.switchers[i], 'selected');
		}
	}

}

const signinModal = document.getElementsByClassName('js-signin-modal')[0];
if( signinModal ) {
	new ModalSignin(signinModal);
}


function hasClass(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}
function addClass(el, className) {
	const classList = className.split(' ');
	if (el.classList) el.classList.add(classList[0]);
	else if (!hasClass(el, classList[0])) el.className += ` ${classList[0]}`;
	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
}
function removeClass(el, className) {
	const classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);
	else if(hasClass(el, classList[0])) {
		const reg = new RegExp(`(\\s|^)${classList[0]}(\\s|$)`);
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
}

const signin = document.querySelector('.signin-modal-form');

function redirect() {
	window.location = 'UI/order.html';
}


const user = (evt) => {
	evt.preventDefault();
	const fullName = document.getElementById('signup-fullname').value;
	const email = document.getElementById('signup-email').value;
	const phoneNumber = document.getElementById('signup-phone').value;
	const confirmPhoneNumber = document.getElementById('confirm-phone').value;
	const password = document.getElementById('signup-password').value;
	const confirmPassword = document.getElementById('confirm-password').value;
	const sayWelcome = document.querySelector('.welcome');

	console.log(fullName, email, phoneNumber, confirmPhoneNumber, password, confirmPassword);

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
      const { token } = data;
      const anotherToken = data.token;
      localStorage.clear();
      localStorage.setItem('token', token);
      localStorage.setItem('anotherToken', 'myToken');
      // sayWelcome.innerHTML = JSON.parse(window.localStorage.getItem('userResponse')).token;
			console.log(data);
		})
		.catch(err => console.log(err));
};

// for (let i = 0; i < signin.length; i++) {
// 	signin[i].addEventListener('submit', function(evt){
// 		evt.preventDefault();
// 		redirect();
// 	});
// }

signin.addEventListener('submit', user);
