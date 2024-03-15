import { isLogin } from "../functions/funcs.js";
import {  swalfire } from "../functions/funcs.js";
import { getlocalstorage } from "../functions/funcs.js";
import { checkinputs } from "../functions/funcs.js";
const accountfirstname = document.querySelector('.account-firstname')
const accountlastname = document.querySelector('.account-lastname')
const accountemail = document.querySelector('.account-email')
const accountphone = document.querySelector('.account-phone')
const newPassword = document.querySelector('#new-password')
const newPasswordConfirm = document.querySelector('#new-password__confirm')
const changeUserInfo = document.querySelector('#change-userInfo')
const accountAddress = document.querySelector('.account-address')
let Id = null
window.onload = async() =>{
   const userId = getlocalstorage("user")
   
   if(isLogin){
    await fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/users?select=*",{
        
        headers:{
            apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw" 
        }
    }).then(res => res.json())
    .then(data => {
        const user = data.find(item =>{
             return item.userID == userId
            })
        accountfirstname.value = user.firstname
        accountlastname.value = user.lastname
        accountemail.value = user.email
        accountphone.value = user.phonenumber
        Id = user.id
    })
}
}

changeUserInfo.addEventListener('click', (e) =>{
    e.preventDefault()
  
    if(newPassword.value.trim() != newPasswordConfirm.value.trim()){
        swalfire("عدم همخوانی رمزها","رمزها با هم مطابقت ندارد، لطفا رمز های یکسان وارد کنید","warning")
        return
    }
    const checkInput = checkinputs(accountemail.value.trim(),accountphone.value.trim(),String(newPassword.value.trim()));
    if(!checkInput){
      swalfire("اطلاعات نادرست میباشد","لطفا تمام فیلد ها را به درستی وارد کنید","error")
      clearInputs([signFirstname, signLastname, signEmail, signPhone, signPass]);
      return
     }
    
    const updateInfo = {
        firstname : accountfirstname.value.trim(),
        lastname : accountlastname.value.trim(),
        email : accountemail.value.trim(),
        password : String(newPassword.value.trim()),
        phonenumber : accountphone.value.trim(),
        address : accountAddress.value.trim()
    }
    fetch(`https://uqkfskiduursccnhissi.supabase.co/rest/v1/users?id=eq.${Id}`, {
        method : "PATCH",
        headers: {
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
            "Content-Type": "application/json",
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw"
          },
          body: JSON.stringify(updateInfo)
    }).then(res => res.json())
    
    

})