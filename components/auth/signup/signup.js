import { register } from "../auth.js";
import {getuserInfo } from "../searchLogin.js";


let signupBtn = document.querySelector(".signup-btn");

signupBtn.addEventListener('click' , (e) =>{
    e.preventDefault();
    register()
})

const balanceArr = [1000000,2000000,1200000,1500000,3000000,1400000,1600000,2200000]
const balance = Math.floor(Math.random()*balanceArr.length)
console.log(balanceArr[balance]);