const addButton = document.querySelector("#add-button");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const readInput = document.querySelector("#read-input");

let myLibrary = [];

function addAddNewBookFormEvents() {
    addButton.addEventListener("click", addBookEvent);
    titleInput.addEventListener("input", () => {
        if (!titleInput.validity.valueMissing) {
            titleInput.setCustomValidity("");
        }
    });
    authorInput.addEventListener("input", () => {
        if (!authorInput.validity.valueMissing) {
            authorInput.setCustomValidity("");
        }
    });
    pagesInput.addEventListener("input", () => {
        if (!pagesInput.validity.valueMissing) {
            pagesInput.setCustomValidity("");
        }
    });
}

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
    if (pagesInput.validity.valueMissing) {
        pagesInput.setCustomValidity("This field is required");
        pagesInput.reportValidity();
    }

    if (authorInput.validity.valueMissing) {
        authorInput.setCustomValidity("This field is required");
        authorInput.reportValidity();
    }

    if (titleInput.validity.valueMissing) {
        titleInput.setCustomValidity("This field is required");
        titleInput.reportValidity();
    }

    return (titleInput.value === "" || authorInput.value === ""
            || pagesInput.value === "") ? false : true;
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
    pages.textContent = `${newBook.numberOfPages} pages`;
    labelCheckboxContainer.classList = "label-checkbox-container";
    label.textContent = "Read?";
    label.setAttribute("for", `read-book-${bookNumber}`);
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `read-book-${bookNumber}`);
    input.checked = newBook.read;
    button.textContent = "Remove";

    input.addEventListener("change", () => {
        newBook.toggleRead(bookNumber);
    });

    button.addEventListener("click", () => {
        newBook.delete(bookNumber);
    });

    return book;
}

function addBookElementToDOM(bookElement) {
    const booksContainer = document.querySelector("#books-container");
    booksContainer.appendChild(bookElement);
}

function clearNewBookInputs () {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
}

class Book {
    constructor(title, author, numberOfPages, read) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.read = read;
    }
    toggleRead = (bookNumber) => {
        const bookInLibrary = myLibrary[bookNumber - 1];
        bookInLibrary.read = !(bookInLibrary.read);
    }
    delete = (bookNumber) => {
        const book = document.querySelector(`[data-book-number="${bookNumber}"]`);
        book.remove();
        myLibrary.splice(bookNumber - 1, 1);
    }
}

addAddNewBookFormEvents();