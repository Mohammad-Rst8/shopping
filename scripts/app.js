import { logout } from "../components/functions/funcs.js";
import { searchInputInProduct } from "../components/functions/funcs.js";
import { getlocalstorage } from "../components/functions/funcs.js";
import { getAndShowProductsMenu } from "../components/functions/funcs.js";
const overlay = document.querySelector(".overlay")

const menubtn = document.getElementById('menubtn')

const xicon = document.querySelector('.xicon')
const headerMenuItem = document.querySelectorAll('.header-menu__item-product')
const mobileTopbar = document.querySelector('.mobile-topbar')
const topBarSearchInput = document.querySelector('.top-bar--search__input')
const searchbarMenu = document.querySelector('.searchbar-menu')
const arrivalLink = document.querySelectorAll(".arrival-link");
const topBarSearchBtn = document.querySelector(".top-bar--search__btn")

const spanMenuItemMen = document.querySelectorAll(".span-menu__item--men")
const submenuMobileSub = document.querySelectorAll(".submenu-mobile__sub")
const submenuMobile = document.querySelectorAll(".submenu-mobile")


let dropdownProfileMenu = document.querySelector(".dropdown-profile__menu");

const dropDownProfileInsertHtml = () =>{
  if (window.location.pathname == "/shopping/" || window.location.pathname == "/shopping/index.html") {
    dropdownProfileMenu.innerHTML = `
    <li class="dropdown-profile__menu--item">
    <a
      href="./src/account managment.html"
      class="dropdown-profile__menu--link"
    >
      <svg>
        <use href="#profile-icon"></use>
      </svg>
      <p>مدیریت اکانت</p>
    </a>
  </li>
 
  <li class="dropdown-profile__menu--item">
    <a
      href="./src/signup.html"
      class="dropdown-profile__menu--link "
      id="logout-btn"
    >
      <svg>
        <use href="#logout"></use>
      </svg>
      <p>خروج از حساب</p>
    </a>
  </li>
      `;
      return;
  }else{
    dropdownProfileMenu.innerHTML = `
      <li class="dropdown-profile__menu--item">
      <a
        href="../src/account managment.html"
        class="dropdown-profile__menu--link"
      >
        <svg>
          <use href="#profile-icon"></use>
        </svg>
        <p>مدیریت اکانت</p>
      </a>
    </li>
   
    <li class="dropdown-profile__menu--item">
      <a
        href="../src/signup.html"
        class="dropdown-profile__menu--link "
        id="logout-btn"
      >
        <svg>
          <use href="#logout"></use>
        </svg>
        <p>خروج از حساب</p>
      </a>
    </li>
        `;
        return;
  }
}
   if ( getlocalstorage("user")) {
    
     dropDownProfileInsertHtml()
    

    const logoutBtn = document.getElementById('logout-btn')
    logoutBtn.addEventListener('click', () =>{
      logout()
   })
 


    

}


menubtn.addEventListener('click', () =>{
  mobileTopbar.classList.toggle('mobile-menu__active')
  overlay.classList.add("w-100")
    })
xicon.addEventListener('click', () =>{
      mobileTopbar.classList.toggle('mobile-menu__active')
      overlay.classList.remove("w-100")
    })

 headerMenuItem.forEach( item => {
  item.addEventListener('click' , (e) =>{
    e.preventDefault()
    setAndGetProductPage(e)
    
  })
})

arrivalLink.forEach( item =>{
  item.addEventListener('click', e =>{
    e.preventDefault()

    setAndGetProductPage(e)
  })
})
const setAndGetProductPage = (e) =>{
  localStorage.removeItem("menuItem")
  localStorage.removeItem("menuItemChild")
  localStorage.setItem('menuItem',e.target.parentElement.dataset.cat)
  localStorage.setItem('menuItemChild',e.target.parentElement.title)
  if(window.location.pathname == "/src/products.html"){
    window.location.reload()
  }else if(window.location.pathname == "/shopping/" || window.location.pathname == "/shopping/index.html"){

    window.location.href = "./src/products.html"
  }
  else{
    window.location.href = "../src/products.html"
  }

}
topBarSearchBtn.addEventListener("click", e =>{
  topBarSearchInput.value.trim() && searchProducts(topBarSearchInput.value.trim())
})

topBarSearchInput.addEventListener('keydown', (e) => {
  if(e.keyCode == 13 && e.target.value.trim()){
     searchProducts(e.target.value.trim())

  }
})

const searchProducts = async(value) =>{
  const arr = await getAndShowProductsMenu()
  const result =  searchInputInProduct(value,arr)
  searchbarMenu.classList.add('searchbar-menu__active')
  
  searchbarMenu.innerHTML = ""

  result.length ? result.forEach(item =>{
    searchbarMenu.insertAdjacentHTML('beforeend', 
     `
     <a href="../src/product-detail.html" class="searchbar-menu__item header-menu__item-product" product-id="${item.id}">
     <span class="searchbar-image-part">
     <img src="${item.mainimage}" loading="lazy" alt="image-searchar" width="75" height="75">
    <span>
      <h4>${item.name}</h4>
      <p id="product-cat">${item.subcate ? item.maincate  +"/"+ item.subcate : item.maincate}</p>

    </span>
     </span>
       <h3>${item.price ? item.price.toLocaleString('fa-IR') : "رایگان"}</h3>
       <svg>
                      <use href="#toman"></use>
                    </svg>
   </a>
       `)
       
   }) : searchbarMenu.innerHTML = `<span class="p-5">محصولی یافت نشد</span>`

     
  
   const searchbarMenuItem = document.querySelectorAll(".searchbar-menu__item")
   
   searchbarMenuItem.forEach(item =>{
item.addEventListener("click", () =>{
      const clickedProduct = result.find(product =>{
        return product.id == item.getAttribute("product-id")
      })
      localStorage.removeItem("product")
      localStorage.setItem("product", JSON.stringify(clickedProduct))
      (window.location.pathname == "/shopping/" || window.location.pathname == "/shopping/index.html") ? window.location.href= "./src/product-detail.html" : window.location.href= "../src/product-detail.html"
     
})
     
   })
    
     
}

window.addEventListener("click" , (e) =>{
if(e.target != searchbarMenu){
  searchbarMenu.classList.remove("searchbar-menu__active")
}

})
overlay.addEventListener("click" , () =>{

 
    
      overlay.classList.remove("w-100")
      mobileTopbar.classList.remove("mobile-menu__active")
    
 
  

})


submenuMobileSub.forEach(item =>{
  item.addEventListener("click" , (e) =>{
   const svgmenu = item.firstElementChild.firstElementChild
    const elem = item.lastChild.previousElementSibling
    elem.classList.toggle("submenu-mobile__active")
    svgmenu.classList.toggle("svgrotate")
   
  })
})