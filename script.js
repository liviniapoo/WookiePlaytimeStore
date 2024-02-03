/*JS -  Accnt Toggle*/
var SignupForm=document.getElementById("SignupForm");
var LoginForm=document.getElementById("LoginForm");
var indicator=document.getElementById("indicator");

    function signup(){
        SignupForm.style.transform="translateX(0px)"
        LoginForm.style.transform="translateX(0px)"
        indicator.style.transform="translateX(15.5vw)"
    }

    function login(){
        SignupForm.style.transform="translateX(50vw)"
        LoginForm.style.transform="translateX(50vw)"
        indicator.style.transform="translateX(0px)"
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



