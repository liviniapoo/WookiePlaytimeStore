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
            console.log("Please fill in all required fields.");
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

                    /*token generation*/
                    const generatedToken="userToken";
                    localStorage.setItem("token", generatedToken)

                    /*lottie animation*/
                    const animation=document.getElementById("lottieAnimationLogin");
                    animation.autoplay=true;
                    animation.load();

                    window.location.href = "index.html";
                } else {
                    console.log("Login unsuccessful. Try again.");
                }
            })
            .catch((error) => {
                console.error("Error", error);
            });
    });
});

/*JS - Logout*/
function logout(){
    var logoutAction = document.getElementById("logoutBtn");
}


