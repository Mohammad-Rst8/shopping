import { isLogin , swalfire,getlocalstorage } from "../functions/funcs.js"
const commentWrapper = document.querySelector(".comment-wrapper")
const productDatails= document.querySelector(".product-datails")
const addCommentBtn= document.querySelector("#add-comment__btn")
const pageinationArrowLeft= document.querySelector(".pageination-arrow__left")
const pageinationArrowRight= document.querySelector(".pageination-arrow__right")
const addCommentFirstBtn = document.querySelector("#add-comment__first--btn")
const addCommentt = document.querySelector(".addcomment")
const removeAddcomment = document.querySelector(".remove-addcomment")



window.addEventListener("load" , async() =>{


  
    const product =await JSON.parse(localStorage.getItem("product"))
     
   await insertDetails(product)
   await insertColorWrapp(product)
   await clickChangeProductColor()
   await insertSizeWrapp(product)
   await insertSubImageWrapp(product)
   await clickChangeSize()
   await changenumberproduct(product)
   await addComment(product)
   
})





const insertDetails = async (product) =>{
  

 const data = await fetch('https://uqkfskiduursccnhissi.supabase.co/rest/v1/comments?select=*', {
  headers :{
    "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
   
  }
}).then(res => res.json())
.then(data =>{ 
return data;
}
)
const comments = data.filter(comment =>{
  return comment.productId == product.id
})
comments.forEach(item =>{
  let today = new Date(item.created_at.slice(0, 10)).toLocaleDateString('fa-IR');
  
  commentWrapper.insertAdjacentHTML('beforeend', 
  `
 

  
   
    
      <div class="comment-slide">
        <h5 class="comment-title">
          ${item.title}
          <p class="user-rate">
            (<span class="user-rating">${item.rate}</span>) از 5
          </p>
        </h5>
        <p class="comment-subtitle">
         ${item.description}
        </p>
        <div class="comment-detail">
          <p class="comment-date">${today}</p>
          <p class="username-comment__send">(${item.username})</p>
        </div>
      </div>

    
 

  `)
})






   productDatails.insertAdjacentHTML('beforeend' , 
  `
  <div class="details flex-column-reverse flex-md-row">
          <div class="details-right">
            <h1 class="product-name">${product.name}</h1>

            <div class="rating">
              <div class="rating-star">
              ${ Array(5- product.rate).fill(0).map( (rate) =>`<img src="../icons/star.svg" alt="star" width="18" height="18"/>`).join('')}
              ${ Array(product.rate).fill(0).map( (rate) => `<img src="../icons/star-fill.svg" alt="starfill" width="18" height="18"/>`).join('')}
              </div>
            </div>

            <div class="productprice">
              <p>قیمت:</p>
              <span class="price-wrapp">
                <p>${product.price > 0 ? product.price.toLocaleString('fa-IR') +`<svg>
                <use href="#toman"></use>
              </svg>` : "رایگان"}</p>
             
              </span>
            </div>
            <p class="product-subtitle">
              ${product.description}
            </p>
            <div class="product-colors">
              <p>رنگ های موجود:</p>
              <div class="colors-wrapp">
              
               
              </div>
            </div>
            <div class="product-sizes">
              <p>اندازه های موجود:</p>
              <div class="size-wrapp">
              
          
            
              </div>
            </div>
            <div class="product-guarantee">
              <svg>
                <use href="#guarantee"></use>
              </svg>
              <p>گارانتی 18 ماهه آنلاین شاپ</p>
            </div>
            <div class="detail-button">
              <div class="number-box">
                <svg class="plus-number__product">
                  <use href="#plus"></use>
                </svg>
                <p class="product-mobile__number">1</p>
                <svg class="minus-number__product">
                  <use href="#minus"></use>
                </svg>
              </div>
              <a href="javascript:void(0)" class="buttons" id="add-to__cart--btn">افزودن به سبد خرید</a>
            </div>
          </div>
          <div class="details-left">
            <img src="${product.mainimage}" alt="main" class="main-image" />
            <div class="slides">
             
            </div>
          </div>
        </div>

        `
         
  )
const addToCartBtn = document.querySelector("#add-to__cart--btn")
await addtocart(product,addToCartBtn)
}
const insertColorWrapp = (product) =>{
  const colorsWrapp = document.querySelector(".colors-wrapp")
product.color.forEach(color =>{

 
colorsWrapp.insertAdjacentHTML("beforeend", 
`
${
  color == "blue" ? `<span class="product-color  bg-primary" bg="blue"> </span>` : color == "green" ? `<span class="product-color bg-success" bg="green"> </span>`  : color == "white" ? `<span class="product-color  bg-white" bg="white"> </span>` : color == "dark" ? `<span class="product-color  bg-dark" bg="dark"> </span>` :  color == "red" ? `<span class="product-color  bg-danger" bg="red"> </span>` : ""
}
`)


})
}
const insertSizeWrapp = (product) =>{
  const sizeWrapp = document.querySelector('.size-wrapp')
let prt = product.sizes.split("-")

prt.forEach(item =>{
 console.log(item);
  sizeWrapp.insertAdjacentHTML('beforeend' , 
  ` 
  <span class="product-size ">${item ? item : "ندارد"}</span>
  `)
})
}
const clickChangeSize = () =>{
  const sizeWrapp = document.querySelectorAll('.product-size')
 
  sizeWrapp.forEach(size =>{
    
  size.addEventListener('click', (e) => {
    sizeWrapp.forEach(item =>{
          item.classList.remove("active")
        })
        e.target.classList.add("active")
      })
})

}
const clickChangeProductColor = () =>{
let productColors = document.querySelectorAll(".product-color")
productColors.forEach(color =>{
  color.addEventListener('click', (e) => {
        productColors.forEach(item =>{
          item.classList.remove("active")
        })
        e.target.classList.add("active")
  })
})


}


const changenumberproduct = (product) =>{
const productMobileNumber = document.querySelector('.product-mobile__number')
const plusNumberProduct = document.querySelector(".plus-number__product")
const minusNumberProduct = document.querySelector(".minus-number__product")
const Remainingnumber = product.Remainingnumber
plusNumberProduct.addEventListener('click', () =>{
  let  productMobileNumberVal = +productMobileNumber.innerHTML
  Remainingnumber > productMobileNumberVal ? productMobileNumber.innerHTML++ : alert("متاسفانه تعداد مورد نظر شما در انبار موجود نیست")
})
minusNumberProduct.addEventListener('click', () =>{
  let  productMobileNumberVal = +productMobileNumber.innerHTML
   productMobileNumberVal == 1 ? productMobileNumber.innerHTML = 1 : productMobileNumber.innerHTML--
})

  
}
const addComment = (product)  => {
const plus = document.querySelector(".pluss")
    const minus = document.querySelector(".minuss")
    const productMobileNumberr = document.querySelector(".product-mobile__numberr")
let productRateNumber = +productMobileNumberr.innerHTML
    plus.addEventListener('click', () =>{
    
    productRateNumber == 5 ? productMobileNumberr.innerHTML = 5 : productMobileNumberr.innerHTML = ++productRateNumber
  })




  minus.addEventListener('click', () =>{
    
    productRateNumber == 1 ? productMobileNumberr.innerHTML = 1 : productMobileNumberr.innerHTML = --productRateNumber
  })

  
  addCommentBtn.addEventListener("click" , async() =>{
    const rate = +productMobileNumberr.innerHTML
  const addCommentInputTitle = document.querySelector("#add-comment__input-title").value
  const addCommentInputUsername = document.querySelector("#add-comment__input-username").value
  const addCommentDescription = document.querySelector("#add-comment--description").value
  await postComment(product.id,addCommentInputTitle,addCommentInputUsername,addCommentDescription,rate)
  addCommentt.classList.add("d-none")
  window.location.reload()
   
  })
}
const postComment = async (id, title,username,desc,rate) =>{

const arr = {
 
  productId : id
  ,title : title
  , username : username
  ,description : desc,
  rate: rate 
  
}

await fetch(`https://uqkfskiduursccnhissi.supabase.co/rest/v1/comments`, {
method: "POST",
headers: {
  "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
  "Content-Type": "application/json",
  
},
body : JSON.stringify(arr)
})

addCommentt.classList.add("d-none")
}

const commentSlider = document.querySelector(".comment-slider")
pageinationArrowLeft.addEventListener("click" , () =>{
  
  let fit = commentWrapper.clientWidth - commentSlider.clientWidth
  let elem = (parseFloat(commentWrapper.style.right)) || 0
 if(fit > Math.abs(elem)){
  commentWrapper.style.right = (elem - 120) + 'px' 
  }
})
pageinationArrowRight.addEventListener("click" , () =>{
 
  let elem = (parseFloat(commentWrapper.style.right)) || 0
 if(10 < Math.abs(elem)){
  commentWrapper.style.right = (elem + 120) + 'px' 
  }
})

const addtocart = async(product, addToCartBtn) =>{
  addToCartBtn.addEventListener("click", () =>{
    
    if(!isLogin()){
      swalfire("لطفا وارد حساب کاربری شوید.", "برای خرید باید وارد حساب شده باشید.","error")
       setTimeout( () => {

        window.location.href = "../src/signup.html"
      },2000)
      return;
    }
      checkOptionsProduct(product.price, product.name,product.mainimage, product.Remainingnumber)



  })
}


const checkOptionsProduct = async(price, name,img , numberInShop) =>{

  const colorsWrapp = document.querySelector(".colors-wrapp").getElementsByClassName("product-color")
  const sizeWrapp = document.querySelector('.size-wrapp').getElementsByClassName("product-size")
  let productMobileNumberr = document.querySelector(".product-mobile__number")
  let productColor = await checkColorSelect(colorsWrapp)
  let productSize = await checkSizeSelect(sizeWrapp)
  if(productColor){
    productColor = productColor.getAttribute("bg")
  }
  else{
    swalfire("رنگ کالای مورد نظر را انتخاب کنید", "" , "warning")
    return;
  }
  if(productSize){
    productSize = productSize.innerHTML
  }
  else{
    swalfire("سایز کالای مورد نظر را انتخاب کنید", "" , "warning")
    return;
  }
  productMobileNumberr = +productMobileNumberr.textContent
    const userd = getlocalstorage('user')

const arr= {
  name: name,
  userid : userd,
  color : productColor, 
  size: productSize,
  price : +price,
  number: productMobileNumberr,
  image : img,
  numberInShop : numberInShop
}
    await sendDatas(arr)

}

const checkColorSelect =async (elem) =>{
  let productColor
  for (const x of elem) {x.classList.contains("active") ? productColor = x : "" ;}
    return productColor
}

const checkSizeSelect = async (sizeWrapp) =>{

  let sizeColor
  for (const x of sizeWrapp) {x.classList.contains("active") ? sizeColor = x : "" ;}
    return sizeColor
}

const  sendDatas = async (arr) =>{
 
  await fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/userBaskets", {
    method : "POST",
    headers: {
      "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
      "Content-Type": "application/json",
      
    },
    body : JSON.stringify(arr)
  }).then (res =>{
  
    window.location.href = "../src/cart.html" 
    
  })
}



addCommentFirstBtn.addEventListener("click", (e) =>{
  
e.preventDefault()
addCommentt.classList.remove("d-none")
})

removeAddcomment.addEventListener("click", () =>{
  addCommentt.classList.add("d-none")
})

const insertSubImageWrapp = (product) =>{
  const slides = document.querySelector(".slides")
  const items = product.subimages
 for (let i = 0; i < items.length; i++) {
  if(items[i]){

    slides.insertAdjacentHTML("beforeend" , 
    `
    <img src="${items[i]}" alt="" class="image-slide" />
    `)
  }
  else{
    return;
  }
  
 }
 
}