interface userDetails {
    userID: number;
    userName: string;
    email: string;
    password: string;
    department: string;
    mobileNumber: string;
    walletBalance: number;
}

interface bookDetails {
    bookID: number;
    bookName: string;
    authorName: string;
    bookCount: number;
}

interface borrowDetails {
    borrowID: number;
    bookID: number;
    userID: number;
    borrowDate: string;
    borrowBookCount: number;
    status: string;
    paidFineAmount: number;
}

let currentUser: userDetails;
let currentBook: bookDetails;
let currentBorrow: borrowDetails;


let form = document.getElementById("form") as HTMLDivElement;

let afterlogin = document.getElementById("afterlogin") as HTMLDivElement;

let home = document.getElementById("home") as HTMLDivElement;

let showBalance = document.getElementById("showBalance") as HTMLDivElement;

let topup = document.getElementById("topup") as HTMLTableElement;

let borrowHistory = document.getElementById("borrowHistory") as HTMLDivElement;

let returnBook = document.getElementById("returnBook") as HTMLDivElement;

let borrowForm = document.getElementById("borrowForm") as HTMLDivElement;
borrowForm.style.display ="none";
let borrow = document.getElementById("borrow") as HTMLDivElement;

//Fetching

async function fetchUserDetails(): Promise<userDetails[]> {

    const apiurl = "http://localhost:5238/api/userDetails";
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

async function fetchBookDetails(): Promise<bookDetails[]> {

    const apiurl = "http://localhost:5238/api/bookDetails";
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

async function fetchBorrowDetails(): Promise<borrowDetails[]> {

    const apiurl = "http://localhost:5238/api/borrowDetails";
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}


//Adding

async function addUserDetails(userDetail: userDetails) {
    const response = await fetch('http://localhost:5238/api/userDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetail)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to add personal Detail');
    }
}

async function addBookDetails(bookDetail: bookDetails) {
    const response = await fetch('http://localhost:5238/api/bookDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookDetail)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to add personal Detail');
    }
}

async function addBorrowDetails(borrowDetail: borrowDetails) {
    const response = await fetch('http://localhost:5238/api/borrowDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrowDetail)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to add personal Detail');
    }
}

//Update

async function updateUserDetails(userID: number, userDetail: userDetails) {
    const response = await fetch(`http://localhost:5238/api/userDetails/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetail)
    });
    if (!response.ok) {
        throw new Error('Failed to update User');
    }
}

async function updateBookDetails(bookID: number, bookDetail: bookDetails) {
    const response = await fetch(`http://localhost:5238/api/bookDetails/${bookID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookDetail)
    });
    if (!response.ok) {
        throw new Error('Failed to update User');
    }
}

async function updateBorrowDetails(borrowID: number, borrowDetail: borrowDetails) {
    const response = await fetch(`http://localhost:5238/api/borrowDetails/${borrowID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrowDetail)
    });
    if (!response.ok) {
        throw new Error('Failed to update User');
    }
}

async function SignUpPage() {
    let signup = document.getElementById("signup") as HTMLDivElement;
    let signin = document.getElementById("signin") as HTMLDivElement;

    signin.style.display = "none";
    signup.style.display = "block";
}

async function SignInPage() {
    let signup = document.getElementById("signup") as HTMLDivElement;
    let signin = document.getElementById("signin") as HTMLDivElement;

    signin.style.display = "block";
    signup.style.display = "none";
}

async function newUserCreation() {
    let userName = document.getElementById("userName") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;
    let phone = document.getElementById("phone") as HTMLInputElement;
    let password = document.getElementById("password") as HTMLInputElement;
    let department = document.getElementById("department") as HTMLInputElement;
    

    const userDetail: userDetails = {
        userID: 0,
        userName: userName.value,
        email: email.value,
        mobileNumber: phone.value,
        department: department.value,
        password: password.value,
        walletBalance: 0
    }

    addUserDetails(userDetail);

    alert("Registeration Sucessfull");

    SignInPage();
}

async function existingUser() {

    const userDetailList = await fetchUserDetails();

    let mail = document.getElementById("existingMailid") as HTMLInputElement;
    let password = document.getElementById("existingPassword") as HTMLInputElement;

    let validUser = true;

    userDetailList.forEach(userDetail => {
        if (userDetail.email == mail.value && userDetail.password == password.value) {
            validUser = false;
            currentUser = userDetail;
            let form = document.getElementById("form") as HTMLDivElement;
            let afterlogin = document.getElementById("afterlogin") as HTMLDivElement;
            form.style.display = "none";
            afterlogin.style.display = "block";
            homePage();
            return false;
        }
    });
}

async function homePage() {
    form.style.display = "none";
    home.style.display = "block";
    showBalance.style.display = "none";
    topup.style.display = "none";
    borrow.style.display = "none";
    borrow.style.display = "none";
    returnBook.style.display = "none";

    home.innerHTML = "Welcome " + currentUser.userName;
}

async function recharge() {
    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "block";
    borrowHistory.style.display = "none";
    borrow.style.display = "none";
    returnBook.style.display = "none";
}

async function topupWallet() {
    let amount = document.getElementById("amount") as HTMLInputElement;

    currentUser.walletBalance += parseInt(amount.value);

    updateUserDetails(currentUser.userID, currentUser);

    alert("Recharge Sucessfull");
    let topupform = document.getElementById("topupform") as HTMLFormElement;
    topupform.reset();
}

async function showWalletBalance() {

    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "block";
    topup.style.display = "none";
    borrowHistory.style.display = "none";
    borrow.style.display = "none";
    returnBook.style.display = "none";

    showBalance.innerHTML = "Wallet Balance : " + currentUser.walletBalance;
}

async function showBorrowHistory() {

    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "none";
    borrowHistory.style.display = "block";
    borrow.style.display = "none";
    returnBook.style.display = "none";

    const borrowDetails = await fetchBorrowDetails();
    let borrowHistoryBody = document.getElementById("borrowHistoryBody") as HTMLTableElement;
    borrowHistoryBody.innerHTML = "";
    borrowDetails.forEach(borrowDetails => {
        if (borrowDetails.userID == currentUser.userID) {
            borrowHistoryBody.innerHTML += `<tr> <td> ${borrowDetails.bookID}</td>
                <td> ${borrowDetails.userID}</td>
                <td> ${borrowDetails.borrowDate.split('T')[0]}</td>
                <td> ${borrowDetails.borrowBookCount}</td>
                <td> ${borrowDetails.status}</td> 
                <td> ${borrowDetails.paidFineAmount}</td></tr>`
        }
    });
}

async function showReturn() {

    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "none";
    borrowHistory.style.display = "none";
    borrow.style.display = "none";
    returnBook.style.display = "block";

    const borrowDetails = await fetchBorrowDetails();
    let returnBookBody = document.getElementById("returnBookBody") as HTMLTableElement;
    returnBookBody.innerHTML = "";
    borrowDetails.forEach(borrowDetails => {
        if (borrowDetails.userID == currentUser.userID && borrowDetails.status == "Borrowed") {
            returnBookBody.innerHTML += `<tr> <td> ${borrowDetails.bookID}</td>
                <td> ${borrowDetails.userID}</td>
                <td> ${borrowDetails.borrowDate.split('T')[0]}</td>
                <td> ${borrowDetails.borrowBookCount}</td>
                <td> ${borrowDetails.status}</td> 
                <td> <button class = "addbutton" onclick = "returnBooks(${borrowDetails.borrowID})" >Return</button> </td></tr>`
        }
    });
}

async function returnBooks(id: number) {

    const bookDetails = await fetchBookDetails();
    const borrowDetails = await fetchBorrowDetails();
    borrowDetails.forEach(borrowDetail => {
        if (borrowDetail.borrowID == id) {
            

            bookDetails.forEach(bookDetail => {
                if (bookDetail.bookID == borrowDetail.bookID){
                    bookDetail.bookCount+=borrowDetail.borrowBookCount;
                    updateBookDetails(bookDetail.bookID,bookDetail); 
                }

    });
            borrowDetail.status = "Returned";
            updateBorrowDetails(borrowDetail.borrowID, borrowDetail);
            alert("Book returned Sucessfully")
        }
    });

}

async function showBorrow() {
    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "none";
    borrowHistory.style.display = "none";
    borrow.style.display = "block";
    returnBook.style.display = "none";  
    
    const bookDetails = await fetchBookDetails();
    let returnBookBody = document.getElementById("borrowBody") as HTMLTableElement;
    returnBookBody.innerHTML = "";
    let sNo=0;
    bookDetails.forEach(bookDetail => {
            returnBookBody.innerHTML += `<tr> <td> ${++sNo}</td>
                <td> ${bookDetail.bookName}</td>
                <td> ${bookDetail.authorName}</td>
                <td> ${bookDetail.bookCount}</td>
                <td> <button class = "addbutton" onclick = "showBorrowForm(${bookDetail.bookID})" >Borrow</button> </td></tr>`
        
    });
}

async function showBorrowForm(id:number) {
    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "none";
    borrowHistory.style.display = "none";
    borrow.style.display = "block";
    returnBook.style.display = "none";
    borrowForm.style.display ="block"; 

    const bookDetailList = await fetchBookDetails();

    bookDetailList.forEach(bookDetail => {
        if(bookDetail.bookID == id){
            currentBook=bookDetail;
        }        
    });
}

async function borrowBook() {
    
    let quantity = document.getElementById("borrowQuantity") as HTMLInputElement;
    
    if(currentBook.bookCount < parseInt(quantity.value)){
        alert("Selected Count is unavailable");
    }
    else{
        let userBorrowBookCount=0;
        const borrowDetailList= await fetchBorrowDetails();
        borrowDetailList.forEach(borrowDetail => {
            if(borrowDetail.userID == currentUser.userID && borrowDetail.status == "Borrowed"){
                ++userBorrowBookCount;
            }
        });
        if(userBorrowBookCount>=3){
            alert("You have already borrowed 3 books please to return to Continue");
        }
        else{
            const borrowDetail:borrowDetails={
                borrowID:0,
                bookID:currentBook.bookID,
                userID:currentUser.userID,
                borrowDate:new Date().toISOString(),
                borrowBookCount:parseInt(quantity.value),
                status:"Borrowed",
                paidFineAmount:0
            }
            currentBook.bookCount-=parseInt(quantity.value)
            updateBookDetails(currentBook.bookID,currentBook);
            addBorrowDetails(borrowDetail);
            alert("Borrowed Sucessfully");
        }
    }
}