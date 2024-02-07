/*JS - Nav Toggle (MQ)*/
var NavItems = document.getElementById("navitems");

NavItems.style.maxHeight="0vw";

    function navtoggle(){
        if(NavItems.style.maxHeight=="0vw"){
            NavItems.style.maxHeight="20vw";
        } else{
            NavItems.style.maxHeight="0vw";
        }
    }

/*JS - Free Shipping Reminder*/
function openReminder(){
    var reminder = document.getElementById("freeshipping-reminder");
        if (reminder.style.display==="none" || reminder.style.display ===""){
            reminder.style.display = "block";
        } else {
            reminder.style.display = "none";
        }
}

/*JS -  Accnt Toggle*/
var SignupForm=document.getElementById("SignupForm");
var LoginForm=document.getElementById("LoginForm");

    function signup(){
        SignupForm.style.transform="translateX(0px)";
        LoginForm.style.transform="translateX(0px)";
    }

    function login(){
        var screenSize=window.innerWidth;
        if (screenSize<=800){
            SignupForm.style.transform="translateX(77vw)";
            LoginForm.style.transform="translateX(77vw)";
        } else{
            SignupForm.style.transform="translateX(50vw)";
            LoginForm.style.transform="translateX(50vw)";
        }
    }
    

/*JS - Accnt Creation*/
document.addEventListener("DOMContentLoaded", function(){
    const APIKEY="65be00693339b174e873c8d1";

    document.getElementById("signupsubmit").addEventListener("click", function(e){
        e.preventDefault();

        /*getting user info*/
        let userName=document.getElementById("floatingName").value;
        let userEmail=document.getElementById("signupfloatingEmail").value;
        let userPassword=document.getElementById("signupfloatingPassword").value;

        /*checking inputs*/
        if (!userName || !userEmail || !userPassword){
            console.log("Please fill in all required fields.");
            return;
        }

        /*POST js*/
        var jsondata={
            "name": userName,
            "email": userEmail,
            "password": userPassword
        };

        fetch("https://wookieplaytime-0a57.restdb.io/rest/signup",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data && data._id){
                const animation=document.getElementById("lottieAnimationLogin");
                animation.autoplay=true;
                animation.load();

                window.location.href="index.html";
            } else{
                console.log("Signup Failed. Try again.")
            }
        })
        .catch(error=>{
            console.error("Error:", error);
        });
    });;
});

/*JS - Login*/
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65be00693339b174e873c8d1";
    const loginEnd = "https://wookieplaytime-0a57.restdb.io/rest/signup";

    document.getElementById("loginsubmit").addEventListener("click", function (e) {
        e.preventDefault();

        /*get info*/
        let userEmail = document.getElementById("loginfloatingEmail").value;
        let userPassword = document.getElementById("loginfloatingPassword").value;

        /*check input*/
        if (!userEmail || !userPassword) {
            alert("Please fill in all required fields.");
            return;
        }

        fetch(`${loginEnd}?q={"email":"${userEmail}"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0 && data[0].password === userPassword) {
                    console.log("Welcome back!");

                    /*token generation
                    const generatedToken="userToken";
                    localStorage.setItem("token", generatedToken)*/

                    /*lottie animation*/
                    const animation=document.getElementById("lottieAnimationLogin");
                    animation.autoplay=true;
                    animation.load();

                    window.location.href = "index.html";
                } else {
                    alert("This user doesn't exist");
                }
            })
            .catch((error) => {
                console.error("Error", error);
            });
    });
});

/*JS - Logout
function logout(){
    localStorage.removeItem("token");

    window.location.href="signup-login.html";
}
*/

/*JS - Checking Login
function checkLoginProfile(){
    const token=localStorage.getItem("token");
    if (token){
        window.location.href="profile.html";
    } else{
        window.location.href="signup-login.html";
    }
}

function checkLoginCart(){
    const token=localStorage.getItem("token");
    if (token){
        window.location.href="cart.html";
    } else{
        window.location.href="signup-login.html";
    }
}
*/

/*JS - Cart*/
let cartIcon = document.querySelector(".cart-icon");
let closeCart = document.querySelector(".closecartbtn");
let pageBody = document.querySelector('body');
let productListHTML = document.querySelector('.productlist');
let cartListHTML = document.querySelector('.cartlist');

let productList = [];
let cart = [];

cartIcon.addEventListener('click', () =>{
    pageBody.classList.toggle('showcart')
})
closeCart.addEventListener('click', ()=>{
    pageBody.classList.toggle('showcart')
})

const addDataToHTML = () =>{
    productListHTML.innerHTML = '';
    if (productList.length>0){
        productList.forEach(product =>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
				<h2>${product.name}</h2>
				<div class="price">$${product.price}</div>
				<button class="addCart">
					Add to Cart
				</button>
            `;
            productListHTML.appendChild(newProduct);
        })
    }
}

productListHTML.addEventListener('click', (event) =>{
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let productPositionInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if(productPositionInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else{
        cart[productPositionInCart].quantity = cart[productPositionInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
    cartListHTML.innerHTML = '';
    if (cart.length > 0){
        cart.forEach(cart => {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let productPosition = productList.findIndex((value) => value.id == cart.product_id);
            let info = productList[productPosition];
            newCart.innerHTML = `
                <div class="itemimg">
					<img src="${info.image}" alt="Kookie Plushie">
				</div>
				<div class="itemname">
                    ${info.name}
				</div>
				<div class="totalprice">
                    $${info.price*cart.quantity}
				</div>
				<div class="quantity">
					<span class="minus">-</span>
					<span>${cart.quantity}</span>
					<span class="plus">+</span>
				</div>
            `;
        cartListHTML.appendChild(newCart);
        })
    }
}

cartListHTML.addEventListener('click', (event) => {
    let clickPosition = event.target;
    if(clickPosition.classList.contains('minus') || clickPosition.classList.contains('plus')){
        let product_id = clickPosition.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(clickPosition.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id,type) => {
    let itemPositionInCart = cart.findIndex((value)=>value.product_id==product_id);
    if (itemPositionInCart >= 0){
        switch (type){
            case 'plus':
                cart[itemPositionInCart].quantity=cart[itemPositionInCart].quantity+1;
                break;
            default:
                let valueChange=cart[itemPositionInCart].quantity-1;
                if (valueChange >0){
                    cart[itemPositionInCart].quantity = valueChange;
                }else{
                    cart.splice(itemPositionInCart,1);
                }
                break;

        }
    }
    addCartToMemory();
    addCartToHTML();
}

const initApp = () =>{
    fetch('products.json')
    .then(response => response.json())
    .then(data =>{
        productList = data;
        addDataToHTML();
        if(localStorage.getItem('cart')){
            cart=JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();