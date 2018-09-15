//Login Script

const signin = document.querySelector('.signin-form');

function redirect() {
    window.location = 'views.html';
}

    signin.addEventListener('submit', function(evt){
        evt.preventDefault();
        redirect();
    });