document.addEventListener('DOMContentLoaded', function(){

    const list = document.querySelector('#book-list ul');
    const forms = document.forms;
  
    // delete books
    list.addEventListener('click', (e) => {
      if(e.target.className == 'delete'){
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
      }
    });
  
    // add books
    const addForm = forms['add-book'];
    addForm.addEventListener('submit', function(e){
      e.preventDefault();
  
      // create elements
      const value = addForm.querySelector('input[type="text"]').value;
      const li = document.createElement('li');
      const bookName = document.createElement('span');
      const deleteBtn = document.createElement('span');
  
      // add text content
      bookName.textContent = value;
      deleteBtn.textContent = 'delete';
  
      // add classes
      bookName.classList.add('name');
      deleteBtn.classList.add('delete');
  
      // append to DOM
      li.appendChild(bookName);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  
    // hide books
    const hideBox = document.querySelector('#hide');
    hideBox.addEventListener('change', function(e){
      if(hideBox.checked){
        list.style.display = "none";
      } else {
        list.style.display = "initial";
      }
    });
  
    // filter books
    const searchBar = forms['search-books'].querySelector('input');
    searchBar.addEventListener('keyup', (e) => {
      const term = e.target.value.toLowerCase();
      const books = list.getElementsByTagName('li');
      Array.from(books).forEach((book) => {
        const title = book.firstElementChild.textContent;
        if(title.toLowerCase().indexOf(e.target.value) != -1){
          book.style.display = 'block';
        } else {
          book.style.display = 'none';
        }
      });
    });
  
    // tabbed content
    const tabs = document.querySelector('.tabs');
    const panels = document.querySelectorAll('.panel');
    tabs.addEventListener('click', (e) => {
      if(e.target.tagName == 'LI'){
        const targetPanel = document.querySelector(e.target.dataset.target);
        Array.from(panels).forEach((panel) => {
          if(panel == targetPanel){
            panel.classList.add('active');
          }else{
            panel.classList.remove('active');
          }
        });
      }
    });
  
  })

  document.addEventListener('DOMContentLoaded', function () {
    const booksList = document.getElementById('book-list'); // Updated selector
    const addBookForm = document.getElementById('add-book');
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter');

    // Event listener for adding a book
    addBookForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const bookName = document.getElementById('book-name').value;
        addBook(bookName);
        document.getElementById('book-name').value = ''; // Clear input field
    });

    // Event listener for rating a book
    booksList.addEventListener('change', function (e) {
        if (e.target.classList.contains('rating-input')) {
            const rating = parseInt(e.target.value);
            const bookName = e.target.parentElement.parentElement.querySelector('.name').textContent;
            // Handle the rating, you can save it to a database or perform any other action
            console.log(`Rating for "${bookName}": ${rating}`);
        }
    });

    // Event listener for filtering books
    filterSelect.addEventListener('change', filterBooks);

    // Function to add a new book to the list
    function addBook(bookName) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="name">${bookName}</span>
            <span class="rating">
                <input type="number" min="1" max="5" placeholder="Rate book" class="rating-input">
            </span>
            <span class="delete">delete</span>
        `;
        booksList.querySelector('ul').appendChild(li); // Corrected selector
    }

    // Function to filter books based on the selected genre
    function filterBooks() {
        const selectedGenre = filterSelect.value;
        const books = booksList.querySelectorAll('ul li');

        Array.from(books).forEach(book => {
            const genre = book.dataset.genre.toLowerCase(); // Use lowercase for consistency
            if (selectedGenre === 'all' || genre === selectedGenre) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    }
});