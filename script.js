
let myLibrary = [
    {
        title: "Harry Potter and the Prisoner of JavaScript",
        author: "J.K. Rowling",
        pages: "469",
        read: false
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

// Returns read status as true/false value
function getStatus() {
    if(document.getElementById("read").checked == true) return true;
    else return false;
}

// Creates Change Status button and changes object property when clicked
function createStatusButton(book) {
    let statusBtnCell = document.createElement("td");
    let statusBtn = document.createElement("button");
    statusBtn.className = "bookbutton";
    statusBtn.textContent = "Change Status";
    statusBtn.addEventListener("click", () => {
        book.read = !book.read; // changes true/false of read prop
        buildTable();
    })
    statusBtnCell.appendChild(statusBtn);
    return statusBtnCell;
}

// Creates Delete button and removes index when clicked
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
    myLibrary.forEach((book, index) => {  // uses the value and the index of the current element
        let newRow = document.createElement("tr");
        Object.keys(book).forEach(prop => {   // returns an array of property names and initiates callback function for each property
            let newData = document.createElement("td");
            newData.textContent = book[prop]; // text equals the value of the property
            if (prop == "read") {  // if the property is "read", then do this
                newData.textContent = book[prop] ? "Read" : "Not Read"; // if "read" property is true, then text is "Read", else "Not Read"
            }
            newRow.appendChild(newData);
        });
        newRow.appendChild(createStatusButton(book));
        newRow.appendChild(deleteBookButton(index));
        tableBody.appendChild(newRow);
    });
    addtoStorage();
}

// Pop up form functions
function openForm() {
    document.getElementById("popupform").style.display = "block"; // makes form appear
}
function closeForm() {
    document.getElementById("popupform").style.display = "none"; // makes form disappear
    newBook.value = ""; // clears fields
    newAuthor.value = "";
    newPages.value = "";
    document.getElementById("read").checked = true; // resets radio button
}

form.addEventListener("submit", function (e) { // stops refresh
    e.preventDefault();
});

// Uses values from form to create new Book object and push to array
function submitForm() {
    let newStatus = getStatus(); // sets variable to true or false
    entry = new Book(newBook.value, newAuthor.value, newPages.value, newStatus);
    myLibrary.push(entry);
    buildTable();
    setTimeout(() => closeForm(), 300);
    }

// If local storage does not exist, create it, otherwise get books from local storage
if (!localStorage.getItem("books")) {
    addtoStorage();
} else {
    getFromStorage();
}

buildTable();



    