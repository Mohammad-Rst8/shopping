import { getlocalstorage, setLocalstorage } from "../functions/funcs.js"
const coponBtn = document.querySelector(".copon-btn")
const finalBtn = document.querySelector(".final-btn")
const postPrice = 100000
let priceToNum = 0
let moponPrice
let priceAll = 0
let numberProductInCart = 0
const finduserProducts = async(products) =>{

    const userid = getlocalstorage("user") 

    const userCart = products.filter(item =>{
        return item.userid == userid
    })
    const SubtotalPrice = document.querySelector(".Subtotal-price")
    
    const SubtotalPriceAll = document.querySelector(".Subtotal-price__all")
    const mopon = document.querySelector(".Subtotal-price__off")
    const SubtotalPricePost = document.querySelector(".Subtotal-price__post")
    
    
  userCart.forEach( item =>{

    inserData(item)
    numberProductInCart++
    priceToNum += (item.price * item.number)
    SubtotalPrice.innerHTML = priceToNum.toLocaleString('fa-IR')
    SubtotalPricePost.innerHTML = priceToNum > 2000000  ?  "رایگان" : postPrice.toLocaleString('fa-IR')
    priceAll = priceToNum + (priceToNum > 2000000 ?  0 : postPrice)
    SubtotalPriceAll.innerHTML = priceAll.toLocaleString('fa-IR')
    
    
  })
  

}

   const getDataINServer = async() =>{ 
       await fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/userBaskets?select=*" , {
             headers: {
                 "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
                 "Content-Type": "application/json",
                 
               },
         }).then(res => res.json())
         .then(data => finduserProducts(data));
   }

   getDataINServer()

const inserData = (item)=>{
    const productsDesktop = document.querySelector(".products")
   

    const productsMobile = document.querySelector(".products-mobile")
  //   productsDesktop.insertAdjacentHTML("beforeend", 
  //   `
  //   <div class="product-basket-box">
  //   <div class="product-info">
  //     <img src="${item.image}" alt="car" width="20" height="20" />
  //     <h2 class="product-name">${item.name}</h2>
  //   </div>
  //   <div class="product-basket-price">
  //     <p class="product-cart__price">${item.price.toLocaleString('fa-IR')}</p>
  //     <svg>
  //       <use href="#toman"></use>
  //     </svg>
  //   </div>
  //   <div class="number-box">
  //                 <svg class="plus-number__product">
  //                     <use href="#plus"></use>
  //                 </svg>
  //         <p class="product-mobile__numberOF">${item.number}</p>
  //         <svg class="minus-number__product">
  //             <use href="#minus"></use>
  //         </svg>
  //     </div>
  //   <div class="product-all__basket-price">
  //     <p class="product-cart__allprice">${(item.price * item.number).toLocaleString('fa-IR')}</p>
  //     <svg>
  //       <use href="#toman"></use>
  //     </svg>
  //   </div>
  // </div>
  //   `)
    productsMobile.insertAdjacentHTML("beforeend" , 
    `
    <div class="product-mobile">
              <div class="products-mobile__right">
                  <img src="${item.image}" alt="" class="products-mobile__image">
                  
              </div>
  
              <div class="products-mobile__left">
                <div class="product-option">
                  <h3 class="product-name">${item.name}</h3>
                  <div class="product-colors">
                    <p>رنگ انتخابی :</p>
                    <div class="colors-wrapp">
                      <span class="product-color active bg-${item.color}"> </span>
                     
                    </div>
                  </div>
                  <div style="display:flex; width:100%; align-items:center; justify-content:space-between;">
                  <p>تعداد انتخابی:</p>
                  
                  <div class="number-box" style="width:5rem" >
                      <p class="product-mobile__numberOF">${item.number}</p>
                  
                  </div>
                  </div>
                  <div class="product-sizes">
                    <p>اندازه انتخابی :</p>
                    <div class="size-wrapp">
                      <span class="product-size active">${item.size}</span>
                    
                    </div>
                  </div>
                </div>
                  <div class="products-mobile__detail">
                    

                      <h5>قیمت:</h5>
                      <span class="product-off-price"
                      >${(item.price * item.number).toLocaleString('fa-IR')}
                      <svg>
                        <use href="#toman"></use>
                      </svg>
                    </span>
                    
                    
                  </div>
              </div>

            </div>
    `)

   


}

coponBtn.addEventListener("click", async (e) =>{
  e.preventDefault()
  const coponInputVal = document.querySelector(".copon-input").value
    await fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/copon?select=*", {
      headers: {
        "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
      },
      
    }).then(rs => rs.json())
    .then(data => {
      const resultCopon = data.filter(item =>{
        return item.code == coponInputVal.trim()
      })
       enableCopon(resultCopon)
      
    })
     

})

const enableCopon = (result) =>{
   moponPrice =  result[0].percent
  const resultCoponElem = document.querySelector(".result-copon")
if(result[0]){
  resultCoponElem.style.color = "green"
  resultCoponElem.innerHTML = `${moponPrice.toLocaleString('fa-IR')} تخفیف به مناسبت ${result[0].codetitle} برای شما اعمال شد.`


const SubtotalPrice = document.querySelector(".Subtotal-price")
    const SubtotalPriceAll = document.querySelector(".Subtotal-price__all")
    const mopon = document.querySelector(".Subtotal-price__off")
    
    mopon.innerHTML = moponPrice.toLocaleString('fa-IR')
    
    let totalPost = SubtotalPrice.innerHTML
  
    // priceToNum > moponPrice ? SubtotalPrice.innerHTML =  (priceToNum - moponPrice).toLocaleString('fa-IR') : priceToNum.toLocaleString('fa-IR')
   priceToNum > 2000000 ? SubtotalPriceAll.innerHTML = (priceToNum - moponPrice).toLocaleString('fa-IR') : SubtotalPriceAll.innerHTML = (priceToNum + postPrice - moponPrice).toLocaleString('fa-IR')

   
  }
else{
  resultCoponElem.style.color = "red"
  resultCoponElem.innerHTML = "کد وارد شده اشتباه است."
}
}

const clickPlusProduct = () =>{
const plus = document.querySelectorAll(".plus-number__product")
const productCartPrice = document.querySelector(".product-cart__price")
const productMobileNumber = document.querySelectorAll(".product-mobile__numberOF")
const productCartprice = document.querySelectorAll(".product-cart__allprice")


}


finalBtn.addEventListener("click", async (e) =>{
  if(!moponPrice){
    moponPrice = 0
  }


  const arr = {
        number: numberProductInCart,
        PostPrice : priceToNum > 2000000 ? "رایگان" : 100000,
        priceALL : priceToNum > 2000000 ?  priceToNum - moponPrice : priceToNum + postPrice - moponPrice,
        price : priceToNum,
        copon : moponPrice

  }

await localStorage.setItem("checkout" , JSON.stringify(arr))

})

// تعداد محصولات - هزینه ارسال - قیمت نهایی - قیمت کالاها - کدتخفیف