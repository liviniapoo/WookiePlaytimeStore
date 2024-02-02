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

    