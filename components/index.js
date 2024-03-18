import {
  timerspecial,
  getAndShowProductsMenu,
  creatProduct,
  showdetails
} from "./functions/funcs.js";


const viewAllSpecial = document.querySelector("#view-all__special");
const viewAllBest = document.querySelector("#view-all__best");

window.addEventListener("load", async () => {
 
  const data = await getAndShowProductsMenu();
  await loadBannerImages();
  await setTimerSpecialSales()
await loadPopularProduct()


  await loadSpecialSale(data);
  await loadBestSale(data);

  await clickproduct();
});
const setTimerSpecialSales = async() =>{
  const clockDay = document.querySelector('.clock-day')
  const clockHour = document.querySelectorAll('.clock-hour')
  const clockMinutes = document.querySelectorAll('.clock-minutes')
  const clockSeconds = document.querySelectorAll('.clock-seconds')

    let endDate = new Date("Mar 30, 2024 00:00:00").getTime();
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
    clickable: true,
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
                    class="main-header__image"
                  />
                </div>
          `
        );
      });
    });
};

const loadSpecialSale = async (data) => {
  const swiperWrapper = document.querySelector(".swiperproduct-wrapper");

  await data.forEach((product) => {
    if (product.specialSales == "yes") {
      swiperWrapper.insertAdjacentHTML(
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

 await arr.forEach((product) => {
    bestSales.insertAdjacentHTML(
      "beforeend",
      `   <div class="col-6 col-md-3">
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

const clickproduct = async () => {
  const productBox = document.querySelectorAll(".product-box");
  productBox.forEach((item) => {
    item.addEventListener("click", async () => {
      await showdetails(item.getAttribute("user-id"));
      window.location.href = ".././product-detail.html";
    });
  });
};

const loadPopularProduct = async() =>{
let papularProductTitle = document.querySelector(".papular-product__title")
let papularProductImg = document.querySelector(".papular-product__img")

   await fetch('https://uqkfskiduursccnhissi.supabase.co/rest/v1/Newproduct?select=*',{
      headers : {
        "apikey" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw"
      }
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      papularProductTitle.innerHTML = data[0].title
      papularProductImg.setAttribute('src', data[0].image)
    })
}
