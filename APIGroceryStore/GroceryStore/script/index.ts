interface userDetails {
    userID: any;
    userName: string;
    email: string;
    password: string;
    balance: number;
    userPic: string[];
}

interface productDetails {
    productID: any;
    productName: string;
    quantity: number;
    price: number;
    purchaseDate: string;
    expiryDate: string;
    productPic: string[];
}

interface orderDetails {
    orderID: any;
    userID: number;
    productDetails: string[];
    totalPrice: number;
    orderDate: string;
}

interface cart {
    productID: number;
    productName: string;
    productQuantity: number;
    productPrice: number;
    totalProductPrice: number;
}

let cartList: cart[] = [];

async function fetchUserDetails(): Promise<userDetails[]> {

    const apiurl = "http://localhost:5067/api/userDetails";
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

async function fetchProductDetails(): Promise<productDetails[]> {

    const apiurl = "http://localhost:5067/api/productDetails";
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

async function fetchOrderDetails(): Promise<orderDetails[]> {

    const apiurl = "http://localhost:5067/api/orderDetails";
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

async function addUserDetails(userDetail: userDetails) {
    const response = await fetch('http://localhost:5067/api/userDetails', {
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

async function addProductDetails(productDetail: productDetails) {
    const response = await fetch('http://localhost:5067/api/productDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productDetail)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to add personal Detail');
    }
}

async function addOrderDetails(orderDetail: orderDetails) {
    const response = await fetch('http://localhost:5067/api/orderDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetail)
    }
    );
    if (!response.ok) {
        throw new Error('Failed to add personal Detail');
    }
}

async function deleteProductDetails(productID: number): Promise<void> {
    const response = await fetch(`http://localhost:5067/api/productDetails/${productID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete Medicine');
    }
    renderProductTable();
}

async function updateUserDetails(userID: number, userDetail: userDetails) {
    const response = await fetch(`http://localhost:5067/api/userDetails/${userID}`, {
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

async function updateProductDetails(productID: number, productDetail: productDetails) {
    const response = await fetch(`http://localhost:5067/api/productDetails/${productID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productDetail)
    });
    if (!response.ok) {
        throw new Error('Failed to update User');
    }
}

async function updateOrderDetails(orderID: number, orderDetail: orderDetails) {
    const response = await fetch(`http://localhost:5067/api/orderDetails/${orderID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetail)
    });
    if (!response.ok) {
        throw new Error('Failed to update User');
    }
}

let signup = document.getElementById("signup") as HTMLDivElement;
let signin = document.getElementById("signin") as HTMLDivElement;

let topbar = document.getElementById("afterlogin") as HTMLDivElement;

let home = document.getElementById("home") as HTMLDivElement;

let showBalance = document.getElementById("showBalance") as HTMLDivElement;

let topup = document.getElementById("topup") as HTMLDivElement;

let viewProducts = document.getElementById("viewProducts") as HTMLInputElement;
viewProducts.style.display = "none";

let buyProducts = document.getElementById("buyProducts") as HTMLInputElement;


let cart = document.getElementById("cart") as HTMLDivElement;

let askQuantity = document.getElementById("askQuantity") as HTMLElement;

let orderHistory = document.getElementById("orderHistory") as HTMLDivElement;
orderHistory.style.display = "none";

askQuantity.style.display = "none";


let currentUser: userDetails;
let currentProduct: productDetails;
let currentOrder: orderDetails;

async function signUp() {
    signup.style.display = "block";
    signin.style.display = "none";
}

async function signIn() {

    signup.style.display = "none";
    signin.style.display = "block";

}

let signUpForm = document.getElementById("signUpForm") as HTMLFormElement;
signUpForm.addEventListener("submit", (event) => {

    event.preventDefault();
    let userName = document.getElementById("userName") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;

    let password = document.getElementById("password") as HTMLInputElement;
    let confirmPassword = document.getElementById("confirmpassword") as HTMLInputElement;
    let userPhoto = document.getElementById("userProfilePic") as HTMLInputElement;

    let photoInput: any = userPhoto.files?.[0];
    let reader = new FileReader();
    reader.readAsDataURL(photoInput);

    if (userName.value == "" || email.value == "" || password.value == "") {
        alert("Fill all the data");
    }



    else {

        reader.onload = function (event) {
            const base64String = event.target?.result as string;

            const userDetail: userDetails = {
                userID: undefined,
                userName: userName.value,
                email: email.value,
                password: password.value,
                balance: 0,
                userPic: [base64String]
            }

            addUserDetails(userDetail);

            alert("Registration Sucessfull");

            signup.style.display = "none";
            signin.style.display = "block";

        }
    }



})
// async function createUser() {


//     let userName = document.getElementById("userName") as HTMLInputElement;
//     let email = document.getElementById("email") as HTMLInputElement;

//     let password = document.getElementById("password") as HTMLInputElement;
//     let confirmPassword = document.getElementById("confirmpassword") as HTMLInputElement;

//     if (userName.value == "" || email.value == "" || password.value == "") {
//         alert("Fill all the data");
//     }

//     else {
//         const userDetail: userDetails = {
//             userID: 0,
//             userName: userName.value,
//             email: email.value,
//             password: password.value,
//             balance: 0
//         }

//         addUserDetails(userDetail);

//         alert("Registration Sucessfull");

//         signup.style.display = "none";
//         signin.style.display = "block";
//     }

// }


async function exsistingUser() {

    let userDetailList = await fetchUserDetails();

    let email = document.getElementById("oldEmail") as HTMLInputElement;

    let password = document.getElementById("oldPassword") as HTMLInputElement;

    let valid: boolean = true;
    userDetailList.forEach(userDetail => {

        if (userDetail.email == email.value && userDetail.password == password.value) {
            currentUser = userDetail;
            valid = false;
            alert("login sucessfull");
            let loginForm = document.getElementById("loginForm") as HTMLDivElement;
            loginForm.style.display = "none"
            topbar.style.display = "block";

            homePage();
        }

    });
    if (valid) {
        alert("Invalid user name or password");
    }


}

let homePage = function () {

    home.style.display = "block";
    showBalance.style.display = "none";
    topup.style.display = "none";
    viewProducts.style.display = "none"
    cart.style.display = "none";
    buyProducts.style.display = "none";
    askQuantity.style.display = "none";
    orderHistory.style.display = "none";
    let profileImg = document.getElementById("profileImg") as HTMLImageElement;

    home.innerHTML = "Welcome " + currentUser.userName;
    profileImg.src=currentUser.userPic[0];


}

async function renderProductTable() {

    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "none";
    viewProducts.style.display = "block"
    cart.style.display = "none";
    buyProducts.style.display = "none";
    askQuantity.style.display = "none";
    orderHistory.style.display = "none";

    let productDetailList = await fetchProductDetails();

    let productTable = document.getElementById("productsTableBody") as HTMLTableElement;

    let sNo = 0;
    productTable.innerHTML = "";
    productDetailList.forEach(product => {

        productTable.innerHTML += `<tr> <td id="sno"> ${++sNo}</td>
        <td><img width="50%" src="${product.productPic}"></td>
        <td> ${product.productName}</td>
        <td> ${product.quantity}</td>
        <td> ${product.price}</td>
        <td> ${product.purchaseDate.split('T')[0]}</td>
        <td> ${product.expiryDate.split('T')[0]}</td>
        <td> <button class="userProfilePicUpload" onclick = showEditForm(${product.productID})> Edit</button>
         <button class="userProfilePicUpload" onclick = deleteProductDetails(${product.productID})> Delete</button></td> </tr>`

    });

}
let addProductDiv = document.getElementById("addProduct") as HTMLDivElement;
addProductDiv.style.display = "none";

let showAddForm = function () {
    let addForm = document.getElementById("addForm") as HTMLFormElement;
    addProductDiv.style.display = "block";
}

let addFormID = document.getElementById("addFormID") as HTMLFormElement;
addFormID.addEventListener("submit", (event) => {
    event.preventDefault();
    let addProductName = document.getElementById("addProductName") as HTMLInputElement;
    let addProductQuantity = document.getElementById("addProductQuantity") as HTMLInputElement;

    let addProductPrice = document.getElementById("addProductPrice") as HTMLInputElement;

    let addProductPurchaseDate: any = document.getElementById("addProductPurchaseDate") as HTMLInputElement;
    addProductPurchaseDate = addProductPurchaseDate.value;

    let addProductExpiryDate: any = document.getElementById("addProductExpiryDate") as HTMLInputElement;
    addProductExpiryDate = addProductExpiryDate.value;

    let addProductPic = document.getElementById("addProductPic") as HTMLInputElement;
    let photoInput: any = addProductPic.files?.[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(photoInput);

    reader.onload = function (event) {

        const base64String = event.target?.result as string;

        const productDetail: productDetails = {
            productID: undefined,
            productName: addProductName.value,
            quantity: parseInt(addProductQuantity.value),
            price: parseFloat(addProductPrice.value),
            purchaseDate: new Date(addProductPurchaseDate).toISOString(),
            expiryDate: new Date(addProductExpiryDate).toISOString(),
            productPic: [base64String]
        }

        addProductDetails(productDetail);
        alert("Sucessfully added");
        addProductDiv.style.display = "none";

        let addFormID = document.getElementById("addFormID") as HTMLFormElement;
        addFormID.reset();
        renderProductTable();
    }
})
// async function addProduct() {
//     let addProductName = document.getElementById("addProductName") as HTMLInputElement;
//     let addProductQuantity = document.getElementById("addProductQuantity") as HTMLInputElement;

//     let addProductPrice = document.getElementById("addProductPrice") as HTMLInputElement;

//     let addProductPurchaseDate: any = document.getElementById("addProductPurchaseDate") as HTMLInputElement;
//     addProductPurchaseDate = addProductPurchaseDate.value;

//     let addProductExpiryDate: any = document.getElementById("addProductExpiryDate") as HTMLInputElement;
//     addProductExpiryDate = addProductExpiryDate.value;



//     const productDetail: productDetails = {
//         productID: 0,
//         productName: addProductName.value,
//         quantity: parseInt(addProductQuantity.value),
//         price: parseFloat(addProductPrice.value),
//         purchaseDate: new Date(addProductPurchaseDate).toISOString(),
//         expiryDate: new Date(addProductExpiryDate).toISOString()
//     }

//     addProductDetails(productDetail);
//     alert("Sucessfully added");
//     addProductDiv.style.display = "none";

//     let addFormID = document.getElementById("addFormID") as HTMLFormElement;
//     addFormID.reset();
//     renderProductTable();





// }

async function renderBuyTable() {

    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "none";
    viewProducts.style.display = "none"
    cart.style.display = "none";
    buyProducts.style.display = "block";
    askQuantity.style.display = "none";
    orderHistory.style.display = "none";

    let productDetailList = await fetchProductDetails();

    let productTable = document.getElementById("buyProductsBody") as HTMLTableElement;

    let sNo = 0;
    productTable.innerHTML = "";

    productDetailList.forEach(product => {

        productTable.innerHTML += `<tr> <td id="sno"> ${++sNo}</td>
        <td><img width="50%" src="${product.productPic}"></td>
        <td id="pName"> ${product.productName}</td>
        <td> ${product.quantity}</td>
        <td> ${product.price}</td>
        <td> <button class="userProfilePicUpload" onclick = getQuantity(${product.productID}) > Add to cart </button>
        </td> </tr>`

    });
}

async function getQuantity(id: number) {

    let productDetail = await fetchProductDetails();

    productDetail.forEach(product => {
        if (product.productID == id) {
            currentProduct = product;
        }

    });

    askQuantity.style.display = "block";

    let selectedProduct = document.getElementById("selectedProduct") as HTMLLabelElement;

    selectedProduct.innerHTML = "Selected Product : " + currentProduct.productName;

}

async function addCart() {

    askQuantity.style.display = "none";

    let productQuantity = document.getElementById("productQuantity") as HTMLInputElement;
    let cartItem: cart = {
        productID: currentProduct.productID,
        productQuantity: parseInt(productQuantity.value),
        productPrice: currentProduct.price,
        productName: currentProduct.productName,
        totalProductPrice: parseInt(productQuantity.value) * (currentProduct.price)
    }

    cartList.push(cartItem);
    productQuantity.value="";
}

let showCart = function () {

    if (cartList.length == 0) {
        alert("No items in the cart to show");
    }
    else {

        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        viewProducts.style.display = "none"
        cart.style.display = "block";
        buyProducts.style.display = "none";
        askQuantity.style.display = "none";
        orderHistory.style.display = "none";


        let cartTableBody = document.getElementById("cartTableBody") as HTMLTableElement;

        let sNo = 0;

        cartTableBody.innerHTML = "";

        cartList.forEach(cartItem => {

            cartTableBody.innerHTML += `<tr> <td id="sno"> ${++sNo}</td>
        
        <td id="pName"> ${cartItem.productName}</td>
        <td> ${cartItem.productQuantity} </td>
        <td> ${cartItem.productPrice}</td>
        <td> ${cartItem.totalProductPrice}</td>
        </tr>`

        });

    }

}


async function confirmOrder() {

    let productDetailList = await fetchProductDetails();

    let totalOrderPrice: number = 0;

    let orderProductDetails: string[] = [];

    let proceedPurchase = true;

    cartList.forEach(cartItem => {

        productDetailList.forEach(product => {
            if (cartItem.productID == product.productID) {
                if (product.quantity < cartItem.productQuantity) {
                    alert("Selected Quantity for " + product.productName + "is unavailabe");
                    proceedPurchase = false;
                }
                else {
                    orderProductDetails.push(cartItem.productName + "/" + cartItem.productQuantity + "/" + cartItem.productPrice);
                    totalOrderPrice += cartItem.totalProductPrice;
                }
            }
        });
    });

    if (totalOrderPrice > currentUser.balance) {
        alert("Insufficant Balance please recharge and continue");
        proceedPurchase = false;
        showTopup();
    }
    else if (proceedPurchase) {

        cartList.forEach(cartItem => {

            productDetailList.forEach(product => {
                if (cartItem.productID == product.productID) {

                    product.quantity -= cartItem.productQuantity;
                    updateProductDetails(product.productID, product);

                }
            });
        });

        let orderDetail: orderDetails = {
            orderID: undefined,
            userID: currentUser.userID,
            productDetails: orderProductDetails,
            totalPrice: totalOrderPrice,
            orderDate: new Date().toISOString()
        }

        currentUser.balance -= totalOrderPrice;
        updateUserDetails(currentUser.userID, currentUser);

        addOrderDetails(orderDetail);

        cartList = [];
        showOrderHistory();

        alert("Ordered Successfull");
    }

}

let viewBalance = function () {

    home.style.display = "none";
    showBalance.style.display = "block";
    topup.style.display = "none";
    viewProducts.style.display = "none"
    cart.style.display = "none";
    buyProducts.style.display = "none";
    askQuantity.style.display = "none";
    orderHistory.style.display = "none";

    showBalance.innerHTML = "Your current Balance is " + currentUser.balance;
}

let showTopup = function () {
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "block";
    viewProducts.style.display = "none"
    cart.style.display = "none";
    buyProducts.style.display = "none";
    askQuantity.style.display = "none";
    orderHistory.style.display = "none";
}

let topupWallet = function () {
    let amount = document.getElementById("amount") as HTMLInputElement;

    let topupform = document.getElementById("topupform") as HTMLFormElement;
    currentUser.balance += parseFloat(amount.value);
    updateUserDetails(currentUser.userID, currentUser);
    alert("Topup sucessfull")
    topupform.reset()
}

async function showOrderHistory() {


    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "none";
    viewProducts.style.display = "none"
    cart.style.display = "none";
    buyProducts.style.display = "none";
    askQuantity.style.display = "none";
    orderHistory.style.display = "block";

    let orderDetailList = await fetchOrderDetails();


    let sNo = 0;
    let i = 0;

    let productName: string = "";
    let quantity = "";
    let price = "";
    orderHistory.innerHTML = ` <h1>User ID  : ${currentUser.userID}</h1><br><br>`;

    orderDetailList.forEach(orderDetail => {

        if (orderDetail.userID == currentUser.userID) {
            orderHistory.innerHTML += `
        <h1>Order ID : ${orderDetail.orderID}</h1>
        <br>
        <br>
        <button class="userProfilePicUpload" onclick=downloadToCSV(OrderTable${orderDetail.orderID}) > Download </button>
        <table id="OrderTable${orderDetail.orderID}" class="orderHistoryTable">
        <tr>
            <th id="pName">Product Name</th>
            <th>Product Quantity</th>
            <th>Price</th>
        </tr>
        <tbody id="orderProductDetails${orderDetail.orderID}">

        </tbody>
    </table>
    <h3>Total Price : ${orderDetail.totalPrice}</h3>`

            let orderProductDetails = document.getElementById("orderProductDetails" + orderDetail.orderID) as HTMLTableElement;
            orderDetail.productDetails.forEach(productDetail => {

                orderProductDetails.innerHTML += `<tr><td>${productDetail.split('/')[0]}</td>
        <td>${productDetail.split('/')[1]}</td>
        <td>${productDetail.split('/')[2]}</td></tr>`

            });

        }


    });
}

let downloadToCSV = function(tableID:string){
    
}