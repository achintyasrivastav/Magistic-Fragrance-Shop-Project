const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:3000');
xhr.send();

xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.responseText);
    } else {
      console.error('Request failed. Status:', xhr.status);
    }
  };
  
  xhr.onerror = function() {
    console.error('Network error occurred.');
};
  
fetch('http://localhost:3000/menu')
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
