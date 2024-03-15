import {
  
  timerspecial,
  getAndShowProductsMenu,
  creatProduct,
} from "./functions/funcs.js";
import { showdetails } from "./functions/funcs.js";

const viewAllSpecial = document.querySelector("#view-all__special");
const viewAllBest = document.querySelector("#view-all__best");
window.addEventListener("load", async () => {
 
  const data = await getAndShowProductsMenu();
  await loadBannerImages();
  let endDate = new Date("Mar 30, 2024 00:00:00").getTime();
  timerspecial(endDate);

  await loadSpecialSale(data);
  await loadBestSale(data);

  await clickproduct();
});

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

const loadBannerImages = () => {
  let swiperWrapper = document.querySelector(".swiper-wrapper");

  fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/banners?select=*", {
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

  data.forEach((product) => {
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
const loadBestSale = (data) => {
  const bestSales = document.querySelector("#best-sales");
  let arr = data.sort((a, b) => b.Remainingnumber - a.Remainingnumber);

  arr.forEach((product) => {
    bestSales.insertAdjacentHTML(
      "beforeend",
      `   <div class="col-6 col-md-3">
              ${creatProduct(product)}
          </div>
    `
    );
  });
};

viewAllSpecial.addEventListener("click", async () => {
  await localStorage.setItem("special", "yes");
});
viewAllBest.addEventListener("click", async () => {
  await localStorage.setItem("best", "yes");
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
