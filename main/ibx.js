const API = "http://localhost:8000/cards"; // Замените на фактический URL API
const cardsContainer = document.querySelector("#idxContainer");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const searchInp = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchButton");

let searchVal = "";
const LIM = 8;
let currentP = 1;
let totalP = 1;

async function fetchCards() {
  let res;

  if (searchVal) {
    res = await fetch(
      `${API}?name=${searchVal}&_page=${currentP}&_limit=${LIM}`
    );
  } else {
    res = await fetch(`${API}?_page=${currentP}&_limit=${LIM}`);
  }
  const data = await res.json();
  console.log(data);
  cardsContainer.innerHTML = "";
  data.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("idx_cards_block");
    cardElement.innerHTML = `
                <div class= idx_cards>
                    <div class="idx_card_img">
                        <img class="idx_img" src="${card.img}" alt="${card.name}" >
                    </div>
                    <div class="idx_desc">
                    <p class="idx_rating">★★★★☆</p>
                        <p  class="idx_desc_item" id="idxPrice">${card.price} ₽</p>
                        <h2 class="idx_desc_item" id="idxName">${card.name}</h2>
                        <p  class="idx_desc_item" id="idxDesc">${card.desc}</p>
                    </div>
                    <div class="idx_btn">
                      <button class="idx_btn_item">
                           <img id="heartIcon" class="heart_icon" src="https://img.icons8.com/?size=512&id=DxIsF9smUsRE&format=png" alt="Favorite">
                           <img id="redHeartIcon" class="red_heart_icon" src="https://www.freeiconspng.com/thumbs/heart-icon/valentine-heart-icon-6.png" alt="like">
                           </button>
                      <button class="idx_btn_item">
                          <img src="https://cdn-icons-png.flaticon.com/512/60/60992.png" alt="cart" style="width: 20px;height: 20px;">
                       </button>
                      <a href="./detail.html">
                           <button id="idxBtnDetail" class="idx_btn_item">...</button>
                      </a> 
                    </div>
                </div>
            `;

    cardsContainer.appendChild(cardElement);
  });
  pageFunc();
}

window.addEventListener("load", () => {
  fetchCards();
});
//==================pagin============
async function pageFunc() {
  const res = await fetch(API);
  const data = await res.json();
  totalP = Math.ceil(data.length / LIM);

  if (currentP === totalP) {
    nextBtn.style.color = "black";
    nextBtn.style.border = "black";
  } else {
    nextBtn.style.color = "white  ";
    nextBtn.style.border = "rgb(13, 110, 253)";
  }

  if (currentP === 1) {
    prevBtn.style.color = "black";
    prevBtn.style.border = "black";
  } else {
    prevBtn.style.color = "white";
    prevBtn.style.border = "rgb(13, 110, 253)";
  }
}

prevBtn.addEventListener("click", () => {
  if (currentP <= 1) return;
  currentP--;
  fetchCards();
});

nextBtn.addEventListener("click", () => {
  if (currentP >= totalP) return;
  currentP++;
  fetchCards();
});

// Загрузка карточек при загрузке страницы

///=======================================

//=================SEARCH===========
searchInp.addEventListener("input", ({ target: { value } }) => {
  console.log(value);
  searchVal = value;
});

searchBtn.addEventListener("click", () => {
  console.log("Search button clicked");
  console.log("Search value:", searchVal);
  fetchCards();
});

//=====================================
