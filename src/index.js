import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  getDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import './styles.css';

const firebaseConfig = {
  apiKey: 'AIzaSyBjQTENk3c-NJv2owuUZ9ec5kWfu-5JB7E',
  authDomain: 'library-36af4.firebaseapp.com',
  projectId: 'library-36af4',
  storageBucket: 'library-36af4.appspot.com',
  messagingSenderId: '637605676391',
  appId: '1:637605676391:web:9b17d830119df87ab19bc2',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addButton = document.querySelector('#add-button');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input');
const readInput = document.querySelector('#read-input');

const myLibraryQuery = query(
  collection(db, 'myLibrary'),
  orderBy('timestamp', 'asc')
);
onSnapshot(myLibraryQuery, renderDOMBooks);

let DOMdocRefs = [];

function addAddNewBookFormEvents() {
  addButton.addEventListener('click', addBookEvent);
  titleInput.addEventListener('input', () => {
    if (!titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('');
    }
  });
  authorInput.addEventListener('input', () => {
    if (!authorInput.validity.valueMissing) {
      authorInput.setCustomValidity('');
    }
  });
  pagesInput.addEventListener('input', () => {
    if (!pagesInput.validity.valueMissing) {
      pagesInput.setCustomValidity('');
    }
  });
}

async function addBookEvent() {
  const formFilled = validateNewBookForm();

  if (formFilled === false) {
    return;
  }

  const newBook = createNewBook();

  addDoc(collection(db, 'myLibrary'), {
    title: newBook.title,
    author: newBook.author,
    numberOfPages: newBook.numberOfPages,
    read: newBook.read,
    timestamp: serverTimestamp(),
  });

  clearNewBookInputs();
}

class Book {
  constructor(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
  }
  toggleRead = async (bookNumber) => {
    const bookDocRef = DOMdocRefs[bookNumber];
    const docSnapshot = await getDoc(bookDocRef);
    updateDoc(bookDocRef, {
      read: !docSnapshot.data().read,
    });
  };
  delete = async (bookNumber) => {
    const bookDocRef = DOMdocRefs[bookNumber];
    const book = document.querySelector(`[data-book-number="${bookNumber}"]`);
    book.remove();
    await deleteDoc(bookDocRef);
  };
}

function createNewBook() {
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked
  );
  return newBook;
}

function validateNewBookForm() {
  if (pagesInput.validity.valueMissing) {
    pagesInput.setCustomValidity('This field is required');
    pagesInput.reportValidity();
  }

  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity('This field is required');
    authorInput.reportValidity();
  }

  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('This field is required');
    titleInput.reportValidity();
  }

  return titleInput.value === '' ||
    authorInput.value === '' ||
    pagesInput.value === ''
    ? false
    : true;
}

function createBookElement(newBook) {
  const bookNumber = Number(DOMdocRefs.length);

  const book = document.createElement('div');
  const title = document.createElement('h2');
  const author = document.createElement('h3');
  const pages = document.createElement('h4');
  const labelCheckboxContainer = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const button = document.createElement('button');

  labelCheckboxContainer.appendChild(label);
  labelCheckboxContainer.appendChild(input);
  book.appendChild(title);
  book.appendChild(author);
  book.appendChild(pages);
  book.appendChild(labelCheckboxContainer);
  book.appendChild(button);

  book.dataset.bookNumber = `${bookNumber}`;
  book.classList = 'book border';
  title.textContent = newBook.title;
  author.textContent = newBook.author;
  pages.textContent = `${newBook.numberOfPages} pages`;
  labelCheckboxContainer.classList = 'label-checkbox-container';
  label.textContent = 'Read?';
  label.setAttribute('for', `read-book-${bookNumber}`);
  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', `read-book-${bookNumber}`);
  input.checked = newBook.read;
  button.textContent = 'Remove';

  input.addEventListener('change', () => {
    newBook.toggleRead(bookNumber);
  });

  button.addEventListener('click', () => {
    newBook.delete(bookNumber);
  });

  return book;
}

function renderDOMBooks(querySnapshot) {
  const booksContainer = document.querySelector('#books-container');

  while (booksContainer.lastChild) {
    booksContainer.removeChild(booksContainer.lastChild);
  }

  querySnapshot.forEach((doc) => {
    const newBook = new Book(
      doc.data().title,
      doc.data().author,
      doc.data().numberOfPages,
      doc.data().read
    );
    const bookElement = createBookElement(newBook);
    booksContainer.appendChild(bookElement);
    DOMdocRefs.push(doc.ref);
  });
}

function clearNewBookInputs() {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readInput.checked = false;
}

addAddNewBookFormEvents();
