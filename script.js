
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
    // this.info = function() {
    //     return title + " by " + author + ", " + pages + " pages, " + read 
    // } 
}

// DOM Objects to be manipulated
const form = document.querySelector("form");    
const bookList = document.getElementById("library");
const table = document.querySelector(".table");
// const tableBody = table.querySelector(".tbody");
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
    if(document.getElementById("read").value == "Read") return true;
    else return false;
}

function createStatusCell(book) {
    let statusCell = document.createElement("td");
    if(document.getElementById("read").value == "Read") {
    statusCell.textContent = "Read"
};
}

// Loops through array and builds table

function buildTable() {
    // table.textContent = "";
    myLibrary.forEach((book, index) => {
        let newRow = document.createElement("tr");
        Object.keys(book).forEach(prop => {     // ? What is this?
            let newData = document.createElement("td");
            newData.textContent = book[prop];
            newRow.appendChild(newData);
        })
        tableBody.appendChild(newRow);
    })
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
    // if (newStatus[0].checked == true) {
    //     entry = new Book(newBook, newAuthor, newPages, newStatus);
    // }
    // else {entry = new Book(newBook, newAuthor, newPages, newStatus);
    // };
    entry = new Book(newBook.value, newAuthor.value, newPages.value);
    myLibrary.push(entry);
    // localStorage.setItem("books", JSON.stringify(myLibrary));
    console.log(newBook.value);
    console.log(newAuthor.value);
    console.log(newPages.value);
    buildTable();
    setTimeout(() => closeForm(), 300);
    
    // console.log(newStatus);
          
    }


    