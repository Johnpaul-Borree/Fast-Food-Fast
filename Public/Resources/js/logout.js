const logout = document.querySelector('.logout');

const signoutUser = () => {
	const logout = confirm('Are You Really Leaving?');
	if(logout){
		localStorage.removeItem('token');
		location.assign('index.html');
	}else {
		return false;
	}
};


logout.addEventListener('click', signoutUser);
