// Example products (image from GitHub)
const products = [
  {
    name: "Classic Tee",
    price: "₹699",
    image: "https://raw.githubusercontent.com/ifaran1106/faateh.in/main/images/product1.jpg",
    whatsapp: "https://wa.me/917620994805?text=Hi,+I+want+to+buy+Classic+Tee"
  },
  {
    name: "Street Hoodie",
    price: "₹999",
    image: "https://raw.githubusercontent.com/ifaran1106/faateh.in/main/images/product2.jpg",
    whatsapp: "https://wa.me/917620994805?text=Hi,+I+want+to+buy+Street+Hoodie"
  }
];

let cart = [];

function displayProducts() {
  const grid = document.getElementById("products-grid");
  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <button onclick="addToCart(${i})">Add to Cart</button>
      <a href="${p.whatsapp}" target="_blank">Buy on WhatsApp</a>
    `;
    grid.appendChild(div);
  });
}

function addToCart(index){
  cart.push(products[index]);
  document.getElementById("cart-count").innerText = cart.length;
}

document.addEventListener("DOMContentLoaded", displayProducts);

// Simple search
document.getElementById("search").addEventListener("input", (e)=>{
  const searchTerm = e.target.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(searchTerm) ? "block" : "none";
  });
});
