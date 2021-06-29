
let myLibrary = [];

// Object constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return title + " by " + author + ", " + pages + " pages, " + read 
    } 
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", "not read yet")
const theHungerGames = new Book("The Hunger Games", "Suzanne Collins", "400", "read")
const aGameOfThrones = new Book("A Game of Thrones", "George R.R. Martin", "800", "read")


// Inital library function
function initialLibrary() {
    myLibrary.push(theHobbit);
    myLibrary.push(theHungerGames);
    myLibrary.push(aGameOfThrones);
    for (let i = 0; i <= 2; i++) {
        displayBook(i);
    }
}
const bookList = document.getElementById("library");

// Loops through array and displays each book on page
function displayBook(arrayNum) {
    let bookDiv = document.createElement("div");
    bookDiv.textContent = myLibrary[arrayNum].info();
    bookList.appendChild(bookDiv);

}

initialLibrary();
// myLibrary.forEach((thing) => console.log(thing));


    
// Pop up form functions
function openForm() {
    document.getElementById("popupform").style.display = "block";
}
function closeForm() {
    document.getElementById("popupform").style.display = "none";
}
    
    
function submitForm() {
    event.preventDefault();
    let newBook = document.getElementById("title").value;
    let newAuthor = document.getElementById("author").value;
    let newPages = document.getElementById("pages").value;
    let entry = new Book(newBook, newAuthor, newPages);
    myLibrary.push(entry);
    console.log(newBook);
    console.log(newAuthor);
    console.log(newPages);
    // alert(newBook);
        
        
    }
    