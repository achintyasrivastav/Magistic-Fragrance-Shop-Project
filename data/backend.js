const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
})

xhr.open('GET', 'http://localhost:3003/productlist');
xhr.send();
