const logout = document.querySelector('.logout');

const signoutUser = () => {
	const logout = confirm('Logout from Fast Food?');
	if(logout){
		localStorage.removeItem('token');
		location.assign('index.html');
	}else {
		return false;
	}
};


logout.addEventListener('click', signoutUser);
