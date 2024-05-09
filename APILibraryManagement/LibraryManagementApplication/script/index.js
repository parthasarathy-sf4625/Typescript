"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let currentUser;
let currentBook;
let currentBorrow;
let form = document.getElementById("form");
let afterlogin = document.getElementById("afterlogin");
let home = document.getElementById("home");
let showBalance = document.getElementById("showBalance");
let topup = document.getElementById("topup");
let borrowHistory = document.getElementById("borrowHistory");
let returnBook = document.getElementById("returnBook");
let borrowForm = document.getElementById("borrowForm");
borrowForm.style.display = "none";
let borrow = document.getElementById("borrow");
//Fetching
function fetchUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = "http://localhost:5238/api/userDetails";
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchBookDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = "http://localhost:5238/api/bookDetails";
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchBorrowDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = "http://localhost:5238/api/borrowDetails";
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
//Adding
function addUserDetails(userDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5238/api/userDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to add personal Detail');
        }
    });
}
function addBookDetails(bookDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5238/api/bookDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to add personal Detail');
        }
    });
}
function addBorrowDetails(borrowDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5238/api/borrowDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrowDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to add personal Detail');
        }
    });
}
//Update
function updateUserDetails(userID, userDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5238/api/userDetails/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function updateBookDetails(bookID, bookDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5238/api/bookDetails/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function updateBorrowDetails(borrowID, borrowDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5238/api/borrowDetails/${borrowID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrowDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function SignUpPage() {
    return __awaiter(this, void 0, void 0, function* () {
        let signup = document.getElementById("signup");
        let signin = document.getElementById("signin");
        signin.style.display = "none";
        signup.style.display = "block";
    });
}
function SignInPage() {
    return __awaiter(this, void 0, void 0, function* () {
        let signup = document.getElementById("signup");
        let signin = document.getElementById("signin");
        signin.style.display = "block";
        signup.style.display = "none";
    });
}
function newUserCreation() {
    return __awaiter(this, void 0, void 0, function* () {
        let userName = document.getElementById("userName");
        let email = document.getElementById("email");
        let phone = document.getElementById("phone");
        let password = document.getElementById("password");
        let department = document.getElementById("department");
        const userDetail = {
            userID: 0,
            userName: userName.value,
            email: email.value,
            mobileNumber: phone.value,
            department: department.value,
            password: password.value,
            walletBalance: 0
        };
        addUserDetails(userDetail);
        alert("Registeration Sucessfull");
        SignInPage();
    });
}
function existingUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const userDetailList = yield fetchUserDetails();
        let mail = document.getElementById("existingMailid");
        let password = document.getElementById("existingPassword");
        let validUser = true;
        userDetailList.forEach(userDetail => {
            if (userDetail.email == mail.value && userDetail.password == password.value) {
                validUser = false;
                currentUser = userDetail;
                let form = document.getElementById("form");
                let afterlogin = document.getElementById("afterlogin");
                form.style.display = "none";
                afterlogin.style.display = "block";
                homePage();
                return false;
            }
        });
    });
}
function homePage() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "block";
        showBalance.style.display = "none";
        topup.style.display = "none";
        borrow.style.display = "none";
        borrow.style.display = "none";
        returnBook.style.display = "none";
        home.innerHTML = "Welcome " + currentUser.userName;
    });
}
function recharge() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "block";
        borrowHistory.style.display = "none";
        borrow.style.display = "none";
        returnBook.style.display = "none";
    });
}
function topupWallet() {
    return __awaiter(this, void 0, void 0, function* () {
        let amount = document.getElementById("amount");
        currentUser.walletBalance += parseInt(amount.value);
        updateUserDetails(currentUser.userID, currentUser);
        alert("Recharge Sucessfull");
        let topupform = document.getElementById("topupform");
        topupform.reset();
    });
}
function showWalletBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "block";
        topup.style.display = "none";
        borrowHistory.style.display = "none";
        borrow.style.display = "none";
        returnBook.style.display = "none";
        showBalance.innerHTML = "Wallet Balance : " + currentUser.walletBalance;
    });
}
function showBorrowHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        borrowHistory.style.display = "block";
        borrow.style.display = "none";
        returnBook.style.display = "none";
        const borrowDetails = yield fetchBorrowDetails();
        let borrowHistoryBody = document.getElementById("borrowHistoryBody");
        borrowHistoryBody.innerHTML = "";
        borrowDetails.forEach(borrowDetails => {
            if (borrowDetails.userID == currentUser.userID) {
                borrowHistoryBody.innerHTML += `<tr> <td> ${borrowDetails.bookID}</td>
                <td> ${borrowDetails.userID}</td>
                <td> ${borrowDetails.borrowDate.split('T')[0]}</td>
                <td> ${borrowDetails.borrowBookCount}</td>
                <td> ${borrowDetails.status}</td> 
                <td> ${borrowDetails.paidFineAmount}</td></tr>`;
            }
        });
    });
}
function showReturn() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        borrowHistory.style.display = "none";
        borrow.style.display = "none";
        returnBook.style.display = "block";
        const borrowDetails = yield fetchBorrowDetails();
        let returnBookBody = document.getElementById("returnBookBody");
        returnBookBody.innerHTML = "";
        borrowDetails.forEach(borrowDetails => {
            if (borrowDetails.userID == currentUser.userID && borrowDetails.status == "Borrowed") {
                returnBookBody.innerHTML += `<tr> <td> ${borrowDetails.bookID}</td>
                <td> ${borrowDetails.userID}</td>
                <td> ${borrowDetails.borrowDate.split('T')[0]}</td>
                <td> ${borrowDetails.borrowBookCount}</td>
                <td> ${borrowDetails.status}</td> 
                <td> <button class = "addbutton" onclick = "returnBooks(${borrowDetails.borrowID})" >Return</button> </td></tr>`;
            }
        });
    });
}
function returnBooks(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookDetails = yield fetchBookDetails();
        const borrowDetails = yield fetchBorrowDetails();
        borrowDetails.forEach(borrowDetail => {
            if (borrowDetail.borrowID == id) {
                bookDetails.forEach(bookDetail => {
                    if (bookDetail.bookID == borrowDetail.bookID) {
                        bookDetail.bookCount += borrowDetail.borrowBookCount;
                        updateBookDetails(bookDetail.bookID, bookDetail);
                    }
                });
                borrowDetail.status = "Returned";
                updateBorrowDetails(borrowDetail.borrowID, borrowDetail);
                alert("Book returned Sucessfully");
            }
        });
    });
}
function showBorrow() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        borrowHistory.style.display = "none";
        borrow.style.display = "block";
        returnBook.style.display = "none";
        const bookDetails = yield fetchBookDetails();
        let returnBookBody = document.getElementById("borrowBody");
        returnBookBody.innerHTML = "";
        let sNo = 0;
        bookDetails.forEach(bookDetail => {
            returnBookBody.innerHTML += `<tr> <td> ${++sNo}</td>
                <td> ${bookDetail.bookName}</td>
                <td> ${bookDetail.authorName}</td>
                <td> ${bookDetail.bookCount}</td>
                <td> <button class = "addbutton" onclick = "showBorrowForm(${bookDetail.bookID})" >Borrow</button> </td></tr>`;
        });
    });
}
function showBorrowForm(id) {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        borrowHistory.style.display = "none";
        borrow.style.display = "block";
        returnBook.style.display = "none";
        borrowForm.style.display = "block";
        const bookDetailList = yield fetchBookDetails();
        bookDetailList.forEach(bookDetail => {
            if (bookDetail.bookID == id) {
                currentBook = bookDetail;
            }
        });
    });
}
function borrowBook() {
    return __awaiter(this, void 0, void 0, function* () {
        let quantity = document.getElementById("borrowQuantity");
        if (currentBook.bookCount < parseInt(quantity.value)) {
            alert("Selected Count is unavailable");
        }
        else {
            let userBorrowBookCount = 0;
            const borrowDetailList = yield fetchBorrowDetails();
            borrowDetailList.forEach(borrowDetail => {
                if (borrowDetail.userID == currentUser.userID && borrowDetail.status == "Borrowed") {
                    ++userBorrowBookCount;
                }
            });
            if (userBorrowBookCount >= 3) {
                alert("You have already borrowed 3 books please to return to Continue");
            }
            else {
                const borrowDetail = {
                    borrowID: 0,
                    bookID: currentBook.bookID,
                    userID: currentUser.userID,
                    borrowDate: new Date().toISOString(),
                    borrowBookCount: parseInt(quantity.value),
                    status: "Borrowed",
                    paidFineAmount: 0
                };
                currentBook.bookCount -= parseInt(quantity.value);
                updateBookDetails(currentBook.bookID, currentBook);
                addBorrowDetails(borrowDetail);
                alert("Borrowed Sucessfully");
            }
        }
    });
}
