import { getAndShowProductsMenu } from "./functions/funcs.js";
import { swalfire } from "./functions/funcs.js";
import { creatProduct , clickproduct } from "./functions/funcs.js";
const productPageWrapper = document.getElementById('productPage-wrapper')
const coursesTopBarSelectionTitle = document.querySelector('.coursesTopBarSelectionTitle__content')
const coursesTopBarSelectionItem = document.querySelectorAll('.courses-top-bar__selection-item')



window.onload = async() =>{
  const items = await getAndShowProductsMenu()
  checkSpecial(items)? checkSpecial(items) : checkBest(items) ?  checkBest(items) :  loadProducts(items)

  await clickproduct();
    sorting(items)


}

const loadProducts = (items) =>{
const titlemenu = localStorage.getItem('menuItem')
const titlemenuChild = localStorage.getItem('menuItemChild')


let itemsChild = []
let itemsParent = []

  items.forEach((item) => {
  
  if(item.maincate == titlemenu){
    if(!item.subcate || item.subcate != titlemenuChild){
      itemsParent.push(item);
    }
    if(item.subcate == titlemenuChild){
      itemsChild.push(item)
      itemsParent.push(item)
      
    }
 
  }
    
})
if(itemsChild.length){
  loadproductinPage(itemsChild)
  return ;
}else if(itemsParent.length && !titlemenuChild){
  loadproductinPage(itemsParent)
  return;
}
else{
  if(!titlemenu && !titlemenuChild){
    loadproductinPage(items)

  }else{

    loadproductinPage([])
  }
  return;
}



}

 const loadproductinPage = (items) =>{
  productPageWrapper.innerHTML = ""
if(items.length){
   items.forEach((product) =>{
    
      productPageWrapper.insertAdjacentHTML('beforeend', 
          `
          <div class="col-12 col-md-4">
                       
          ${creatProduct(product)}
      </div>
          `
      )
  })

}else{
  
  swalfire("محصولی وجود ندارد","سپاس از همراهی شما","warning");
}
}

const checkSpecial =  (data) =>{
  const localStore = localStorage.getItem("special")
 
  if(localStore){
    
    data.forEach(item =>{
      if(item.specialSales == "yes"){
        
        console.log(item);
        productPageWrapper.insertAdjacentHTML('beforeend', 
        `
        ${creatProduct(item)}
        `
        )
      }
    })
    localStorage.removeItem("special")
    return true
  }
}


const checkBest =  (data) =>{
  const localStore = localStorage.getItem("best")
 
  if(localStore){
    
    let arr = data.sort((a,b) => b.Remainingnumber - a.Remainingnumber)
            
          
    arr.forEach( product => {

      productPageWrapper.insertAdjacentHTML('beforeend' ,
      `
      
      ${creatProduct(product)}
      
      
        `
      )
    })
    localStorage.removeItem("best")
    return true
  }
}

const sorting = (items) =>{
  coursesTopBarSelectionItem.forEach(item =>{
    item.addEventListener("click" , () =>{
      coursesTopBarSelectionItem.forEach(part =>{
        part.classList.remove("courses-top-bar__selection-item--active")
      })
      item.classList.add("courses-top-bar__selection-item--active")
      coursesTopBarSelectionTitle.textContent = item.innerHTML
      
      sortdata(items, item.value)
    })
  })
}
const sortdata = (items, val) =>{
  if(val == 0){
    loadproductinPage(items)
  }
  else if(val ==1){
        const sortExpensive = items.toSorted((a,b) => b.price - a.price)
        loadproductinPage(sortExpensive)
  }
  else if(val ==2){
    const sortExpensive = items.toSorted((a,b) => a.price - b.price)
    loadproductinPage(sortExpensive)
  }
  else if(val ==3){
    const sortExpensive = items.toSorted((a,b) => b.rate - a.rate)
    loadproductinPage(sortExpensive)
  }
}