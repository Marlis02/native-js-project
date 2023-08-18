const API = "http://localhost:8000/cards";
const detailBlock = document.querySelector("#detail");

async function getOneGood(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();
  console.log(data);

  detailBlock.innerHTML = `
  <div class="detail_container">
        <div class="detail_block">
            <div class="detail_img">
                <img src="${data.img}" alt="nike" class="product_img" "> 
            </div>
            <div class="product_desc">
                <div class="detail_desc">
                       <p class="ratings">Rating:★★★★☆</p>
                       <p class="detail_item">${data.name}</p> 
                       <p class="detail_item">${data.desc}</p> 
                       <p class="detail_item">Цена товара :   ${data.price} ₽</p> 
                </div>
                <div class="btns">
                <button class="buy_btn"id="${id}">Купить быстро</button>
                <button class="cart_btn"id="${id}">Добавить в корзину</button>
                <a href="./admin.html">
                    <button class="cancel_btn"id="${id}">Back to admin</button>
                </a>
                <a href="./index.html">
                    <button class="cancel_btn"id="${id}">Back to home</button>
                </a>

                </div>
            </div>  
        </div>
  </div>
  
  `;
}

const id = localStorage.getItem("detail-id");
getOneGood(id);
