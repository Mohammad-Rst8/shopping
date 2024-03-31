import { clearInputs } from "../functions/funcs.js";
import { produceUserID } from "../functions/funcs.js";
import { setLocalstorage } from "../functions/funcs.js";
import { swalfire } from "../functions/funcs.js";
import { checkinputs } from "../functions/funcs.js";
let $ = document;



const register = () => {
  let signFirstname = $.querySelector(".sign-firstname");
  let signLastname = $.querySelector(".sign-lastname");
  let signEmail = $.querySelector(".sign-email");
  let signPass = $.querySelector(".sign-pass");
  let signPhone = $.querySelector(".sign-phone");
 const checkInput = checkinputs(signEmail.value.trim(),signPhone.value.trim(),signPass.value.trim());
 
 if(!checkInput){
   swalfire("اطلاعات نادرست میباشد","لطفا تمام فیلد ها را به درستی وارد کنید","error")
   clearInputs([signFirstname, signLastname, signEmail, signPhone, signPass]);
   return
  }
  const id = produceUserID()
  const balanceArr = [1000000,2000000,1200000,1500000,3000000,1400000,1600000,2200000]
const balanceIndex = Math.floor(Math.random()*balanceArr.length)
  let val = {
    firstname: signFirstname.value.trim(),
    lastname: signLastname.value.trim(),
    email: signEmail.value.trim(),
    phonenumber: signPhone.value.trim(),
    password: signPass.value.trim(),
    userID : id,
    balance : balanceArr[balanceIndex]
  };

  fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/users", {
    method: "POST",
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(val),
  }).then((res) => {
    
    clearInputs([signFirstname, signLastname, signEmail, signPhone, signPass]);
    res.ok ? setLocalstorage(id) : swalfire("ثبت نام انجام نشد", "فرایند ثبت نام شما انجام نشد، بعدا تلاش کنید.", "error");
    swalfire("ok" , `مبلغ ${balanceArr[balanceIndex].toLocaleString("fa-IR")} از طرف مدیر سابت یه کیف پول شما اضافه شد.`, "success")

  });
  
};

const login = () => {
  let signinPhone = $.querySelector(".signin-phone");
  let signinPass = $.querySelector(".signin-pass");
  let phoneVal = signinPhone.value.trim();
  let passVal = signinPass.value.trim();
  fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/users?select=*", {
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let result = data.find((item) => {
        return phoneVal == item.phonenumber && passVal == item.password;
      });
      
      if (result) {
        setLocalstorage(result.userID)
         window.location.href = "../index.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "اطلاعات را اشتباه وارد کرده اید.",
          text: "اطلاعات کاربری خود را به طور صحیح وارد کنید",
          timer: 1500,
        });
        return;
      }
      clearInputs([signinEmail, signinPass]);
    });
};



export { register, login };
