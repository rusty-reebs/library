// TODO change status
// TODO form cancel button, reset

let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: "295",
        read: false
    },
    {
        title: "A Game of Thrones",
        author: "George R.R. Martin",
        pages: "670",
        read: true
    }
];

// Object constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// DOM Objects to be manipulated
const form = document.querySelector("form");    
const bookList = document.getElementById("library");
const table = document.querySelector(".table");
const tableBody = document.getElementById("tablebody");
const newBook = document.getElementById("title");
const newAuthor = document.getElementById("author");
const newPages = document.getElementById("pages");


// Populate local storage
function addtoStorage() {
    localStorage.setItem("books", JSON.stringify(myLibrary));
}

function getFromStorage() {
    myLibrary = JSON.parse(localStorage.getItem("books"));
}

function getStatus() {
    if(document.getElementById("read").checked == true) return true;
    else return false;
}

function createStatusButton(book) {
    let statusBtnCell = document.createElement("td");
    let statusBtn = document.createElement("button");
    statusBtn.className = "bookbutton";
    statusBtn.textContent = "Change Status";
    statusBtnCell.appendChild(statusBtn);
    return statusBtnCell;
}

function deleteBookButton(index) {
    let delBtnCell = document.createElement("td");
    let delBtn = document.createElement("button");
    delBtn.className = "bookbutton";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        buildTable();
    })
    delBtnCell.appendChild(delBtn);
    return delBtnCell;
}

// Loops through array and builds table

function buildTable() {
    tableBody.textContent = ""; // clears everything before build
    myLibrary.forEach((book, index) => {
        let newRow = document.createElement("tr");
        newRow.dataset.value = index; // assigns value=index, to be used for removing books, unnecessary?
        Object.keys(book).forEach(prop => {     // ? What is this?
            let newData = document.createElement("td");
            newData.textContent = book[prop];
            if (prop == "read") {
                newData.textContent = book[prop] ? "Read" : "Not Read"; // ? What is this?
            }
            newRow.appendChild(newData);
        });
        newRow.appendChild(createStatusButton(book));
        newRow.appendChild(deleteBookButton(index));
        tableBody.appendChild(newRow);
    });
}

    
// Pop up form functions
function openForm() {
    document.getElementById("popupform").style.display = "block";
}
function closeForm() {
    document.getElementById("popupform").style.display = "none";
    newBook.value = "";
    newAuthor.value = "";
    newPages.value = "";
}

form.addEventListener("submit", function (e) { // stops refresh
    e.preventDefault();
});

function submitForm() {
    let newStatus = getStatus();
    entry = new Book(newBook.value, newAuthor.value, newPages.value, newStatus);
    myLibrary.push(entry);

    // localStorage.setItem("books", JSON.stringify(myLibrary));
    console.log(newBook.value);
    console.log(newAuthor.value);
    console.log(newPages.value);
    console.log(newStatus);
    buildTable();
    setTimeout(() => closeForm(), 300);
    }

buildTable();



    