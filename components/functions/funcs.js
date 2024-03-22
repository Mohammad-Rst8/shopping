// get element and clear value
const clearInputs = (numbers) => {
  numbers.forEach((item) => {
   
    item.value = "";
  });
};

const produceUserID = () => {
  const regex = /[a-zA-Z0-9]/g;
  const characters = "$%abcdefghijklmnopqrstuvwxyz0123456789@#";
  let id = "";
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  
       return id;
};
const setLocalstorage = (value) =>{
       localStorage.setItem("user" , value)
}
const getlocalstorage = (key)=>{

  return (localStorage.getItem(key)) 
}
const isLogin =() =>{
  const userIslogin = localStorage.getItem("user")
 
 return userIslogin ? userIslogin : false;
}
const swalfire = (title , text , icon)=> {
       Swal.fire({
              title: title,
              text: text,
              icon: icon
            });
};
function checkinputs(email , phone , password){
      
       const regexEmail= /[a-zA-Z0-9._%+$-]+@[a-zA-Z]+.[a-zA-Z]{2,}/;
       const regexPhoneNumber = /0?9+[0-9]{9}/g;
       const regexPassword = /[a-zA-Z0-9!@#$%^&*()?]{8,15}/g;
            const resultEmail  = regexEmail.test(email)
            const resultPhone = regexPhoneNumber.test(phone)
            const resultPassword = regexPassword.test(password)
            console.log(resultEmail,
              resultPhone,
              resultPassword)
           if(resultEmail && resultPhone && resultPassword){
              return true;
           }
           else{
            return false;
           }
           

}
const logout = () =>{
  localStorage.clear()
  window.location.reload()
  
}

function timerspecial(endDate) {
  const clockDay = document.querySelector('.clock-day')
  const clockHour = document.querySelectorAll('.clock-hour')
  const clockMinutes = document.querySelectorAll('.clock-minutes')
  const clockSeconds = document.querySelectorAll('.clock-seconds')
  var countdownInterval = setInterval(function() {
      var now = new Date().getTime();
      var distance = endDate - now;
      
      if (distance < 0) {
          clearInterval(countdownInterval);
          // console.log("فروش ویژه به پایان رسید!");
      } else {
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          // console.log(days + " روز " + hours + " ساعت " + minutes + " دقیقه " + seconds + " ثانیه ");
      }
      clockDay.innerHTML = days < 10 ? "0"+days : days
      clockHour.forEach(item => {

        item.innerHTML =  hours < 10 ? "0"+hours : hours
      })
clockMinutes.forEach(item => {

  item.innerHTML = minutes < 10 ? "0"+minutes : minutes
})
clockSeconds.forEach(item => {

  item.innerHTML = seconds < 10 ? "0" + seconds : seconds
})

  }, 1000); // به‌روزرسانی تایمر هر ثانیه

}



const getAndShowProductsMenu = async () =>{

let res = await fetch('https://uqkfskiduursccnhissi.supabase.co/rest/v1/products?select=*', {
    headers :{
      apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
    }
})
let data =await res.json()
  return data;
}

const creatProduct = product =>{
  let main =`<div class="product-box product" user-id="${product.id}" >
                <img
                  src="${product.mainimage}"
                  alt="gp11"
                  class="product-img h-100"
                />
                <div class="special-sale__product-description gap-1 gap-md-3">
                  <h3>${product.name}</h3>
                  <div class="product-price__wrapp">
                    <span class="product-off-price"
                      >${product.price > 0 ? product.price.toLocaleString('fa-IR') +`<svg>
                      <use href="#toman"></use>
                    </svg>` : "رایگان"}
                    </span>
                    <span class="product-price">${product.lastprice > 0 ? product.lastprice.toLocaleString('fa-IR') : ""}</span>
                  </div>
                  <div class="rating">
                    <div class="rating-star">
                    ${ Array(5- product.rate).fill(0).map( (rate) =>`<img src="icons/star.svg" alt="star" width="18" height="18"/>`).join('')}
                    ${ Array(product.rate).fill(0).map( (rate) => `<img src="icons/star-fill.svg" alt="starfill" width="18" height="18"/>`).join('')}
                    </div>
                    <span class="rating-comment-count">(${product.commentsnumber})</span>
                  </div>
                </div>
                <a href="product-detail.html" class="add-cart">
                  <h4>افزودن به سبد خرید</h4>
                </a>
              </div>`
              return main;
}


const searchInputInProduct = (value,array) =>{
 
  let resultSearch = array.filter(item => item.name.includes(value))
  return resultSearch;
}
const showSpecialSales = async () =>{
  const data = await getAndShowProductsMenu()
const arr = []
  data.forEach(product =>{
    console.log(product);
    if(product.specialSales == "yes"){
      arr.push(product)
    }
})
  
return arr;
}

const showdetails =async id =>{
  const data = await getAndShowProductsMenu()
 const product = data.find( item =>{
   return item.id == id
 })

  localStorage.setItem('product', JSON.stringify(product))
  
}

// const closesectionByClickedOutside = (elem) =>{
//   window.addEventListener("click", (e) =>{
//   console.log(elem);
//   if(e.target != elem){
//     elem.style.display ="none"
//   }
//   else{
//     console.log("نیست");
//   }
// })




//}
export {clearInputs , produceUserID, setLocalstorage ,swalfire ,checkinputs, getlocalstorage, isLogin, logout,timerspecial , getAndShowProductsMenu,creatProduct , searchInputInProduct,showSpecialSales,showdetails};
