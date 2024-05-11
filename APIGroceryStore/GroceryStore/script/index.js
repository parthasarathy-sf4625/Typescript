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
let cartList = [];
function fetchUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = "http://localhost:5067/api/userDetails";
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchProductDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = "http://localhost:5067/api/productDetails";
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchOrderDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiurl = "http://localhost:5067/api/orderDetails";
        const response = yield fetch(apiurl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function addUserDetails(userDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5067/api/userDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to add personal Detail');
        }
    });
}
function addProductDetails(productDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5067/api/productDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to add personal Detail');
        }
    });
}
function addOrderDetails(orderDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5067/api/orderDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to add personal Detail');
        }
    });
}
function deleteProductDetails(productID) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5067/api/productDetails/${productID}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete Medicine');
        }
        renderProductTable();
    });
}
function updateUserDetails(userID, userDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5067/api/userDetails/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function updateProductDetails(productID, productDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5067/api/productDetails/${productID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function updateOrderDetails(orderID, orderDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5067/api/orderDetails/${orderID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetail)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
let signup = document.getElementById("signup");
let signin = document.getElementById("signin");
let topbar = document.getElementById("afterlogin");
let home = document.getElementById("home");
let showBalance = document.getElementById("showBalance");
let topup = document.getElementById("topup");
let viewProducts = document.getElementById("viewProducts");
viewProducts.style.display = "none";
let buyProducts = document.getElementById("buyProducts");
let cart = document.getElementById("cart");
let askQuantity = document.getElementById("askQuantity");
let orderHistory = document.getElementById("orderHistory");
orderHistory.style.display = "none";
askQuantity.style.display = "none";
let currentUser;
let currentProduct;
let currentOrder;
function signUp() {
    return __awaiter(this, void 0, void 0, function* () {
        signup.style.display = "block";
        signin.style.display = "none";
    });
}
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        signup.style.display = "none";
        signin.style.display = "block";
    });
}
let signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", (event) => {
    var _a;
    event.preventDefault();
    let userName = document.getElementById("userName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmpassword");
    let userPhoto = document.getElementById("userProfilePic");
    let photoInput = (_a = userPhoto.files) === null || _a === void 0 ? void 0 : _a[0];
    let reader = new FileReader();
    reader.readAsDataURL(photoInput);
    if (userName.value == "" || email.value == "" || password.value == "") {
        alert("Fill all the data");
    }
    else {
        reader.onload = function (event) {
            var _a;
            const base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            const userDetail = {
                userID: undefined,
                userName: userName.value,
                email: email.value,
                password: password.value,
                balance: 0,
                userPic: [base64String]
            };
            addUserDetails(userDetail);
            alert("Registration Sucessfull");
            signup.style.display = "none";
            signin.style.display = "block";
        };
    }
});
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
function exsistingUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let userDetailList = yield fetchUserDetails();
        let email = document.getElementById("oldEmail");
        let password = document.getElementById("oldPassword");
        let valid = true;
        userDetailList.forEach(userDetail => {
            if (userDetail.email == email.value && userDetail.password == password.value) {
                currentUser = userDetail;
                valid = false;
                alert("login sucessfull");
                let loginForm = document.getElementById("loginForm");
                loginForm.style.display = "none";
                topbar.style.display = "block";
                homePage();
            }
        });
        if (valid) {
            alert("Invalid user name or password");
        }
    });
}
let homePage = function () {
    home.style.display = "block";
    showBalance.style.display = "none";
    topup.style.display = "none";
    viewProducts.style.display = "none";
    cart.style.display = "none";
    buyProducts.style.display = "none";
    askQuantity.style.display = "none";
    orderHistory.style.display = "none";
    let profileImg = document.getElementById("profileImg");
    home.innerHTML = "Welcome " + currentUser.userName;
    profileImg.src = currentUser.userPic[0];
};
function renderProductTable() {
    return __awaiter(this, void 0, void 0, function* () {
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        viewProducts.style.display = "block";
        cart.style.display = "none";
        buyProducts.style.display = "none";
        askQuantity.style.display = "none";
        orderHistory.style.display = "none";
        let productDetailList = yield fetchProductDetails();
        let productTable = document.getElementById("productsTableBody");
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
         <button class="userProfilePicUpload" onclick = deleteProductDetails(${product.productID})> Delete</button></td> </tr>`;
        });
    });
}
let addProductDiv = document.getElementById("addProduct");
addProductDiv.style.display = "none";
let showAddForm = function () {
    let addForm = document.getElementById("addForm");
    addProductDiv.style.display = "block";
};
let addFormID = document.getElementById("addFormID");
addFormID.addEventListener("submit", (event) => {
    var _a;
    event.preventDefault();
    let addProductName = document.getElementById("addProductName");
    let addProductQuantity = document.getElementById("addProductQuantity");
    let addProductPrice = document.getElementById("addProductPrice");
    let addProductPurchaseDate = document.getElementById("addProductPurchaseDate");
    addProductPurchaseDate = addProductPurchaseDate.value;
    let addProductExpiryDate = document.getElementById("addProductExpiryDate");
    addProductExpiryDate = addProductExpiryDate.value;
    let addProductPic = document.getElementById("addProductPic");
    let photoInput = (_a = addProductPic.files) === null || _a === void 0 ? void 0 : _a[0];
    let reader = new FileReader();
    reader.readAsDataURL(photoInput);
    reader.onload = function (event) {
        var _a;
        const base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        const productDetail = {
            productID: undefined,
            productName: addProductName.value,
            quantity: parseInt(addProductQuantity.value),
            price: parseFloat(addProductPrice.value),
            purchaseDate: new Date(addProductPurchaseDate).toISOString(),
            expiryDate: new Date(addProductExpiryDate).toISOString(),
            productPic: [base64String]
        };
        addProductDetails(productDetail);
        alert("Sucessfully added");
        addProductDiv.style.display = "none";
        let addFormID = document.getElementById("addFormID");
        addFormID.reset();
        renderProductTable();
    };
});
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
function renderBuyTable() {
    return __awaiter(this, void 0, void 0, function* () {
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        viewProducts.style.display = "none";
        cart.style.display = "none";
        buyProducts.style.display = "block";
        askQuantity.style.display = "none";
        orderHistory.style.display = "none";
        let productDetailList = yield fetchProductDetails();
        let productTable = document.getElementById("buyProductsBody");
        let sNo = 0;
        productTable.innerHTML = "";
        productDetailList.forEach(product => {
            productTable.innerHTML += `<tr> <td id="sno"> ${++sNo}</td>
        <td><img width="50%" src="${product.productPic}"></td>
        <td id="pName"> ${product.productName}</td>
        <td> ${product.quantity}</td>
        <td> ${product.price}</td>
        <td> <button class="userProfilePicUpload" onclick = getQuantity(${product.productID}) > Add to cart </button>
        </td> </tr>`;
        });
    });
}
function getQuantity(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let productDetail = yield fetchProductDetails();
        productDetail.forEach(product => {
            if (product.productID == id) {
                currentProduct = product;
            }
        });
        askQuantity.style.display = "block";
        let selectedProduct = document.getElementById("selectedProduct");
        selectedProduct.innerHTML = "Selected Product : " + currentProduct.productName;
    });
}
function addCart() {
    return __awaiter(this, void 0, void 0, function* () {
        askQuantity.style.display = "none";
        let productQuantity = document.getElementById("productQuantity");
        let cartItem = {
            productID: currentProduct.productID,
            productQuantity: parseInt(productQuantity.value),
            productPrice: currentProduct.price,
            productName: currentProduct.productName,
            totalProductPrice: parseInt(productQuantity.value) * (currentProduct.price)
        };
        cartList.push(cartItem);
        productQuantity.value = "";
    });
}
let showCart = function () {
    if (cartList.length == 0) {
        alert("No items in the cart to show");
    }
    else {
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        viewProducts.style.display = "none";
        cart.style.display = "block";
        buyProducts.style.display = "none";
        askQuantity.style.display = "none";
        orderHistory.style.display = "none";
        let cartTableBody = document.getElementById("cartTableBody");
        let sNo = 0;
        cartTableBody.innerHTML = "";
        cartList.forEach(cartItem => {
            cartTableBody.innerHTML += `<tr> <td id="sno"> ${++sNo}</td>
        
        <td id="pName"> ${cartItem.productName}</td>
        <td> ${cartItem.productQuantity} </td>
        <td> ${cartItem.productPrice}</td>
        <td> ${cartItem.totalProductPrice}</td>
        </tr>`;
        });
    }
};
function confirmOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        let productDetailList = yield fetchProductDetails();
        let totalOrderPrice = 0;
        let orderProductDetails = [];
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
            let orderDetail = {
                orderID: undefined,
                userID: currentUser.userID,
                productDetails: orderProductDetails,
                totalPrice: totalOrderPrice,
                orderDate: new Date().toISOString()
            };
            currentUser.balance -= totalOrderPrice;
            updateUserDetails(currentUser.userID, currentUser);
            addOrderDetails(orderDetail);
            cartList = [];
            showOrderHistory();
            alert("Ordered Successfull");
        }
    });
}
let viewBalance = function () {
    home.style.display = "none";
    showBalance.style.display = "block";
    topup.style.display = "none";
    viewProducts.style.display = "none";
    cart.style.display = "none";
    buyProducts.style.display = "none";
    askQuantity.style.display = "none";
    orderHistory.style.display = "none";
    showBalance.innerHTML = "Your current Balance is " + currentUser.balance;
};
let showTopup = function () {
    home.style.display = "none";
    showBalance.style.display = "none";
    topup.style.display = "block";
    viewProducts.style.display = "none";
    cart.style.display = "none";
    buyProducts.style.display = "none";
    askQuantity.style.display = "none";
    orderHistory.style.display = "none";
};
let topupWallet = function () {
    let amount = document.getElementById("amount");
    let topupform = document.getElementById("topupform");
    currentUser.balance += parseFloat(amount.value);
    updateUserDetails(currentUser.userID, currentUser);
    alert("Topup sucessfull");
    topupform.reset();
};
function showOrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        home.style.display = "none";
        showBalance.style.display = "none";
        topup.style.display = "none";
        viewProducts.style.display = "none";
        cart.style.display = "none";
        buyProducts.style.display = "none";
        askQuantity.style.display = "none";
        orderHistory.style.display = "block";
        let orderDetailList = yield fetchOrderDetails();
        let sNo = 0;
        let i = 0;
        let productName = "";
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
    <h3>Total Price : ${orderDetail.totalPrice}</h3>`;
                let orderProductDetails = document.getElementById("orderProductDetails" + orderDetail.orderID);
                orderDetail.productDetails.forEach(productDetail => {
                    orderProductDetails.innerHTML += `<tr><td>${productDetail.split('/')[0]}</td>
        <td>${productDetail.split('/')[1]}</td>
        <td>${productDetail.split('/')[2]}</td></tr>`;
                });
            }
        });
    });
}
let downloadToCSV = function (tableID) {
};
