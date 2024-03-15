import { register } from "../auth.js";
import {getuserInfo } from "../searchLogin.js";

window.addEventListener('load' , () =>{
    const user = getuserInfo()
   
    if(user){
        
    }
    else{
        console.log("no login");

    }
})
let signupBtn = document.querySelector(".signup-btn");

signupBtn.addEventListener('click' , (e) =>{
    e.preventDefault();
    register()
})


