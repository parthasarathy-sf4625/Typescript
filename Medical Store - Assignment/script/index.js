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
//global vars
let currentUser;
let currentTicket;
let currentTravel;
let form = document.getElementById("form");
let afterlogin = document.getElementById("afterlogin");
let home = document.getElementById("home");
let showBalance = document.getElementById("showBalance");
let topup = document.getElementById("topup");
let travelHistory = document.getElementById("travelHistory");
let travel = document.getElementById("travel");
//fetching data
function fetchPersonalDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = "http://localhost:5143/api/personalDetails";
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchTravelDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = "http://localhost:5143/api/travelDetails";
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchTicketDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = "http://localhost:5143/api/ticketDetails";
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
//Add Data
function addPersonalDetails(personalDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5143/api/personalDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personalDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to add personal Detail');
        }
    });
}
function addTravelDetails(travelDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5143/api/travelDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(travelDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to fetch travel Detail');
        }
    });
}
3;
function addTicketDetails(ticketDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5143/api/ticketDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to ticket Detail');
        }
    });
}
//Update Data
function updatePersonalDetails(cardNumber, personalDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5143/api/personalDetails/${cardNumber}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personalDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function updateTicketDetails(ticketID, ticketDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5143/api/personalDetails/${ticketID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function updateTravelDetails(travelID, travelDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5143/api/personalDetails/${travelID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(travelDetail)
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
        const personalDetail = {
            cardNumber: 0,
            userName: userName.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            walletBalance: 0
        };
        addPersonalDetails(personalDetail);
        alert("Registeration Sucessfull");
        SignInPage();
    });
}
function existingUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const personalDetailsList = yield fetchPersonalDetails();
        let mail = document.getElementById("existingMailid");
        let password = document.getElementById("existingPassword");
        let validUser = true;
        personalDetailsList.forEach(personalDetail => {
            if (personalDetail.email == mail.value && personalDetail.password == password.value) {
                validUser = false;
                currentUser = personalDetail;
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
        travelHistory.style.display = "none";
        travel.style.display = "none";
        home.innerHTML = "Welcome " + currentUser.userName;
    });
}
function balanceCheck() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "block";
        topup.style.display = "none";
        travelHistory.style.display = "none";
        travel.style.display = "none";
        showBalance.innerHTML = "Wallet Balance : " + currentUser.walletBalance;
    });
}
function recharge() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "block";
        travelHistory.style.display = "none";
        travel.style.display = "none";
    });
}
function topupWallet() {
    return __awaiter(this, void 0, void 0, function* () {
        let amount = document.getElementById("amount");
        currentUser.walletBalance += parseInt(amount.value);
        updatePersonalDetails(currentUser.cardNumber, currentUser);
        alert("Recharge Sucessfull");
        let topupform = document.getElementById("topupform");
        topupform.reset();
    });
}
function showTravelHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        travelHistory.style.display = "block";
        travel.style.display = "none";
        const travelDetailsList = yield fetchTravelDetails();
        let travelHistoryBody = document.getElementById("travelHistoryBody");
        travelHistoryBody.innerHTML = "";
        travelDetailsList.forEach(travelDetails => {
            if (travelDetails.cardNumber == currentUser.cardNumber) {
                travelHistoryBody.innerHTML += `<tr> <td> ${travelDetails.cardNumber}</td>
                <td> ${travelDetails.fromLocation}</td>
                <td> ${travelDetails.toLocation}</td>
                <td> ${travelDetails.travelDate}</td>
                <td> ${travelDetails.travelPrice}</td> </tr>`;
            }
        });
    });
}
function showTravel() {
    return __awaiter(this, void 0, void 0, function* () {
        form.style.display = "none";
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        travelHistory.style.display = "none";
        travel.style.display = "block";
        const ticketDetails = yield fetchTicketDetails();
        let travelBody = document.getElementById("travelBody");
        travelBody.innerHTML = "";
        ticketDetails.forEach(ticketDetails => {
            travelBody.innerHTML += `<tr> <td> ${ticketDetails.ticketID}</td>
                <td> ${ticketDetails.fromLocation}</td>
                <td> ${ticketDetails.toLocation}</td>
                <td> ${ticketDetails.ticketPrice}</td> 
                <td> <button class = "addbutton" onclick = "bookTickets(${ticketDetails.ticketID})" >Book</button> </td></tr>`;
        });
    });
}
function bookTickets(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticketDetail = yield fetchTicketDetails();
        ticketDetail.forEach(ticket => {
            if (ticket.ticketID == id)
                currentTicket = ticket;
        });
        if (currentUser.walletBalance < currentTicket.ticketPrice) {
            alert("Insufficant Balance");
        }
        else {
            currentUser.walletBalance -= currentTicket.ticketPrice;
            updatePersonalDetails(currentUser.cardNumber, currentUser);
            const travelDetail = {
                travelID: 0,
                cardNumber: currentUser.cardNumber,
                fromLocation: currentTicket.fromLocation,
                toLocation: currentTicket.toLocation,
                travelDate: new Date().toISOString().split('T')[0],
                travelPrice: currentTicket.ticketPrice
            };
            alert("Ticket Booking Sucessfull");
            addTravelDetails(travelDetail);
        }
    });
}
