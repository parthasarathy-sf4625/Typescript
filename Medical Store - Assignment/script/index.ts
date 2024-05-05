let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 0;
let OrderIdAutoIncrement = 0;



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



//User Info Class
class UserInfo {
    userID: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    phone: string;
    balance: number;

    constructor(paramName: string, paramuserEmail: string, paramuserPassword: string, paramPhone: string) {
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

    MedicineID: string;
    MedicineName: string;
    MedicinePrice: number;
    Quantity: number;
    ExpireyDate: Date;

    constructor(paramMedicineName: string, paramMedicinePrice: number, paramQuantity: number, paramExpireyDate: Date) {
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

    OrderID: string;
    MedicineID: string;
    UserID: string;
    MedicineName: string;
    Quantity: number;
    OrderDate: Date;
    TotalPrice: number;
    OrderStatus: string;

    constructor(paramMedicineID: string, paramUserID: string, paramMedicineName: string, paramQuantity: number, paramOrderDate: Date, paramTotalPrice: number, paramOrderStatus: string) {
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

let MedicineList: MedicineInfo[] = [];
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 3, 29)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2024, 5, 29)));

let UserList: UserInfo[] = [];

UserList.push(new UserInfo("Kal el", "manofsteel", "krypton", "9876543210"));
UserList.push(new UserInfo("Bruce Wayne", "darkknight", "thedarkknight", "7574893947"));

let OrderList: OrderDetails[] = [];



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

let newUserCreation = () => {
    let name = document.getElementById("name") as HTMLInputElement;
    let emailID = document.getElementById("emailID") as HTMLInputElement;
    let phone = document.getElementById("phone") as HTMLInputElement;
    let password = document.getElementById("password") as HTMLInputElement;
    let confirmPassword = document.getElementById("confirmpassword") as HTMLInputElement;

    UserList.push(new UserInfo(name.value, emailID.value, phone.value, password.value));
    alert("Registeration Sucessfull");
    SignInPage();
}
let existinguser = () => {
   


    let mail = document.getElementById("existingMailid") as HTMLInputElement;
    let password = document.getElementById("existingPassword") as HTMLInputElement;
    let validuser = false;
    UserList.forEach(user => {
            if(user.userEmail == mail.value && user.userPassword == password.value){
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
    if(!validuser){
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
                    </tr>`
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
//Show Add Medicine
let addMedicine = () => {
    let getMedicine = document.getElementById("AddMedicine") as HTMLDivElement;
    getMedicine.style.display = "block";

    let MedicineName = document.getElementById("MedcineName") as HTMLInputElement;
    let Price = document.getElementById("Price") as HTMLInputElement;
    let Quantity = document.getElementById("Quantity") as HTMLInputElement;
    let ExpireyDate = document.getElementById("ExpiryDate") as HTMLInputElement;

    MedicineList.push(new MedicineInfo(MedicineName.value, parseInt(Price.value), parseInt(Quantity.value), new Date(ExpireyDate.value)));
    renderMedicineTable();

    let form = document.getElementById("AddMedicineForm") as HTMLFormElement;
    form.reset();
    getMedicine.style.display = "none";
    return false;
};

let showeditMedicine = (id: string) => {
    let getMedicine = document.getElementById("AddMedicine") as HTMLDivElement;
    getMedicine.style.display = "none";
    MedicineList.forEach((medicine) => {

        if (medicine.MedicineID == id) {
            let editMedicine = document.getElementById("EditMedicine") as HTMLDivElement;
            editMedicine.style.display = "block";

            editMedicine.innerHTML += `<button onclick="return editMedicine('${medicine.MedicineID}')">Submit</button>`

            
            let MedicineName = document.getElementById("EditMedcineName") as HTMLInputElement;
            let Price = document.getElementById("EditPrice") as HTMLInputElement;
            let Quantity = document.getElementById("EditQuantity") as HTMLInputElement;
            let ExpireyDate = document.getElementById("ExpiryDate") as HTMLInputElement;

            var date = medicine.ExpireyDate.toISOString();

            MedicineName.value = medicine.MedicineName;
            Price.value = medicine.MedicinePrice.toString();
            Quantity.value = medicine.Quantity.toString();
            ExpireyDate.value =date.substring(0,10);
            return false;
        }
    })
}

let editMedicine = (id: string) => {

    let MedicineName = document.getElementById("EditMedcineName") as HTMLInputElement;
    let Price = document.getElementById("EditPrice") as HTMLInputElement;
    let Quantity = document.getElementById("EditQuantity") as HTMLInputElement;
    let ExpireyDate = document.getElementById("ExpiryDate") as HTMLInputElement;

    MedicineList.forEach(medicine => {
        if (medicine.MedicineID == id) {
            medicine.MedicineName = MedicineName.value;
            medicine.MedicinePrice = parseInt(Price.value);
            var date
            medicine.Quantity = parseInt(Quantity.value);
            medicine.ExpireyDate = new Date(ExpireyDate.value);
        }

    });

    let editform = document.getElementById("EditMedicineForm") as HTMLFormElement;
    editform.reset();
    renderMedicineTable();
    return false;
}

let deleteMedicine = (id: string) => {
    MedicineList = MedicineList.filter((item) => item.MedicineID !== id);
    console.log(MedicineList.length);
    renderMedicineTable();
}


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
                    </tr>`
            }

            else {
                purchasetableBody.innerHTML += `<tr>
                <td>${item.MedicineName}</td>
                <td>${item.MedicinePrice}</td>
                <td>${item.Quantity}</td>
                <td>${item.ExpireyDate.toLocaleDateString()}</td>
                <td><button onclick = "return showBuyMedicine('${item.MedicineID}')" >Buy</button>
                </td>
                </tr>`
            }

        }

    });

}

let showBuyMedicine = (id: string) => {

    let buyMedicineform = document.getElementById("purchaseDetails") as HTMLDivElement;
    buyMedicineform.style.display = "block";

    MedicineList.forEach(medicine => {
        if (medicine.MedicineID == id) {
            selectedMedicine = medicine;
        }

    });
}

let buyMedicine = () => {
    let buyform = document.getElementById("purchaseform") as HTMLFormElement;
    let buyQuantity = document.getElementById("Purchacequantity") as HTMLInputElement;

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
}

let showcancelOrder = () => {
    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "none";
    cancel.style.display = "block";

    let orderDetails = document.getElementById("cancelorderDetails") as HTMLTableElement;

    orderDetails.innerHTML = "";

    OrderList.forEach(order => {
        if (order.UserID == currentUser.userID && order.OrderStatus == "Ordered") {

            orderDetails.innerHTML += `<tr><td>${order.OrderID}</td>
                <td>${order.MedicineName}</td>
                <td>${order.Quantity}</td> 
                <td>${order.OrderDate.toLocaleDateString()}</td>
                <td>${order.OrderStatus}</td>
                <td><button onclick = "return cancelOrder('${order.OrderID}')" >Cancel</button><br>`

        }
    });
}

let cancelOrder = (id: string) => {
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
    currentUser.balance += parseInt(amount.value);

    let topupform = document.getElementById("topupform") as HTMLFormElement;
    topupform.reset();
    return false;
}

let showOrderHistory = () => {

    home.style.display = "none";
    medicineTable.style.display = "none";
    purchaseTable.style.display = "none";
    showuserBalance.style.display = "none";
    topupBalance.style.display = "none";
    orderHistory.style.display = "block";
    cancel.style.display = "none";

    let orderDetails = document.getElementById("orderDetails") as HTMLTableElement;

    orderDetails.innerHTML = "";

    OrderList.forEach(order => {
        if (order.UserID == currentUser.userID) {

            orderDetails.innerHTML += `<tr><td>${order.OrderID}</td>
                <td>${order.MedicineName}</td>
                <td>${order.Quantity}</td> 
                <td>${order.OrderDate.toLocaleDateString()}</td>
                <td>${order.OrderStatus}</td>`

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