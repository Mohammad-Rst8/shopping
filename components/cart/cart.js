import { getlocalstorage } from "../functions/funcs.js"
const coponBtn = document.querySelector(".copon-btn")
const finalBtn = document.querySelector(".final-btn")
const productsMobile = document.querySelector(".products-mobile")
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

    const SubtotalPricePost = document.querySelector(".Subtotal-price__post")

    const finalRegistrationLeft = document.querySelector(".Final-registration__left")
    const coponPart = document.querySelector(".copon-part")
    if (!userCart.length) {
      console.log("no");
      productsMobile.innerHTML = "سبد خرید خالی است"
      finalRegistrationLeft.classList.add("d-none")
      coponPart.classList.add("d-none")
    }else{
      finalRegistrationLeft.classList.remove("d-none")
      coponPart.classList.remove("d-none")

    }
  userCart.forEach( async item =>{
    console.log("ok");
    inserData(item)
    await deleteProductButton(item.id)
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
   

    
       
    productsMobile.insertAdjacentHTML("beforeend" , 
    `
    <div class="product-mobile">
              <div class="products-mobile__right">
                  <img src="${item.image}" alt="${item.maincat}" loading="lazy" class="products-mobile__image">
                  <button type="button" class="del-btn" data-id="${item.id}">حذف</button>
              </div>
  
              <div class="products-mobile__left">
                <div class="product-option">
                  <h3 class="product-name">${item.name}</h3>
                  <div class="product-colors">
                    <p class="product-detail__title">رنگ انتخابی :</p>
                    <div class="colors-wrapp">
                      <span class="product-color active bg-${item.color}"> </span>
                     
                    </div>
                  </div>
                  <div style="display:flex; width:100%; align-items:center; justify-content:space-between;">
                  <p class="product-detail__title">تعداد انتخابی:</p>
                  
                  <div class="number-box"  >
                      <p class="product-mobile__numberOF">${item.number}</p>
                  
                  </div>
                  </div>
                  <div class="product-sizes">
                    <p class="product-detail__title">اندازه انتخابی :</p>
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
    `
    
    )
    
   
   


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

const deleteProductButton = (id) =>{
 const delBtn = document.querySelectorAll(".del-btn")
 delBtn.forEach(del =>{
  const delid = del.getAttribute("data-id")
  if(id == delid){
    del.addEventListener("click", async() =>{
      productsMobile.innerHTML = ""
       await fetch(`https://uqkfskiduursccnhissi.supabase.co/rest/v1/userBaskets?id=eq.${id}` ,{
        method: "DELETE",
        headers: {
          "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
        },
       }).then(res => {
        
        window.location.reload()
      
      })
      })

  }
  return;

 })
}