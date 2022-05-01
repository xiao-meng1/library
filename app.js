const addButton = document.querySelector("#add-button");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const readInput = document.querySelector("#read-input");

handleEvents();

let myLibrary = [];

function handleEvents() {
    addButton.addEventListener("click", addBookToLibrary);
}

function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

function addBookToLibrary() {
    const formFilled = validateNewBookForm();

    if (formFilled === false) {
        return;
    }

    const newBook = new Book(titleInput.value, authorInput.value, 
                                pagesInput.value, readInput.value);
    myLibrary.push(newBook);
    clearNewBookInputs();
}

function validateNewBookForm() {
    return (titleInput.value === "" || authorInput.value === ""
            || pagesInput.value === "") ? false : true;
}

function clearNewBookInputs () {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.value = "";
}