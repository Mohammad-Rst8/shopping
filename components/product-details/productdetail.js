
const productName = document.querySelector(".product-name")
const productDatails= document.querySelector(".product-datails")


window.onload = async() =>{
    const product = JSON.parse(localStorage.getItem("product"))

   await insertDetails(product)
   await insertColorWrapp(product)
   await clickChangeProductColor()
   await insertSizeWrapp(product)
   await clickChangeSize()
   await changenumberproduct(product)

}





const insertDetails = (product) =>{
   productDatails.insertAdjacentHTML('beforeend' , 
  `
  <div class="details flex-column-reverse flex-md-row">
          <div class="details-right">
            <h1 class="product-name">${product.name}</h1>

            <div class="rating">
              <div class="rating-star">
              ${ Array(5- product.rate).fill(0).map( (rate) =>`<img src="icons/star.svg" alt="star" width="18" height="18"/>`).join('')}
              ${ Array(product.rate).fill(0).map( (rate) => `<img src="icons/star-fill.svg" alt="starfill" width="18" height="18"/>`).join('')}
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
              <a href="#" class="buttons">افزودن به سبد خرید</a>
            </div>
          </div>
          <div class="details-left">
            <img src="./images/camera.png" alt="" class="main-image" />
            <div class="slides">
              <img src="./images/jacket 1.png" alt="" class="image-slide" />
              <img src="./images/jacket 1.png" alt="" class="image-slide" />
              <img src="./images/jacket 1.png" alt="" class="image-slide" />
              <img src="./images/jacket 1.png" alt="" class="image-slide" />
            </div>
          </div>
        </div>
        `
         
  )
}
const insertColorWrapp = (product) =>{
const colorsWrapp = document.querySelector(".colors-wrapp")
product.color.forEach(color =>{

 
colorsWrapp.insertAdjacentHTML("beforeend", 
`
${
  color == "blue" ? `<span class="product-color  bg-primary"> </span>` : color == "green" ? `<span class="product-color bg-success"> </span>`  : color == "white" ? `<span class="product-color  bg-white"> </span>` : `<span class="product-color  bg-dark"> </span>` 
}
`)


})
}
const insertSizeWrapp = (product) =>{
  const sizeWrapp = document.querySelector('.size-wrapp')

product.sizes.forEach(item =>{
  sizeWrapp.insertAdjacentHTML('beforeend' , 
  ` 
  <span class="product-size ">${item}</span>
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