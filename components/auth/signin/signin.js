import { login } from "../auth.js";
import { getuserInfo } from "../searchLogin.js";
let signinBtn = document.querySelector(".signin-btn");

window.addEventListener('load', () =>{
    getuserInfo()
})
signinBtn.addEventListener("click", (e) => {
    e.preventDefault();
login();
})