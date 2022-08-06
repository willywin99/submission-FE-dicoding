const books = [];
const RENDER_EVENT = 'render-book'

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addBook();
  });

  // check storage
  // if (isStorageExist()) {
  //   loadDataFromStorage();
  // }
});

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  }
}

function isCompleteCheck() {
  let checkbox = document.getElementById('inputBookIsComplete').checked;
  return checkbox;
}

function addBook() {
  const generateID = generateId();
  const bookTitle = document.getElementById('inputBookTitle').value;
  const bookAuthor = document.getElementById('inputBookAuthor').value;
  const bookYear = document.getElementById('inputBookYear').value;
  // const bookIsComplete = document.getElementById('inputBookIsComplete').value;
  const bookIsComplete = isCompleteCheck();

  const bookObject = generateBookObject(generateID, bookTitle, bookAuthor, bookYear, bookIsComplete);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  // saveData();

  console.log(books);
}

document.addEventListener(RENDER_EVENT, function () {
  const incompleteBOOKList = document.getElementById('incompleteBookshelfList');
  incompleteBOOKList.innerHTML = '';

  const completeBOOKList = document.getElementById('completeBookshelfList');
  completeBOOKList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isComplete) {
      incompleteBOOKList.append(bookElement);
    } else {
      completeBOOKList.append(bookElement);
    }
  }
});

function makeBook(bookObject) {
  const textTitle = document.createElement('h3');
  textTitle.innerText = bookObject.title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = 'Penulis: ';
  textAuthor.innerText += bookObject.author;

  const textYear = document.createElement('p');
  textYear.innerText = 'Tahun: ';
  textYear.innerText += bookObject.year;

  const action = document.createElement('div');
  action.classList.add('action');

  const green = document.createElement('button')
  green.classList.add('green');
  green.setAttribute('id', `book-${bookObject.id}`);
  // green.innerText = '';
  
  if (bookObject.isComplete) {
    green.innerText = 'Belum Selesai dibaca';

    green.addEventListener('click', function () {
      addBookToIncomplete(bookObject.id);
    });
  } else {
    green.innerText = 'Selesai dibaca';

    green.addEventListener('click', function () {
      addBookToComplete(bookObject.id);
    });
  }

  const red = document.createElement('button');
  red.classList.add('red');
  red.setAttribute('id', `book-${bookObject.id}`);
  red.innerText = 'Hapus Buku';

  red.addEventListener('click', function () {
    removeBook(bookObject.id);
  });

  action.append(green, red);

  const article = document.createElement('article');
  article.classList.add('book_item');
  article.append(textTitle, textAuthor, textYear, action);

  return article;
}

function addBookToComplete (bookId) {
  const bookTarget = findBook(bookId);
  // console.log(bookTarget);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  // saveData();
}

function addBookToIncomplete (bookId) {
  const bookTarget = findBook(bookId);
  // console.log(bookTarget);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  // saveData();
}

function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  // saveData();
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

function findBook (bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}
