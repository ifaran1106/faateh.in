const phoneNumber = "917620994805";

const products = [
  {
    name: "Perspective In Pieces",
    price: "₹699",
    image: "images/product1.jpg", // replace with your actual image path
    soldOut: false
  },
  {
    name: "My Soul Has Been Sold",
    price: "₹699",
    image: "images/product2.jpg", // replace with your actual image path
    soldOut: false
  }
];

const container = document.getElementById("productList");

if (container) {
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    const imageHTML = p.image
      ? `<img src="${p.image}" alt="${p.name}">`
      : `<div style="height:280px; display:flex; align-items:center; justify-content:center; background:#111;">
           <span>No Image</span>
         </div>`;

    card.innerHTML = `
      ${imageHTML}
      ${p.soldOut ? '<div class="sold-overlay">SOLD OUT</div>' : ''}
      <div class="card-content">
        <div class="product-name">${p.name}</div>
        <div class="price">${p.price}</div>
        ${p.soldOut ? '' : `
          <div class="select-box">
            <label>
              <input type="checkbox" class="select-product" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">
              Select
            </label>
          </div>
        `}
      </div>
    `;

    container.appendChild(card);
  });

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const selected = [...document.querySelectorAll(".select-product:checked")];
    if (selected.length === 0) return alert("Select at least one product first!");

    let message = "Hey! I'm interested in these products:\n\n";
    selected.forEach(item => {
      message += `• ${item.dataset.name} (${item.dataset.price})\n${item.dataset.image}\n\n`;
    });

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}
