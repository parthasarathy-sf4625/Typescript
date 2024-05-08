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
//Adding Default Data and creating list
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
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5287/api/UserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add User');
        }
    });
}
function addMedicineAPI(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5287/api/medicineInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to add Medicine');
        }
        renderMedicineTable();
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5287/api/OrderDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to add Order');
        }
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5287/api/userInfo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function updateMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5287/api/medicineInfo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
        renderMedicineTable();
    });
}
function updateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5287/api/orderDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
        renderMedicineTable();
    });
}
function deleteMedcine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5287/api/medicineInfo/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete Medicine');
        }
        renderMedicineTable();
    });
}
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = 'http://localhost:5287/api/UserInfo';
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch Users');
        }
        return yield response.json();
    });
}
function fetchMedicines() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = 'http://localhost:5287/api/medicineInfo';
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch Medicine');
        }
        return yield response.json();
    });
}
function fetchOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = 'http://localhost:5287/api/orderDetails';
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch Orders');
        }
        return yield response.json();
    });
}
let newUserCreation = () => {
    let name = document.getElementById("name");
    let emailID = document.getElementById("emailID");
    let phone = document.getElementById("phone");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmpassword");
    //UserList.push(new UserInfo(name.value, emailID.value, phone.value, password.value));
    const user = {
        userID: 0,
        userName: name.value,
        userEmail: emailID.value,
        phone: phone.value,
        userPassword: password.value,
        balance: 0
    };
    addUser(user);
    alert("Registeration Sucessfull");
    SignInPage();
};
function existinguser() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserList = yield fetchUsers();
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
    });
}
let homePage = () => {
    home.style.display = "block";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    home.innerHTML = "Welcome " + currentUser.userName;
};
function renderMedicineTable() {
    return __awaiter(this, void 0, void 0, function* () {
        home.style.display = "none";
        medicineTable.style.display = "block";
        purchaseTable.style.display = "none";
        showuserBalance.style.display = "none";
        topupBalance.style.display = "none";
        orderHistory.style.display = "none";
        cancel.style.display = "none";
        const MedicineList = yield fetchMedicines();
        let iterate = 0;
        medicinetableBody.innerHTML = "";
        MedicineList.forEach((item) => {
            //if (new Date(item.expireyDate) > new Date()) {
            medicinetableBody.innerHTML += `<tr>
                <td>${item.medicineName}</td>
                <td>${item.medicinePrice}</td>
                <td>${item.quantity}</td>
                <td>${item.expiryDate}</td>
                <td><button class="medcinetablebuttons" onclick = "showeditMedicine('${item.medicineID}')" >Edit</button>
                <button class="medcinetablebuttons"  onclick = "deleteMedcine('${item.medicineID}')" >Delete</button>
                </td>
                </tr>`;
            //}
        });
    });
}
;
//Show Add Medicine
let showaddMedicine = () => {
    let getMedicine = document.getElementById("AddMedicine");
    getMedicine.style.display = "block";
    let editMedicine = document.getElementById("EditMedicine");
    editMedicine.style.display = "none";
};
//Add Medicine 
let addMedicine = () => {
    let getMedicine = document.getElementById("AddMedicine");
    getMedicine.style.display = "block";
    let name = document.getElementById("MedcineName");
    let price = document.getElementById("Price");
    let quantity = document.getElementById("quantity");
    let date = document.getElementById("ExpiryDate");
    // MedicineList.push(new MedicineInfo(medicineName.value, parseInt(Price.value), parseInt(quantity.value), new Date(expireyDate.value)));
    const medicine = {
        medicineID: 0,
        medicineName: name.value,
        medicinePrice: parseInt(price.value),
        quantity: parseInt(quantity.value),
        expiryDate: date.value,
    };
    addMedicineAPI(medicine);
    let form = document.getElementById("AddMedicineForm");
    form.reset();
    getMedicine.style.display = "none";
    return false;
};
function showeditMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let getMedicine = document.getElementById("AddMedicine");
        getMedicine.style.display = "none";
        const MedicineList = yield fetchMedicines();
        MedicineList.forEach((medicine) => {
            if (medicine.medicineID == id) {
                let editMedicine = document.getElementById("EditMedicine");
                editMedicine.style.display = "block";
                editMedicine.innerHTML += `<button onclick="return editMedicine('${medicine.medicineID}')">Submit</button>`;
                let medicineName = document.getElementById("EditMedcineName");
                let Price = document.getElementById("EditPrice");
                let quantity = document.getElementById("Editquantity");
                let expiryDate = document.getElementById("ExpiryDate");
                //var date = medicine.expireyDate.toISOString();
                medicineName.value = medicine.medicineName;
                Price.value = medicine.medicinePrice.toString();
                quantity.value = medicine.quantity.toString();
                //expireyDate.value = date.substring(0, 10);
            }
        });
    });
}
function editMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let medicineName = document.getElementById("EditMedcineName");
        let Price = document.getElementById("EditPrice");
        let quantity = document.getElementById("Editquantity");
        let expiryDate = document.getElementById("EditExpiryDate");
        const MedicineList = yield fetchMedicines();
        const medicine = {
            medicineID: id,
            medicineName: medicineName.value,
            quantity: parseInt(quantity.value),
            medicinePrice: parseInt(Price.value),
            expiryDate: expiryDate.value
        };
        let editform = document.getElementById("EditMedicineForm");
        editform.reset();
        updateMedicine(id, medicine);
    });
}
function purchaseMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        home.style.display = "none";
        medicineTable.style.display = "none";
        purchaseTable.style.display = "block";
        showuserBalance.style.display = "none";
        topupBalance.style.display = "none";
        orderHistory.style.display = "none";
        cancel.style.display = "none";
        const MedicineList = yield fetchMedicines();
        let iterate = 0;
        purchasetableBody.innerHTML = "";
        MedicineList.forEach((item) => {
            // if (new Date(item.expireyDate) > new Date()) {
            if (iterate++ == 0) {
                purchasetableBody.innerHTML = `<tr>
                    <td>${item.medicineName}</td>
                    <td>${item.medicinePrice}</td>
                    <td>${item.quantity}</td>
                    <td>${item.expiryDate}</td>
                    <td><button class="medcinetablebuttons" onclick = " showBuyMedicine('${item.medicineID}')" >Buy</button><br>
                    </td>
                    </tr>`;
            }
            else {
                purchasetableBody.innerHTML += `<tr>
                <td>${item.medicineName}</td>
                <td>${item.medicinePrice}</td>
                <td>${item.quantity}</td>
                <td>${item.expiryDate}</td>
                <td><button class="medcinetablebuttons" onclick = "showBuyMedicine('${item.medicineID}')" >Buy</button>
                </td>
                </tr>`;
            }
            //}
            return false;
        });
    });
}
function showBuyMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let buyMedicineform = document.getElementById("purchaseDetails");
        buyMedicineform.style.display = "block";
        const MedicineList = yield fetchMedicines();
        MedicineList.forEach(medicine => {
            if (medicine.medicineID == id) {
                selectedMedicine = medicine;
            }
        });
        return false;
    });
}
//Add order
function buyMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        let buyform = document.getElementById("purchaseform");
        let buyquantity = document.getElementById("Purchacequantity");
        if (parseInt(buyquantity.value) > selectedMedicine.quantity) {
            alert("Sorry the Selected quantity is unavailable");
        }
        else {
            let totalPrice = parseInt(buyquantity.value) * selectedMedicine.medicinePrice;
            if (totalPrice > currentUser.balance) {
                alert("Insufficaint Balance . ...Please Recharge");
            }
            else {
                selectedMedicine.quantity -= parseInt(buyquantity.value);
                currentUser.balance -= totalPrice;
                const order = {
                    orderID: 0,
                    medicineID: selectedMedicine.medicineID,
                    userID: currentUser.userID,
                    medicineName: selectedMedicine.medicineName,
                    quantity: parseInt(buyquantity.value),
                    orderDate: new Date().toISOString().split('T')[0].split('-')[0],
                    totalPrice: totalPrice,
                    orderStatus: "Ordered"
                };
                alert("Order Placed Sucessfully");
                addOrder(order);
                purchaseMedicine();
            }
        }
        buyform.reset();
        return false;
    });
}
function showcancelOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        home.style.display = "none";
        medicineTable.style.display = "none";
        purchaseTable.style.display = "none";
        showuserBalance.style.display = "none";
        topupBalance.style.display = "none";
        orderHistory.style.display = "none";
        cancel.style.display = "block";
        const OrderList = yield fetchOrders();
        let orderDetails = document.getElementById("cancelorderDetails");
        orderDetails.innerHTML = "";
        OrderList.forEach(order => {
            if (order.userID == currentUser.userID && order.orderStatus == "Ordered") {
                orderDetails.innerHTML += `<tr><td>${order.orderID}</td>
                <td>${order.medicineName}</td>
                <td>${order.quantity}</td> 
                <td>${order.orderDate.split('T')[0].split('-').reverse().join('/')}</td>
                <td>${order.orderStatus}</td>
                <td><button class="cancelbutton" onclick = "return cancelOrder('${order.orderID}')" >Cancel</button><br>`;
            }
        });
    });
}
function cancelOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchMedicines();
        const OrderList = yield fetchOrders();
        OrderList.forEach(order => {
            if (order.orderID == id) {
                selectedOrder = order;
                selectedOrder.orderStatus = "Cancelled";
                currentUser.balance += order.totalPrice;
                updateUser(currentUser.userID, currentUser);
                MedicineList.forEach(medicine => {
                    if (medicine.medicineID == order.medicineID) {
                        medicine.quantity += order.quantity;
                        updateMedicine(medicine.medicineID, medicine);
                        alert("Sucessfully cancelled");
                    }
                });
            }
        });
        updateOrder(selectedOrder.orderID, selectedOrder);
        showcancelOrder();
        return false;
    });
}
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
    updateUser(currentUser.userID, currentUser);
    let topupform = document.getElementById("topupform");
    topupform.reset();
    return false;
};
function showOrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        home.style.display = "none";
        medicineTable.style.display = "none";
        purchaseTable.style.display = "none";
        showuserBalance.style.display = "none";
        topupBalance.style.display = "none";
        orderHistory.style.display = "block";
        cancel.style.display = "none";
        const OrderList = yield fetchOrders();
        let orderDetails = document.getElementById("orderDetails");
        orderDetails.innerHTML = "";
        OrderList.forEach(order => {
            if (order.userID == currentUser.userID) {
                orderDetails.innerHTML += `<tr><td>${order.orderID}</td>
                <td>${order.medicineName}</td>
                <td>${order.quantity}</td> 
                <td>${order.orderDate}</td>
                <td>${order.orderStatus}</td>`;
            }
        });
    });
}
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
