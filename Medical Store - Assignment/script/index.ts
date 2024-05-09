interface personalDetails {
    cardNumber: number;
    userName: string;
    email: string;
    phone: string;
    password: string;
    walletBalance: number;
}

interface ticketDetails {
    ticketID: number;
    fromLocation: string;
    toLocation: string;
    ticketPrice: number;
}

interface travelDetails {
    travelID: number;
    cardNumber: number;
    fromLocation: string;
    toLocation: string;
    travelDate: string;
    travelPrice: number;
}


//global vars

let currentUser: personalDetails;

let currentTicket: ticketDetails;

let currentTravel: travelDetails;

let form = document.getElementById("form") as HTMLDivElement;

let afterlogin = document.getElementById("afterlogin") as HTMLDivElement;

let home = document.getElementById("home") as HTMLDivElement;

let showBalance = document.getElementById("showBalance") as HTMLDivElement;

let topup = document.getElementById("topup") as HTMLTableElement;

let travelHistory = document.getElementById("travelHistory") as HTMLDivElement;

let travel = document.getElementById("travel") as HTMLDivElement;

//fetching data

async function fetchPersonalDetails(): Promise<personalDetails[]> {

    const apiurl = "http://localhost:5143/api/personalDetails";
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

async function fetchTravelDetails(): Promise<travelDetails[]> {

    const apiurl = "http://localhost:5143/api/travelDetails";
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

async function fetchTicketDetails(): Promise<ticketDetails[]> {

    const apiurl = "http://localhost:5143/api/ticketDetails";
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

//Add Data
async function addPersonalDetails(personalDetail: personalDetails) {
    const response = await fetch('http://localhost:5143/api/personalDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personalDetail)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to add personal Detail');
    }
}

async function addTravelDetails(travelDetail: travelDetails) {
    const response = await fetch('http://localhost:5143/api/travelDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(travelDetail)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch travel Detail');
    }
} 3

async function addTicketDetails(ticketDetail: ticketDetails) {
    const response = await fetch('http://localhost:5143/api/ticketDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketDetail)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to ticket Detail');
    }
}
//Update Data
async function updatePersonalDetails(cardNumber: number, personalDetail: personalDetails) {
    const response = await fetch(`http://localhost:5143/api/personalDetails/${cardNumber}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personalDetail)
    });
    if (!response.ok) {
        throw new Error('Failed to update User');
    }
}

async function updateTicketDetails(ticketID: number, ticketDetail: ticketDetails) {
    const response = await fetch(`http://localhost:5143/api/personalDetails/${ticketID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketDetail)
    });
    if (!response.ok) {
        throw new Error('Failed to update User');
    }
}

async function updateTravelDetails(travelID: number, travelDetail: travelDetails) {
    const response = await fetch(`http://localhost:5143/api/personalDetails/${travelID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(travelDetail)
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

    const personalDetail: personalDetails = {
        cardNumber: 0,
        userName: userName.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        walletBalance: 0
    }

    addPersonalDetails(personalDetail);

    alert("Registeration Sucessfull");

    SignInPage();
}

async function existingUser() {

    const personalDetailsList = await fetchPersonalDetails();

    let mail = document.getElementById("existingMailid") as HTMLInputElement;
    let password = document.getElementById("existingPassword") as HTMLInputElement;

    let validUser = true;

    personalDetailsList.forEach(personalDetail => {
        if (personalDetail.email == mail.value && personalDetail.password == password.value) {
            validUser = false;
            currentUser = personalDetail;
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
    travelHistory.style.display = "none";
    travel.style.display = "none";

    home.innerHTML = "Welcome " + currentUser.userName;
}

async function balanceCheck() {
    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "block";
    topup.style.display = "none";
    travelHistory.style.display = "none";
    travel.style.display = "none";

    showBalance.innerHTML = "Wallet Balance : " + currentUser.walletBalance;
}

async function recharge() {
    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "block";
    travelHistory.style.display = "none";
    travel.style.display = "none";
}

async function topupWallet() {
    let amount = document.getElementById("amount") as HTMLInputElement;

    currentUser.walletBalance += parseInt(amount.value);

    updatePersonalDetails(currentUser.cardNumber, currentUser);

    alert("Recharge Sucessfull");
    let topupform = document.getElementById("topupform") as HTMLFormElement;
    topupform.reset();
}

async function showTravelHistory() {

    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "none";
    travelHistory.style.display = "block";
    travel.style.display = "none";

    const travelDetailsList = await fetchTravelDetails();
    let travelHistoryBody = document.getElementById("travelHistoryBody") as HTMLTableElement;
    travelHistoryBody.innerHTML = "";
    travelDetailsList.forEach(travelDetails => {
        if (travelDetails.cardNumber == currentUser.cardNumber) {
            travelHistoryBody.innerHTML += `<tr> <td> ${travelDetails.cardNumber}</td>
                <td> ${travelDetails.fromLocation}</td>
                <td> ${travelDetails.toLocation}</td>
                <td> ${travelDetails.travelDate}</td>
                <td> ${travelDetails.travelPrice}</td> </tr>`
        }
    });
}

async function showTravel() {
    form.style.display = "none";
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "none";
    travelHistory.style.display = "none";
    travel.style.display = "block";

    const ticketDetails = await fetchTicketDetails();
    let travelBody = document.getElementById("travelBody") as HTMLTableElement;
    travelBody.innerHTML = "";
    ticketDetails.forEach(ticketDetails => {


        travelBody.innerHTML += `<tr> <td> ${ticketDetails.ticketID}</td>
                <td> ${ticketDetails.fromLocation}</td>
                <td> ${ticketDetails.toLocation}</td>
                <td> ${ticketDetails.ticketPrice}</td> 
                <td> <button class = "addbutton" onclick = "bookTickets(${ticketDetails.ticketID})" >Book</button> </td></tr>`

    });
}

async function bookTickets(id: number) {

    const ticketDetail = await fetchTicketDetails();

    ticketDetail.forEach(ticket => {
        if (ticket.ticketID == id)
            currentTicket = ticket;
    });

    if (currentUser.walletBalance < currentTicket.ticketPrice) {
        alert("Insufficant Balance");
    }
    else {
        currentUser.walletBalance -=currentTicket.ticketPrice;
        updatePersonalDetails(currentUser.cardNumber, currentUser);

        const travelDetail: travelDetails = {

            travelID: 0,
            cardNumber: currentUser.cardNumber,
            fromLocation: currentTicket.fromLocation,
            toLocation: currentTicket.toLocation,
            travelDate: new Date().toISOString().split('T')[0],
            travelPrice: currentTicket.ticketPrice
            
        }
        alert("Ticket Booking Sucessfull");
        addTravelDetails(travelDetail);
    }

}