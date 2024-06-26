import { getlocalstorage, swalfire } from "../functions/funcs.js";
const userid = getlocalstorage("user")

const getuser = async () =>{
  const response =  await fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/users?select=*", {
           headers: {
               apikey:
                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
             },
       })
       const data = await response.json()
    console.log(data);
      const use = data.find(element => {
            return element.userID == userid
        });
        
        return use
}



let cartDetails = JSON.parse(localStorage.getItem("checkout"))
if(cartDetails){
   
const checkOutDetails = document.querySelector(".checkout-left")
checkOutDetails.insertAdjacentHTML('beforeend' , 
`
<div class="checkout-basket__details">
                        
<span class="content-title">
  
    نوع خرید
</span>
<span class="content-title">اینترنتی</span>
</div>
<div class="checkout-basket__details">

<span class="content-title">
  
    زمان تحویل
</span>
<span class="content-text">2 تا 5 روز کاری</span>
</div>
<div class="checkout-basket__details">

<span class="content-title">
 
    نوع پرداخت
</span>
<form id="form-payment--way" class="content-text">
    <label for="payonline">آنلاین</label>
    <input type="radio" id="payonline" disabled name="paymentway" value="payonline">
    <label for="paybox">کیف پول</label>
    <input type="radio" id="paybox"  name="paymentway" value="paybox">
   
  </form>
</div>
<div class="checkout-basket__details">

<span class="content-title">
   
    قیمت کالاها(${cartDetails.number})
</span>
<span class="content-text">
    <p>${cartDetails.price.toLocaleString('fa-IR')}</p>
    <svg>
        <use href="#toman"></use>
    </svg>
</span>
</div>
<div class="checkout-basket__details">

<span class="content-title">
   هزینه ارسال:
</span>
<span class="content-text">
    <p>${cartDetails.PostPrice == 100000 ? cartDetails.PostPrice.toLocaleString('fa-IR') +  `<svg>
    <use href="#toman"></use>
</svg>` : "رایگان"}</p>
  
</span>
</div>
<div class="checkout-basket__details">

<span class="content-title">
   کد تخفیف:
</span>
<span class="content-text">
    <p>${cartDetails.copon ? cartDetails.copon.toLocaleString('fa-IR') +  `<svg>
        <use href="#toman"></use>
    </svg>` : "--"}</p>
   
</span>
</div>
<div class="checkout-basket__details">

<span class="content-title">
   قیمت نهایی:
</span>
<span class="content-text">
    <p>${cartDetails.priceALL.toLocaleString('fa-IR')  }</p>
    <svg>
        <use href="#toman"></use>
    </svg>
</span>
</div>
`)
}
else{

    window.location.href = "../../index.html"
}


   
 


const submitSell = document.querySelector("#submit-sell")
submitSell.addEventListener("click", () =>{
    checkInpust()
})

const checkInpust = async() =>{
const checkoutInputUsername = document.querySelector("#checkout-input__username").value
const checkoutInputPostalcode = document.querySelector("#checkout-input__postalcode").value
const checkoutInputPhonenumber = document.querySelector("#checkout-input__phonenumber").value
const checkoutInputEmail = document.querySelector("#checkout-input__email").value
const checkoutInputAddress = document.querySelector("#checkout-input__address").value
const paybox = document.querySelector("#paybox").checked


const regexEmail= /[a-zA-Z0-9._%+$-]+@[a-zA-Z]+.[a-zA-Z]{2,}/;
const regexPhoneNumber = /0?9+[0-9]{9}/g;
const regexPostalCode = /^\d{10}$/g;

const resultEmail  = regexEmail.test(checkoutInputEmail)
const resultPhone = regexPhoneNumber.test(checkoutInputPhonenumber)
const resultPostalcode = regexPostalCode.test(checkoutInputPostalcode)

if(resultPostalcode && resultPhone && resultEmail && paybox){


   
    getuser().then(async user => {
        const userInSell = user

        console.log(cartDetails.priceALL , userInSell.balance , typeof cartDetails.priceALL , typeof userInSell.balance );
        if (cartDetails.priceALL < userInSell.balance) {
            const arr  = {
                sellType: "اینترنتی",
                payType: "کیف پول",
                priceSell:cartDetails.priceALL,
                username:checkoutInputUsername,
                postalCode:checkoutInputPostalcode,
                address:checkoutInputAddress,
                phoneNumber:checkoutInputPhonenumber,
                email:checkoutInputEmail,
                userID:userid,
                numberProduct:cartDetails.number
            }
            await fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/orders", {
                method: "POST",
                headers: {
                    "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
                    "Content-Type": "application/json",
                    
                  },
                  body: JSON.stringify(arr)
            }).then(res => console.log(res))
        
            swalfire(`خرید با موفقیت انجام شد`, `مبلغ ${cartDetails.priceALL.toLocaleString('fa-IR')} تومان از کیف پول شما برداشت شد.`, "success")
                
                    const userArr = {
                        address : userInSell.address,
                        balance : userInSell.balance - cartDetails.priceALL,
                        basket : userInSell.basket,
                        email : userInSell.email,
                        firstname : userInSell.firstname,
                        lastname : userInSell.lastname,
                        password : userInSell.password,
                        phonenumber : userInSell.phonenumber,
                        userID : userInSell.userID,
        
                    }
                await fetch(`https://uqkfskiduursccnhissi.supabase.co/rest/v1/users?id=eq.${userInSell.id}`,{
                    method : "PATCH",
                    headers: {
                        "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
                        "Content-Type": "application/json",
                        
                      },
                      body: JSON.stringify(userArr)
                })
        }else{
        swalfire("موجودی کافی نیست","موجودی کیف پول شما برای خرید کافی نیست.\nبرای افزایش موجودی به پشتیبانی پیام دهید.","error")
        }
    })

}
else{
swalfire("برای تکمیل فرایند خرید تمام فیلد ها را به درستی تکمیل کنید.")
}

}


  