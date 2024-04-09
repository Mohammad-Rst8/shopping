import {
  timerspecial,
  getAndShowProductsMenu,
  creatProduct,
  clickproduct
} from "./functions/funcs.js";



const viewAllSpecial = document.querySelector("#view-all__special");
const viewAllBest = document.querySelector("#view-all__best");
const swiperproductWrapper = document.querySelector(".swiperproduct-wrapper");
const swiperproduct = document.querySelector(".swiperproduct");
const pageinationArrowRight = document.querySelector(".pageination-arrow__right");
const pageinationArrowLeft = document.querySelector(".pageination-arrow__left");


window.addEventListener("load", async () => {
 
  const data = await getAndShowProductsMenu();
  await loadBannerImages();
  await setTimerSpecialSales()
await loadPopularProduct()
  await loadSpecialSale(data);
  await loadBestSale(data);
  await loadDiscountBanner()
  await clickproduct();
});
const setTimerSpecialSales = async() =>{
  const clockDay = document.querySelector('.clock-day')
  const clockHour = document.querySelectorAll('.clock-hour')
  const clockMinutes = document.querySelectorAll('.clock-minutes')
  const clockSeconds = document.querySelectorAll('.clock-seconds')

    let endDate = new Date("Apr 10, 2024 00:00:00").getTime();
 await timerspecial(endDate,clockDay, clockHour, clockMinutes, clockSeconds);
}
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  effect: "slide",
  loop: true,
  lazy: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: false,
  },
  autoplay: {
    enabled: true,
    delay: 2000,
  },
});


const loadBannerImages = async() => {
  let swiperWrapper = document.querySelector(".swiper-wrapper");

 await fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/banners?select=*", {
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        swiperWrapper.insertAdjacentHTML(
          "beforeend",
          `
          <div class="swiper-slide">
                  <img
                    src="${item.address}"
                    alt="${item.title}"
                    data-cat="${item.maincat}"
                    loading="lazy"
                    class="main-header__image"
                  />
                </div>
          `
        );
      });
    });
  await  clickBannerImage()
};
const clickBannerImage = () =>{
  const swiperSlide = document.querySelectorAll(".swiper-slide")
  swiperSlide.forEach(item =>{
    item.addEventListener("click" , e =>{
      localStorage.setItem('menuItem',e.target.dataset.cat)
  
    window.location.href = "./src/products.html"
    

    })
  })
}
const loadSpecialSale = async (data) => {
await data.forEach((product) => {
    if (product.specialSales == "yes") {
      swiperproductWrapper.insertAdjacentHTML(
        "beforeend",
        `
              <div class="swiperproduct-slide">
                ${creatProduct(product)}
              </div>
              `
      );
    }
  });
};
const loadBestSale = async (data) => {
  const bestSales = document.querySelector("#best-sales");
  let arr = data.sort((a, b) => b.Remainingnumber - a.Remainingnumber);

  arr = arr.slice(0 , 11)
  
  await arr.forEach((product) => {
    bestSales.insertAdjacentHTML(
      "beforeend",
      `   <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              ${creatProduct(product)}
          </div>
    `
    );
  });
};

viewAllSpecial.addEventListener("click",  () => {
   localStorage.setItem("special", "yes");
});
viewAllBest.addEventListener("click",  () => {
   localStorage.setItem("best", "yes");
});



const loadPopularProduct = async() =>{
let papularProductTitle = document.querySelector(".papular-product__title")
let papularProductImg = document.querySelector(".papular-product__img")

   await fetch('https://uqkfskiduursccnhissi.supabase.co/rest/v1/Newproduct?select=*',{
      headers : {
        "apikey" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw"
      }
    }).then(res => res.json())
    .then(data => {
      
      papularProductTitle.innerHTML = data[0].title
      papularProductImg.setAttribute('src', data[0].image)
    })
}

pageinationArrowRight.addEventListener("click" , (e) =>{
  let elem = (parseFloat(swiperproductWrapper.style.right)) || 0
 if(Math.abs(elem) > 10){
   swiperproductWrapper.style.right = (elem + 100) + 'px'
 }
})
pageinationArrowLeft.addEventListener("click" , (e) =>{
  let fit = swiperproductWrapper.clientWidth - swiperproduct.clientWidth
  let elem = (parseFloat(swiperproductWrapper.style.right)) || 0
 if(fit > Math.abs(elem)){
   swiperproductWrapper.style.right = (elem - 100) + 'px' 
  }
})

const loadDiscountBanner = async () =>{
const discountContent = document.querySelector(".discount-content")
  const discountCode = document.querySelector(".discount-code")

const response = await fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/copon?select=*",{
  headers : {
    "apikey" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw"
  }
})
const data = response.json()
data.then(codes => {
  codes.forEach(code => {
    
    if(code.isBanner){
      discountContent.innerHTML = code.textCopoun + ":"
      discountCode.innerHTML = code.code 
    }
  })
  
})


}
