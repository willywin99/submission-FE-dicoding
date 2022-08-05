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
  } else {
    green.innerText = 'Selesai dibaca';
  }

  const red = document.createElement('button');
  red.classList.add('red');
  red.setAttribute('id', `book-${bookObject.id}`);
  red.innerText = 'Hapus Buku';

  action.append(green, red);

  const article = document.createElement('article');
  article.classList.add('book_item');
  article.append(textTitle, textAuthor, textYear, action);

  return article;
}
