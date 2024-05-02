let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 0;
let medicinetableBody = document.getElementById("medicineTable") as HTMLTableElement;


//User Info Class
class UserInfo {
    userID: string;
    userEmail: string;
    userPassword: string;
    phone: string;

    constructor(paramuserEmail: string, paramuserPassword: string, paramPhone: string) {
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

//Adding Default Data and creating list

let MedicineList: MedicineInfo[] = [];
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 5, 29)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 3, 29)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2024, 5, 29)));

let UserList: UserInfo[] = [];

UserList.push(new UserInfo("Kal el", "krypton", "9876543210"));
UserList.push(new UserInfo("Bruce Wayne", "thedarkknight", "7574893947"));

let currentUser: UserInfo;


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

}
let existinguser = () => {
    let form = document.getElementById("form") as HTMLDivElement;
    let afterlogin = document.getElementById("afterlogin") as HTMLDivElement;
    form.style.display = "none";
    afterlogin.style.display = "block";
    currentUser = UserList[0];
    homePage();
}

let homePage = () => {
    let home = document.getElementById("home") as HTMLDivElement;
    home.style.display = "block";
    home.innerHTML = "Welcome " + currentUser.userID;
}

//Show Medicine List
let renderMedicineTable = () => {


    let home = document.getElementById("home") as HTMLDivElement;
    home.style.display = "none";

    let medicineTable = document.getElementById("medicineDetails") as HTMLDivElement;
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
        </tr>`
        }

    });
};

//Add Medicine

let showaddMedicine = () =>{
    let getMedicine = document.getElementById("AddMedicine") as HTMLDivElement;
    getMedicine.style.display="block";
}

let addMedicine = () =>{
    let getMedicine = document.getElementById("AddMedicine") as HTMLDivElement;
    getMedicine.style.display="none";
    let MedicineName = document.getElementById("MedcineName") as HTMLInputElement;
    let Price = document.getElementById("Price") as HTMLInputElement;
    let Quantity = document.getElementById("Quantity") as HTMLInputElement;
    let ExpireyDate = document.getElementById("ExpiryDate") as HTMLInputElement;

    MedicineList.push(new MedicineInfo(MedicineName,Price,Quantity,ExpireyDate));
}
