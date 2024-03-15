import { getAndShowProductsMenu } from "./functions/funcs.js";
import { swalfire } from "./functions/funcs.js";
import { creatProduct } from "./functions/funcs.js";
const productPageWrapper = document.getElementById('productPage-wrapper')



window.onload = async() =>{
  
  (await checkSpecial()) ? await checkSpecial() :(await checkBest()) ? await checkBest() :( await loadProducts())




}

const loadProducts = async() =>{
const titlemenu = localStorage.getItem('menuItem')
const titlemenuChild = localStorage.getItem('menuItemChild')

let items = await getAndShowProductsMenu()
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
  loadproductinPage([])
  return;
}



}

 const loadproductinPage = async(items) =>{
if(items.length){
  await items.forEach((product) =>{
    
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

const checkSpecial = async () =>{
  const localStore = localStorage.getItem("special")
 
  if(localStore){
    const data = await getAndShowProductsMenu()
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


const checkBest = async () =>{
  const localStore = localStorage.getItem("best")
 
  if(localStore){
    const data = await getAndShowProductsMenu()
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
const showdetails = id =>{
  console.log(id);
}