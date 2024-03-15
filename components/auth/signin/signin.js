import { login } from "../auth.js";
import { getuserInfo } from "../searchLogin.js";
let signinBtn = document.querySelector(".signin-btn");
let dropdownProfileMenu = document.querySelector(".dropdown-profile__menu");
window.addEventListener('load', () =>{
    getuserInfo()
})
signinBtn.addEventListener("click", (e) => {
    e.preventDefault();
login();
})