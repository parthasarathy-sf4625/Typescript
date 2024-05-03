"use strict";
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 0;
let OrderIdAutoIncrement = 0;
let home = document.getElementById("home");
let medicineTable = document.getElementById("medicineDetails");
let medicinetableBody = document.getElementById("medicineTable");
let purchaseTable = document.getElementById("purchase");
let purchasetableBody = document.getElementById("purchaseTable");
let showuserBalance = document.getElementById("showBalance");
let cancel = document.getElementById("cancelOrder");
let orderHistory = document.getElementById("orderHistory");
let topupBalance = document.getElementById("topup");
let currentUser;
let selectedMedicine;
let selectedOrder;
//User Info Class
class UserInfo {
    constructor(paramName, paramuserEmail, paramuserPassword, paramPhone) {
        UserIdAutoIncrement++;
        this.userID = "UID" + UserIdAutoIncrement;
        this.userName = paramName;
        this.userEmail = paramuserEmail;
        this.userPassword = paramuserPassword;
        this.phone = paramPhone;
        this.balance = 0;
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
//Order Details
class OrderDetails {
    constructor(paramMedicineID, paramUserID, paramMedicineName, paramQuantity, paramOrderDate, paramTotalPrice, paramOrderStatus) {
        OrderIdAutoIncrement++;
        this.OrderID = "OID " + OrderIdAutoIncrement;
        this.MedicineID = paramMedicineID;
        this.UserID = paramUserID;
        this.MedicineName = paramMedicineName;
        this.Quantity = paramQuantity;
        this.OrderDate = paramOrderDate;
        this.TotalPrice = paramTotalPrice;
        this.OrderStatus = paramOrderStatus;
    }
}
//Adding Default Data and creating list
let MedicineList = [];
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 3, 29)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2024, 5, 29)));
let UserList = [];
UserList.push(new UserInfo("Kal el", "manofsteel", "krypton", "9876543210"));
UserList.push(new UserInfo("Bruce Wayne", "darkknight", "thedarkknight", "7574893947"));
let OrderList = [];
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
    let name = document.getElementById("name");
    let emailID = document.getElementById("name");
    let phone = document.getElementById("phone");
    let password = document.getElementById("name");
    let confirmPassword = document.getElementById("name");
    UserList.push(new UserInfo(name.value, emailID.value, phone.value, password.value));
    alert("Registeration Sucessfull");
    SignInPage();
};
let existinguser = () => {
    let mail = document.getElementById("existingMailid");
    let password = document.getElementById("existingPassword");
    let validuser = false;
    UserList.forEach(user => {
        if (user.userEmail == mail.value && user.userPassword == password.value) {
            validuser = true;
            currentUser = user;
            let form = document.getElementById("form");
            let afterlogin = document.getElementById("afterlogin");
            form.style.display = "none";
            afterlogin.style.display = "block";
            homePage();
            return false;
        }
    });
    if (!validuser) {
        alert("Invalid user Name or Password");
    }
};
let homePage = () => {
    home.style.display = "block";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    home.innerHTML = "Welcome " + currentUser.userName;
};
//Show Medicine List
let renderMedicineTable = () => {
    home.style.display = "none";
    medicineTable.style.display = "block";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "none";
    let iterate = 0;
    medicinetableBody.innerHTML = "";
    MedicineList.forEach((item) => {
        if (item.ExpireyDate > new Date()) {
            if (iterate++ == 0) {
                medicinetableBody.innerHTML = `<tr>
                    <td>${item.MedicineName}</td>
                    <td>${item.MedicinePrice}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.ExpireyDate.toLocaleDateString()}</td>
                    <td><button onclick = "return showeditMedicine('${item.MedicineID}')" >Edit</button>
                    <button onclick = "return deleteMedicine('${item.MedicineID}')" >Delete</button>
                    </td>
                    </tr>`;
            }
            else {
                medicinetableBody.innerHTML += `<tr>
                <td>${item.MedicineName}</td>
                <td>${item.MedicinePrice}</td>
                <td>${item.Quantity}</td>
                <td>${item.ExpireyDate.toLocaleDateString()}</td>
                <td><button onclick = "return showeditMedicine('${item.MedicineID}')" >Edit</button>
                <button onclick = "return deleteMedicine('${item.MedicineID}')" >Delete</button>
                </td>
                </tr>`;
            }
        }
    });
};
//Show Add Medicine
let showaddMedicine = () => {
    let getMedicine = document.getElementById("AddMedicine");
    getMedicine.style.display = "block";
    let editMedicine = document.getElementById("EditMedicine");
    editMedicine.style.display = "none";
};
//Show Add Medicine
let addMedicine = () => {
    let getMedicine = document.getElementById("AddMedicine");
    getMedicine.style.display = "block";
    let MedicineName = document.getElementById("MedcineName");
    let Price = document.getElementById("Price");
    let Quantity = document.getElementById("Quantity");
    let ExpireyDate = document.getElementById("ExpiryDate");
    MedicineList.push(new MedicineInfo(MedicineName.value, parseInt(Price.value), parseInt(Quantity.value), new Date(ExpireyDate.value)));
    renderMedicineTable();
    let form = document.getElementById("AddMedicineForm");
    form.reset();
    getMedicine.style.display = "none";
    return false;
};
let showeditMedicine = (id) => {
    let getMedicine = document.getElementById("AddMedicine");
    getMedicine.style.display = "none";
    MedicineList.forEach((medicine) => {
        if (medicine.MedicineID == id) {
            let editMedicine = document.getElementById("EditMedicine");
            editMedicine.style.display = "block";
            editMedicine.innerHTML += `<button onclick="return editMedicine('${medicine.MedicineID}')">Submit</button>`;
            let MedicineName = document.getElementById("EditMedcineName");
            let Price = document.getElementById("EditPrice");
            let Quantity = document.getElementById("EditQuantity");
            let ExpireyDate = document.getElementById("ExpiryDate");
            var date = medicine.ExpireyDate.toISOString();
            MedicineName.value = medicine.MedicineName;
            Price.value = medicine.MedicinePrice.toString();
            Quantity.value = medicine.Quantity.toString();
            ExpireyDate.value = date.substring(0, 10);
            return false;
        }
    });
};
let editMedicine = (id) => {
    let MedicineName = document.getElementById("EditMedcineName");
    let Price = document.getElementById("EditPrice");
    let Quantity = document.getElementById("EditQuantity");
    let ExpireyDate = document.getElementById("ExpiryDate");
    MedicineList.forEach(medicine => {
        if (medicine.MedicineID == id) {
            medicine.MedicineName = MedicineName.value;
            medicine.MedicinePrice = parseInt(Price.value);
            var date;
            medicine.Quantity = parseInt(Quantity.value);
            medicine.ExpireyDate = new Date(ExpireyDate.value);
        }
    });
    let editform = document.getElementById("EditMedicineForm");
    editform.reset();
    renderMedicineTable();
    return false;
};
let deleteMedicine = (id) => {
    MedicineList = MedicineList.filter((item) => item.MedicineID !== id);
    console.log(MedicineList.length);
    renderMedicineTable();
};
let purchaseMedicine = () => {
    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "block";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "none";
    let iterate = 0;
    purchasetableBody.innerHTML = "";
    MedicineList.forEach((item) => {
        if (item.ExpireyDate > new Date()) {
            if (iterate++ == 0) {
                purchasetableBody.innerHTML = `<tr>
                    <td>${item.MedicineName}</td>
                    <td>${item.MedicinePrice}</td>
                    <td>${item.Quantity}</td>
                    <td>${item.ExpireyDate.toLocaleDateString()}</td>
                    <td><button onclick = "return showBuyMedicine('${item.MedicineID}')" >Buy</button><br>
                    
                    </td>
                    </tr>`;
            }
            else {
                purchasetableBody.innerHTML += `<tr>
                <td>${item.MedicineName}</td>
                <td>${item.MedicinePrice}</td>
                <td>${item.Quantity}</td>
                <td>${item.ExpireyDate.toLocaleDateString()}</td>
                <td><button onclick = "return showBuyMedicine('${item.MedicineID}')" >Buy</button>
                </td>
                </tr>`;
            }
        }
    });
};
let showBuyMedicine = (id) => {
    let buyMedicineform = document.getElementById("purchaseDetails");
    buyMedicineform.style.display = "block";
    MedicineList.forEach(medicine => {
        if (medicine.MedicineID == id) {
            selectedMedicine = medicine;
        }
    });
};
let buyMedicine = () => {
    let buyform = document.getElementById("purchaseform");
    let buyQuantity = document.getElementById("Purchacequantity");
    if (parseInt(buyQuantity.value) > selectedMedicine.Quantity) {
        alert("Sorry the Selected Quantity is unavailable");
    }
    else {
        let TotalPrice = parseInt(buyQuantity.value) * selectedMedicine.MedicinePrice;
        if (TotalPrice > currentUser.balance) {
            alert("Insufficaint Balance . ...Please Recharge");
        }
        else {
            selectedMedicine.Quantity -= parseInt(buyQuantity.value);
            currentUser.balance -= TotalPrice;
            OrderList.push(new OrderDetails(selectedMedicine.MedicineID, currentUser.userID, selectedMedicine.MedicineName, parseInt(buyQuantity.value), new Date(), TotalPrice, "Ordered"));
            alert("Order Placed Sucessfully");
            purchaseMedicine();
        }
    }
    buyform.reset();
    return false;
};
let showcancelOrder = () => {
    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "block";
    let orderDetails = document.getElementById("cancelorderDetails");
    orderDetails.innerHTML = "";
    OrderList.forEach(order => {
        if (order.UserID == currentUser.userID && order.OrderStatus == "Ordered") {
            orderDetails.innerHTML += `<tr><td>${order.OrderID}</td>
                <td>${order.MedicineName}</td>
                <td>${order.Quantity}</td> 
                <td>${order.OrderDate.toLocaleDateString()}</td>
                <td>${order.OrderStatus}</td>
                <td><button onclick = "return cancelOrder('${order.OrderID}')" >Cancel</button><br>`;
        }
    });
};
let cancelOrder = (id) => {
    OrderList.forEach(order => {
        if (order.OrderID == id) {
            order.OrderStatus = "Cancelled";
            currentUser.balance += order.TotalPrice;
            MedicineList.forEach(medicine => {
                if (medicine.MedicineID == order.MedicineID) {
                    medicine.Quantity += order.Quantity;
                    alert("Sucessfully cancelled");
                }
            });
        }
    });
    showcancelOrder();
};
let showtopup = () => {
    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "none";
    topupBalance.style.display = "balance";
    let topup = document.getElementById("topup");
    topup.style.display = "block";
};
let topup = () => {
    let amount = document.getElementById("amount");
    currentUser.balance += parseInt(amount.value);
    let topupform = document.getElementById("topupform");
    topupform.reset();
    return false;
};
let showOrderHistory = () => {
    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "block";
    cancel.style.display = "none";
    let orderDetails = document.getElementById("orderDetails");
    orderDetails.innerHTML = "";
    OrderList.forEach(order => {
        if (order.UserID == currentUser.userID) {
            orderDetails.innerHTML += `<tr><td>${order.OrderID}</td>
                <td>${order.MedicineName}</td>
                <td>${order.Quantity}</td> 
                <td>${order.OrderDate.toLocaleDateString()}</td>
                <td>${order.OrderStatus}</td>`;
        }
    });
};
let showBalance = () => {
    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "block";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "none";
    showuserBalance.innerHTML = "Available Balance :" + currentUser.balance;
};
