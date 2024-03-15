import { logout } from "../components/functions/funcs.js";
import { searchInputInProduct } from "../components/functions/funcs.js";
import { getlocalstorage } from "../components/functions/funcs.js";
import { getAndShowProductsMenu } from "../components/functions/funcs.js";
const logoutBtn = document.getElementById('logout-btn')
const menubtn = document.getElementById('menubtn')
const xicon = document.querySelector('.xicon')
const headerMenuItem = document.querySelectorAll('.header-menu__item-product')
const mobileTopbar = document.querySelector('.mobile-topbar')
const topBarSearchInput = document.querySelector('.top-bar--search__input')
const searchbarMenu = document.querySelector('.searchbar-menu')

let dropdownProfileMenu = document.querySelector(".dropdown-profile__menu");
if (!getlocalstorage("user")) {
  
  dropdownProfileMenu.innerHTML = `
    <li class="dropdown-profile__menu--item">
    <a href="signup.html" class="dropdown-profile__menu--link">
        <svg>
          <use href="#profile-icon"></use>
        </svg>
        <p>ورود | ثبت نام</p>
  </a>
  </li>
    `;
}

logoutBtn.addEventListener('click', () =>{
  logout()
})

menubtn.addEventListener('click', () =>{
  mobileTopbar.classList.toggle('mobile-menu__active')
    })
xicon.addEventListener('click', () =>{
      mobileTopbar.classList.toggle('mobile-menu__active')
    })

 headerMenuItem.forEach( item => {
  item.addEventListener('click' , (e) =>{
    e.preventDefault()
    localStorage.removeItem("menuItem")
    localStorage.removeItem("menuItemChild")
    localStorage.setItem('menuItem',e.target.parentElement.dataset.cat)
    localStorage.setItem('menuItemChild',e.target.parentElement.title)
    window.location.href = "../products.html"
    
  })
})

topBarSearchInput.addEventListener('keydown', async(e) => {
 
  
  if(e.keyCode == 13){
    const arr = await getAndShowProductsMenu()
    const result =  searchInputInProduct(e.target.value.trim(),arr)
    searchbarMenu.classList.add('searchbar-menu__active')
    let num =2000
    num.toLocaleString()
    result.forEach(item =>{
      searchbarMenu.insertAdjacentHTML('beforeend', 
       `
       <a href="#" class="searchbar-menu__item">
       <span class="searchbar-image-part">
       <img src="./images/children/2/main.webp" alt="image-searchar" width="75" height="75">
      <span>
        <h4>${item.name}</h4>
        <p id="product-cat">${item.subcate ? item.maincate  +"/"+ item.subcate : item.maincate}</p>

      </span>
       </span>
         <h3>${item.price ? item.price.toLocaleString('fa-IR') : "رایگان"}</h3>
     </a>
         `)
     })

    }
    

})

