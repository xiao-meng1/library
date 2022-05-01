const addButton = document.querySelector("#add-button");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const readInput = document.querySelector("#read-input");

addButton.addEventListener("click", addBookEvent);

let myLibrary = [];

function addBookEvent() {
    const formFilled = validateNewBookForm();

    if (formFilled === false) {
        return;
    }

    addBookToLibrary();
    clearNewBookInputs();
    bookElement = createBookElement();
    addBookElementToDOM(bookElement);
}

function addBookToLibrary() {
    const newBook = new Book(titleInput.value, authorInput.value, 
                                pagesInput.value, readInput.value);
    myLibrary.push(newBook);
}

function validateNewBookForm() {
    return (titleInput.value === "" || authorInput.value === ""
            || pagesInput.value === "") ? false : true;
}

function clearNewBookInputs () {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
}

function createBookElement() {
    const book = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const pages = document.createElement("h4");
    const labelCheckboxContainer = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const button = document.createElement("button");
    
    labelCheckboxContainer.appendChild(label);
    labelCheckboxContainer.appendChild(input);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(labelCheckboxContainer);
    book.appendChild(button);

    book.dataset.bookNumber = "index";
    book.classList = "book border";
    title.textContent = "Title";
    author.textContent = "Author";
    pages.textContent = "x page";
    labelCheckboxContainer.classList = "label-checkbox-container";
    label.textContent = "Read?";
    label.setAttribute("for", "read-book-index");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "read-book-index");
    button.textContent = "Remove";

    return book;
}

function addBookElementToDOM(bookElement) {
    const booksContainer = document.querySelector("#books-container");
    booksContainer.appendChild(bookElement);
}


function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}