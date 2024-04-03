import { register } from "../auth.js";
import {getuserInfo } from "../searchLogin.js";


let signupBtn = document.querySelector(".signup-btn");

signupBtn.addEventListener('click' , (e) =>{
    e.preventDefault();
    register()
})

const balanceArr = [6000000,8000000,2200000,13000000,30000000,2400000,2600000,3200000]
const balance = Math.floor(Math.random()*balanceArr.length)
