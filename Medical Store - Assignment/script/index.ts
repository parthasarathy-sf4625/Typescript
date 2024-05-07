//User Info Class
interface UserInfo {
    userid: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    phone: string;
    balance: number;
}
//User Info Class Ends

//

//Medicine Class 
interface MedicineInfo {

    medicineid: number;
    medicineName: string;
    medicinePrice: number;
    quantity: number;
    expireyDate: string;

}
//Medicine Class  ends
//Order Details

interface OrderDetails {

    orderid: number;
    medicineid: number;
    userid: number;
    medicineName: string;
    quantity: number;
    orderDate: string;
    totalPrice: number;
    orderStatus: string;
}


let home = document.getElementById("home") as HTMLDivElement;

let medicineTable = document.getElementById("medicineDetails") as HTMLDivElement;

let medicinetableBody = document.getElementById("medicineTable") as HTMLTableElement;

let purchaseTable = document.getElementById("purchase") as HTMLDivElement;

let purchasetableBody = document.getElementById("purchaseTable") as HTMLTableElement;

let showuserBalance = document.getElementById("showBalance") as HTMLDivElement;

let cancel = document.getElementById("cancelOrder") as HTMLDivElement;

let orderHistory = document.getElementById("orderHistory") as HTMLDivElement;

let topupBalance = document.getElementById("topup") as HTMLDivElement;


let currentUser: UserInfo;

let selectedMedicine: MedicineInfo;

let selectedOrder: OrderDetails;

//Adding Default Data and creating list

let SignInPage = () => {
    let signinpage = document.getElementById("signin") as HTMLDivElement;
    let signuppage = document.getElementById("signup") as HTMLDivElement;

    signinpage.style.display = "block";
    signuppage.style.display = "none";
}

let SignUpPage = () => {
    let signinpage = document.getElementById("signin") as HTMLDivElement;
    let signuppage = document.getElementById("signup") as HTMLDivElement;

    signinpage.style.display = "none";
    signuppage.style.display = "block";

}

async function addUser(user: UserInfo): Promise<void> {
    const response = await fetch('http://localhost:5151/api/UserInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to add User');
    }

}

async function updateUser(id: number, user: UserInfo): Promise<void> {
    const response = await fetch(`http://localhost:5151/api/UserInfo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to update User');
    }
}

async function fetchUsers(): Promise<UserInfo[]> {
    const apiurl = 'http://localhost:5151/api/UserInfo';
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error('Failed to fetch Users');
    }
    return await response.json();
}

let newUserCreation = () => {
    let name = document.getElementById("name") as HTMLInputElement;
    let emailID = document.getElementById("emailID") as HTMLInputElement;
    let phone = document.getElementById("phone") as HTMLInputElement;
    let password = document.getElementById("password") as HTMLInputElement;
    let confirmPassword = document.getElementById("confirmpassword") as HTMLInputElement;

    //UserList.push(new UserInfo(name.value, emailID.value, phone.value, password.value));
    const user:UserInfo={
        userid :1,
        userName :name.value,
        userEmail :emailID.value,
        phone :phone.value,
        userPassword:password.value,
        balance:0
    }
    addUser(user);
    alert("Registeration Sucessfull");
    SignInPage();
}

async function existinguser() {

    const UserList = await fetchUsers();
    let mail = document.getElementById("existingMailid") as HTMLInputElement;
    let password = document.getElementById("existingPassword") as HTMLInputElement;
    let validuser = false;
    UserList.forEach(user => {
        if (user.userEmail == mail.value && user.userPassword == password.value) {
            validuser = true;
            currentUser = user;
            let form = document.getElementById("form") as HTMLDivElement;
            let afterlogin = document.getElementById("afterlogin") as HTMLDivElement;
            form.style.display = "none";
            afterlogin.style.display = "block";
            homePage();
            return false;
        }

    });
    if (!validuser) {
        alert("Invalid user Name or Password");
    }


}

let homePage = () => {
    home.style.display = "block";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";

    home.innerHTML = "Welcome " + currentUser.userName;
}

//Show Medicine List

async function fetchMedicines(): Promise<MedicineInfo[]> {
    const apiurl = 'http://localhost:5151/api/MedicineInfo';
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error('Failed to fetch Medicine');
    }
    return await response.json();
}


async function renderMedicineTable() {
    home.style.display = "none";
    medicineTable.style.display = "block";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "none";

    const MedicineList = await fetchMedicines()
    let iterate = 0;
    medicinetableBody.innerHTML = "";
    MedicineList.forEach((item) => {
        if (new Date(item.expireyDate) > new Date()) {
            if (iterate++ == 0) {
                medicinetableBody.innerHTML = `<tr>
                    <td>${item.medicineName}</td>
                    <td>${item.medicinePrice}</td>
                    <td>${item.quantity}</td>
                    <td>${item.expireyDate.split('T')[0].split('-').reverse().join('/')}</td>
                    <td><button onclick = "return showeditMedicine('${item.medicineid}')" >Edit</button>
                    <button onclick = "return deleteMedicine('${item.medicineid}')" >Delete</button>
                    </td>
                    </tr>`
            }

            else {
                medicinetableBody.innerHTML += `<tr>
                <td>${item.medicineName}</td>
                <td>${item.medicinePrice}</td>
                <td>${item.quantity}</td>
                <td>${item.expireyDate.split('T')[0].split('-').reverse().join('/')}</td>
                <td><button onclick = "showeditMedicine(${item.medicineid})" >Edit</button>
                <button onclick = "deleteMedicine(${item.medicineid})" >Delete</button>
                </td>
                </tr>`
            }

        }

    });

};

//Show Add Medicine

let showaddMedicine = () => {
    let getMedicine = document.getElementById("AddMedicine") as HTMLDivElement;
    getMedicine.style.display = "block";

    let editMedicine = document.getElementById("EditMedicine") as HTMLDivElement;
    editMedicine.style.display = "none";

};
//Add Medicine 

async function addMedicineAPI(medicine: MedicineInfo): Promise<void> {
    const response = await fetch('http://localhost:5151/api/MedicineInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to add Medicine');
    }
    renderMedicineTable();
}
let addMedicine = () => {
    let getMedicine = document.getElementById("AddMedicine") as HTMLDivElement;
    getMedicine.style.display = "block";

    let name = document.getElementById("MedcineName") as HTMLInputElement;
    let price = document.getElementById("Price") as HTMLInputElement;
    let quantity = document.getElementById("quantity") as HTMLInputElement;
    let date = document.getElementById("ExpiryDate") as HTMLInputElement;

   // MedicineList.push(new MedicineInfo(medicineName.value, parseInt(Price.value), parseInt(quantity.value), new Date(expireyDate.value)));

   const medicine:MedicineInfo={
    medicineid: 1,
    medicineName: name.value,
    medicinePrice: parseInt(price.value),
    quantity: parseInt(quantity.value),
    expireyDate: date.value,
   }

   addMedicineAPI(medicine);
   

    let form = document.getElementById("AddMedicineForm") as HTMLFormElement;
    form.reset();
    getMedicine.style.display = "none";
    return false;
};

async function showeditMedicine(id: Number) {

    let getMedicine = document.getElementById("AddMedicine") as HTMLDivElement;
    getMedicine.style.display = "none";
    const MedicineList = await fetchMedicines()
    MedicineList.forEach((medicine) => {

        if (medicine.medicineid == id) {
            let editMedicine = document.getElementById("EditMedicine") as HTMLDivElement;
            editMedicine.style.display = "block";

            editMedicine.innerHTML += `<button onclick="return editMedicine('${medicine.medicineid}')">Submit</button>`


            let medicineName = document.getElementById("EditMedcineName") as HTMLInputElement;
            let Price = document.getElementById("EditPrice") as HTMLInputElement;
            let quantity = document.getElementById("Editquantity") as HTMLInputElement;
            let expireyDate = document.getElementById("ExpiryDate") as HTMLInputElement;

            //var date = medicine.expireyDate.toISOString();

            medicineName.value = medicine.medicineName;
            Price.value = medicine.medicinePrice.toString();
            quantity.value = medicine.quantity.toString();


            //expireyDate.value = date.substring(0, 10);
        }
    })
}

async function updateMedicine(id: number, medicine: MedicineInfo): Promise<void> {
    const response = await fetch(`http://localhost:5151/api/MedicineInfo/${id}`, {
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
}

async function editMedicine(id: number) {

    let medicineName = document.getElementById("EditMedcineName") as HTMLInputElement;
    let Price = document.getElementById("EditPrice") as HTMLInputElement;
    let quantity = document.getElementById("Editquantity") as HTMLInputElement;
    let expireyDate = document.getElementById("ExpiryDate") as HTMLInputElement;

    const MedicineList = await fetchMedicines()


    const medicine: MedicineInfo = {
        medicineid: selectedMedicine.medicineid,
        medicineName: medicineName.value,
        quantity: parseInt(quantity.value),
        medicinePrice: parseInt(Price.value),
        expireyDate: expireyDate.value
    }

    let editform = document.getElementById("EditMedicineForm") as HTMLFormElement;
    editform.reset();
    
    updateMedicine(selectedMedicine.medicineid, medicine);

}



async function deleteMedcine(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5151/api/MedicineInfo/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete Medicine');
    }
    renderMedicineTable();
}




async function purchaseMedicine() {
    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "block";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "none";
    const MedicineList = await fetchMedicines()
    let iterate = 0;
    purchasetableBody.innerHTML = "";
    MedicineList.forEach((item) => {
        if (new Date(item.expireyDate) > new Date()) {
            if (iterate++ == 0) {
                purchasetableBody.innerHTML = `<tr>
                    <td>${item.medicineName}</td>
                    <td>${item.medicinePrice}</td>
                    <td>${item.quantity}</td>
                    <td>${item.expireyDate.split('T')[0].split('-').reverse().join('/')}</td>
                    <td><button onclick = "return showBuyMedicine('${item.medicineid}')" >Buy</button><br>
                    
                    </td>
                    </tr>`
            }

            else {
                purchasetableBody.innerHTML += `<tr>
                <td>${item.medicineName}</td>
                <td>${item.medicinePrice}</td>
                <td>${item.quantity}</td>
                <td>${item.expireyDate.split('T')[0].split('-').reverse().join('/')}</td>
                <td><button onclick = "return showBuyMedicine('${item.medicineid}')" >Buy</button>
                </td>
                </tr>`
            }

        }

    });
}

async function showBuyMedicine(id: number) {

    let buyMedicineform = document.getElementById("purchaseDetails") as HTMLDivElement;
    buyMedicineform.style.display = "block";
    const MedicineList = await fetchMedicines()
    MedicineList.forEach(medicine => {
        if (medicine.medicineid == id) {
            selectedMedicine = medicine;
        }
    });
    return false;
}

//Add order
async function fetchOrders(): Promise<OrderDetails[]> {
    const apiurl = 'http://localhost:5151/api/OrderDetails';
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error('Failed to fetch Orders');
    }
    return await response.json();
}

async function addOrder(order: OrderDetails): Promise<void> {
    const response = await fetch('http://localhost:5151/api/OrderDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to add Order');
    }

}

// let buyMedicine = () => {
//     let buyform = document.getElementById("purchaseform") as HTMLFormElement;
//     let buyquantity = document.getElementById("Purchacequantity") as HTMLInputElement;

//     if (parseInt(buyquantity.value) > selectedMedicine.quantity) {
//         alert("Sorry the Selected quantity is unavailable");
//     }
//     else {
//         let totalPrice = parseInt(buyquantity.value) * selectedMedicine.medicinePrice;
//         if (totalPrice > currentUser.balance) {
//             alert("Insufficaint Balance . ...Please Recharge");
//         }
//         else {
//             selectedMedicine.quantity -= parseInt(buyquantity.value);
//             currentUser.balance -= totalPrice;
//             OrderList.push(new OrderDetails(selectedMedicine.medicineID, currentUser.userID, selectedMedicine.medicineName, parseInt(buyquantity.value), new Date(), totalPrice, "Ordered"));
//             alert("Order Placed Sucessfully");
//             purchaseMedicine();
//         }
//     }
//     buyform.reset();
//     return false;
// }

async function showcancelOrder() {
    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "block";

    const OrderList = await fetchOrders()
    let orderDetails = document.getElementById("cancelorderDetails") as HTMLTableElement;

    orderDetails.innerHTML = "";

    OrderList.forEach(order => {
        if (order.userid == currentUser.userid && order.orderStatus == "Ordered") {

            orderDetails.innerHTML += `<tr><td>${order.orderid}</td>
                <td>${order.medicineName}</td>
                <td>${order.quantity}</td> 
                <td>${order.orderDate.split('T')[0].split('-').reverse().join('/')}</td>
                <td>${order.orderStatus}</td>
                <td><button onclick = "return cancelOrder('${order.orderid}')" >Cancel</button><br>`

        }
    });
}

async function cancelOrder(id: number) {


    const MedicineList = await fetchMedicines();
    const OrderList = await fetchOrders()
    OrderList.forEach(order => {
        if (order.orderid == id) {
            order.orderStatus = "Cancelled";
            currentUser.balance += order.totalPrice;
            MedicineList.forEach(medicine => {
                if (medicine.medicineid == order.medicineid) {
                    medicine.quantity += order.quantity;
                    alert("Sucessfully cancelled");

                }
            });
        }
    });
    showcancelOrder();
}

let showtopup = () => {
    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "none";

    topupBalance.style.display = "balance";


    let topup = document.getElementById("topup") as HTMLDivElement;
    topup.style.display = "block";
}

let topup = () => {
    let amount = document.getElementById("amount") as HTMLInputElement;
    

    let topupform = document.getElementById("topupform") as HTMLFormElement;
    topupform.reset();
    const user:UserInfo = {
        userid: currentUser.userid,
    userName: currentUser.userName,
    userEmail: currentUser.userEmail,
    userPassword: currentUser.userPassword,
    phone: currentUser.phone,
    balance: currentUser.balance += parseInt(amount.value)        
    }
    updateUser(currentUser.userid,user);
    return false;
}

async function showOrderHistory() {

    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "block";
    cancel.style.display = "none";

    const OrderList = await fetchOrders();
    let orderDetails = document.getElementById("orderDetails") as HTMLTableElement;

    orderDetails.innerHTML = "";

    OrderList.forEach(order => {
        if (order.userid == currentUser.userid) {

            orderDetails.innerHTML += `<tr><td>${order.orderid}</td>
                <td>${order.medicineName}</td>
                <td>${order.quantity}</td> 
                <td>${order.orderDate.split('T')[0].split('-').reverse().join('/')}</td>
                <td>${order.orderStatus}</td>`

        }
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
}