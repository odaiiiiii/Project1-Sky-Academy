

document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.getElementById("navbar");
    fetch('./navBar/nav.html')
        .then(response => response.text())
        .then(data => {
            navbar.innerHTML = data;
        })
        .catch(error => console.log('Error loading navbar:', error));
});
