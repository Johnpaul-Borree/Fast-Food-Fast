//Responsive design

const menu = document.querySelector('.menu-toggle');

const toggleNav = (element,data1,data2) =>{
    element = document.querySelector(element);
    element.setAttribute('data-mode', element.getAttribute('data-mode') === data1 ? data2 : data1);
};

menu.addEventListener('click', (event)=>{
toggleNav('.wrapper > ul','close','open');
event.preventDefault();
});