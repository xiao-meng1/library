const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addBookEvent);

const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const readInput = document.querySelector("#read-input");

let myLibrary = [];

function addBookEvent() {
    const formFilled = validateNewBookForm();

    if (formFilled === false) {
        return;
    }

    const newBook = createNewBook();
    myLibrary.push(newBook);
    bookElement = createBookElement(newBook);
    addBookElementToDOM(bookElement);
    clearNewBookInputs();
}

function createNewBook() {
    const newBook = new Book(titleInput.value, authorInput.value, 
                                pagesInput.value, readInput.checked);
    return newBook;
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

function createBookElement(newBook) {
    const bookNumber = Number(myLibrary.length);

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

    book.dataset.bookNumber = `${bookNumber}`;
    book.classList = "book border";
    title.textContent = newBook.title;
    author.textContent = newBook.author;
    pages.textContent = newBook.numberOfPages;
    labelCheckboxContainer.classList = "label-checkbox-container";
    label.textContent = "Read?";
    label.setAttribute("for", `read-book-${bookNumber}`);
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `read-book-${bookNumber}`);
    input.checked = newBook.read;
    button.textContent = "Remove";
    button.dataset.bookNumber = `${bookNumber}`;

    console.log(readInput.checked);
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