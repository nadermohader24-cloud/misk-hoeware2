// ===========================
// Sidebar
// ===========================

const menu = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".close-btn");

if (menu && sidebar && closeBtn) {

    menu.addEventListener("click", () => {
        sidebar.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });

    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    });

}

// ===========================
// Search Icon
// ===========================

const searchIcon = document.querySelector(".search-icon");
const searchBox = document.querySelector(".search-box");

if (searchIcon && searchBox) {

    searchIcon.addEventListener("click", () => {

        if (searchBox.style.display === "block") {
            searchBox.style.display = "none";
        } else {
            searchBox.style.display = "block";
        }

    });

}

// ===========================
// Header Shadow
// ===========================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.15)";
    } else {
        header.style.boxShadow = "0 3px 15px rgba(0,0,0,.08)";
    }

});

// ===========================
// Categories Slider
// ===========================

document.querySelectorAll(".category-slider").forEach(slider => {

    const images = slider.querySelectorAll(".category-image");

    let current = 0;

    setInterval(() => {

        images[current].classList.remove("active");

        current = (current + 1) % images.length;

        images[current].classList.add("active");

    }, 3000);

});

// ===========================
// Change Product Image
// ===========================

function changeImage(id, image){

    const img = document.getElementById(id);

    img.src = image;
    img.dataset.current = image;

    const card = img.closest(".product-card");
    const heart = card.querySelector(".favorite");

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const found = favorites.find(item => item.image === image);

    if(found){

        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
        heart.classList.add("active");

    }else{

        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
        heart.classList.remove("active");

    }

}
// ===========================
// Live Search
// ===========================

const products = [

    { name: "Cups", page: "cups.html" },
    { name: "Plates", page: "plates.html" },
    { name: "Tray", page: "kitchen.html" },
    { name: "Stand", page: "decor.html" },
    { name: "Mugs", page: "storage.html" },
    { name: "Vases", page: "gifts.html" },
    { name: "Bowls", page: "bowls.html" }

];

const input = document.getElementById("searchInput");
const results = document.getElementById("searchResults");

if (input && results) {

    input.addEventListener("input", () => {

        let value = input.value.toLowerCase();

        results.innerHTML = "";

        if (value === "") {

            results.style.display = "none";

            return;

        }

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(value)
        );

        if (filtered.length === 0) {

            results.innerHTML = `<div class="result-item">No results found</div>`;

        } else {

            filtered.forEach(product => {

                results.innerHTML += `
                <div class="result-item" onclick="window.location.href='${product.page}'">
                    ${product.name}
                </div>
                `;

            });

        }

        results.style.display = "block";

    });

    document.addEventListener("click", (e) => {

        if (!document.querySelector(".search-box").contains(e.target)) {

            results.style.display = "none";

        }

    });

}

// ===========================
// Favorite Button
// ===========================

document.querySelectorAll(".favorite").forEach(heart=>{

    heart.addEventListener("click",function(e){

        e.preventDefault();
        e.stopPropagation();

        const card = this.closest(".product-card");

        const img = card.querySelector("img");

        const image = img.dataset.current || img.src;

        const price = card.querySelector(".price").innerText;

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const index = favorites.findIndex(item => item.image === image);

        if(index > -1){

            favorites.splice(index,1);

            this.classList.remove("fa-solid");
            this.classList.add("fa-regular");
            this.classList.remove("active");

        }else{

            favorites.push({
                image:image,
                price:price
            });

            this.classList.remove("fa-regular");
            this.classList.add("fa-solid");
            this.classList.add("active");

        }

        localStorage.setItem("favorites",JSON.stringify(favorites));
        updateFavoriteCount();

    });

});
// ===========================
// ===========================


window.addEventListener("load",()=>{

    document.querySelectorAll(".product-card").forEach(card=>{

        const img = card.querySelector("img");

        if(!img.dataset.current){
            img.dataset.current = img.src;
        }

        const heart = card.querySelector(".favorite");

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const found = favorites.find(item => item.image === img.dataset.current);

        if(found){

            heart.classList.remove("fa-regular");
            heart.classList.add("fa-solid");
            heart.classList.add("active");

        }

    });

});
// ===========================
// Favorites Page
// ===========================

const favoritesList = document.getElementById("favorites-list");

if (favoritesList) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const confirmBox = document.getElementById("confirm-box");

if(confirmBox){

    if(favorites.length === 0){

        confirmBox.style.display = "none";

    }else{

        confirmBox.style.display = "block";

    }

}

    if (favorites.length === 0) {

        favoritesList.innerHTML = `
            <div class="empty-favorites">

                <i class="fa-regular fa-heart"></i>

                <h2>Your favorites list is empty.</h2>

                <p>Start exploring our handmade collections.</p>

                <a href="categories.html" class="custom-btn">
                    Browse Products
                </a>

            </div>
        `;

    } else {

        favorites.forEach((item, index) => {

            favoritesList.innerHTML += `
                <div class="favorite-card">

                    <img src="${item.image}">

                    <p class="price">${item.price}</p>

                    <button class="remove-btn"
                    onclick="removeFavorite(${index})">

                        Remove

                    </button>

                </div>
            `;

        });

    }

}

// ===========================
// Remove Favorite
// ===========================

function removeFavorite(index){

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.splice(index,1);

    localStorage.setItem("favorites",JSON.stringify(favorites));

    updateFavoriteCount();

    showToast("Removed from Favorites ✖️");

    location.reload();

}

// ===========================
// Favorite Counter
// ===========================

function updateFavoriteCount(){

    const counter = document.getElementById("favorite-count");

    if(!counter) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if(favorites.length === 0){

        counter.style.display = "none";

    }else{

        counter.style.display = "flex";
        counter.innerText = favorites.length;

    }

}

updateFavoriteCount();

// ===========================
// Toast
// ===========================

function showToast(message){

    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// ===========================
// Confirm Order
// ===========================

const confirmBtn = document.getElementById("confirmOrderBtn");

if(confirmBtn){

    confirmBtn.addEventListener("click", function(){

        const phone = "20100000xxxx"; // حط رقم واتساب المحل

        window.open(`https://wa.me/${phone}`);

    });

}
