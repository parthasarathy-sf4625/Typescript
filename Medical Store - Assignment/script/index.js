"use strict";
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 0;
let medicinetableBody = document.getElementById("medicineTable");
//User Info Class
class UserInfo {
    constructor(paramuserEmail, paramuserPassword, paramPhone) {
        UserIdAutoIncrement++;
        this.userID = "UID" + UserIdAutoIncrement;
        this.userEmail = paramuserEmail;
        this.userPassword = paramuserPassword;
        this.phone = paramPhone;
    }
}
//User Info Class Ends
//
//Medicine Class 
class MedicineInfo {
    constructor(paramMedicineName, paramMedicinePrice, paramQuantity, paramExpireyDate) {
        MedicineIdAutoIncrement++;
        this.MedicineID = "MID" + MedicineIdAutoIncrement;
        this.MedicineName = paramMedicineName;
        this.MedicinePrice = paramMedicinePrice;
        this.Quantity = paramQuantity;
        this.ExpireyDate = paramExpireyDate;
    }
}
//Medicine Class  ends
//Adding Default Data and creating list
let MedicineList = [];
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 3, 29)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2024, 5, 29)));
let UserList = [];
UserList.push(new UserInfo("Kal el", "krypton", "9876543210"));
UserList.push(new UserInfo("Bruce Wayne", "thedarkknight", "7574893947"));
let currentUser;
let SignInPage = () => {
    let signinpage = document.getElementById("signin");
    let signuppage = document.getElementById("signup");
    signinpage.style.display = "block";
    signuppage.style.display = "none";
};
let SignUpPage = () => {
    let signinpage = document.getElementById("signin");
    let signuppage = document.getElementById("signup");
    signinpage.style.display = "none";
    signuppage.style.display = "block";
};
let newUserCreation = () => {
};
let existinguser = () => {
    let form = document.getElementById("form");
    let afterlogin = document.getElementById("afterlogin");
    form.style.display = "none";
    afterlogin.style.display = "block";
    currentUser = UserList[0];
    homePage();
};
let homePage = () => {
    let home = document.getElementById("home");
    home.style.display = "block";
    home.innerHTML = "Welcome " + currentUser.userID;
};
//Show Medicine List
let renderMedicineTable = () => {
    let home = document.getElementById("home");
    home.style.display = "none";
    let medicineTable = document.getElementById("medicineDetails");
    medicineTable.style.display = "block";
    MedicineList.forEach((item) => {
        if (item.ExpireyDate > new Date()) {
            medicinetableBody.innerHTML += `<tr>
        <td>${item.MedicineName}</td>
        <td>${item.MedicinePrice}</td>
        <td>${item.Quantity}</td>
        <td>${item.ExpireyDate.toLocaleDateString()}</td>
        <td><button>Edit</button>
        <button>Delete</button>
        </td>
        </tr>`;
        }
    });
};
//Add Medicine
let showaddMedicine = () => {
    let getMedicine = document.getElementById("AddMedicine");
    getMedicine.style.display = "block";
};
let addMedicine = () => {
};
