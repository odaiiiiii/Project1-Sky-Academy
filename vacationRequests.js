

 let currentPage = 1;
const cardsPerPage = 18;
let data = [];

function loadCards() {
    fetch('./data.json')
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            renderCards();
        })
        .catch(error => console.error('Error:', error));
}

function renderCards() {
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const cardContainer = document.getElementById('card-container');
    const cardContainerComputer = document.getElementById('card-container-computer');
    
    cardContainer.innerHTML = '';
    cardContainerComputer.innerHTML = '';

    // Add cards to mobile 
    data.slice(start, end).forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-VacationPage cardSearch col-lg-3 col-md-4 col-sm-5 col-9 shadow-boxes ';
        card.innerHTML = `
            <div>
                <input class="form-check-input checkBox-card" type="checkbox" value="">
                <img src=${item.image}>
                <p>${item.name}</p>
            </div>
            <div class="card-detailes">
                <span class="title1">Submitted on:</span> <br>
                <span class="subtitle1">${item.submittedOn}</span>
            </div>
            <div class="card-detailes">
                <span class="title1">Duration:</span> <br>
                <span class="subtitle1">${item.duration}</span>
            </div>
            <div class="card-detailes">
                <span class="title1">Salary:</span> <br>
                <span class="subtitle1">${item.salary}</span>
            </div>
            <div class="row buttons">
                <button type="button" class="btn btn-outline-success text-success col-lg-5">Decline</button>
                <button type="button" class="btn btn-success text-white col-lg-5">Approve</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    // Add cards to computer 
    data.slice(start, end).forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-VacationPage-computer cardSearch col-lg-4 col-md-4 col-sm-5 col-9 shadow-boxes';
        card.innerHTML = `
            <div class="div1-card-VacationPage-computer">
                <input class="form-check-input checkBox-card" type="checkbox" value="">
                <img src=${item.image}>
                <span>${item.name}</span>
            </div>
            <div class="card-detailes-computer col-lg-12">
                <span class="title1">Submitted on:</span> <br>
                <span class="subtitle1">${item.submittedOn}</span>
            </div>
            <div class="card-detailes-computer col-lg-6">
                <span class="title1">Duration:</span> <br>
                <span class="subtitle1">${item.duration}</span>
            </div>
            <div class="card-detailes-computer">
                <span class="title1">Salary:</span> <br>
                <span class="subtitle1">${item.salary}</span>
            </div>
            <div class="buttons-computer col-lg-3">
                <button type="button" class="btn btn-success text-white col-lg-12">Approve</button>
                <button type="button" class="btn btn-outline-danger text-danger col-lg-12">Decline</button>
            </div>
        `;
        cardContainerComputer.appendChild(card);
    });

    // Update pagination controls
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(data.length / cardsPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('button');
        pageNumber.className = 'btn btn-outline-secondary  noneBorder numBage';
        pageNumber.innerText = i;
        pageNumber.disabled = (i === currentPage);
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            renderCards();
        });
        pageNumbers.appendChild(pageNumber);
    }

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderCards();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCards();
        }
    });
}

// Load cards when the page is ready
document.addEventListener('DOMContentLoaded', loadCards);



/* Filter Card */

    function filterCards(){
        const searchInput  = document.getElementById("searchInput").value.toLowerCase();
        const cards  = document.querySelectorAll('.cardSearch');

        cards.forEach(card=>{

            const textLower = card.textContent.toLocaleLowerCase();  // textContent ==>  html  تُستخدم للحصول على النص الموجود داخل عنصر 

            if(textLower.includes(searchInput)){
                card.classList.remove('hidden');

            }
            else{
                card.classList.add('hidden')
            }
        })
    }


    //  select-all check
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.addEventListener('change', () => {
        const checkboxes = document.querySelectorAll('.checkBox-card');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });