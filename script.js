const phoneNumber = "917620994805";

const products = [
  {
    name: "Black Oversized Tee",
    price: "₹799",
    image: "https://via.placeholder.com/400x400?text=Black+Oversized+Tee",
    soldOut: false
  },
  {
    name: "White Cargo Pants",
    price: "₹1199",
    image: "",
    link: "https://via.placeholder.com/400x400?text=White+Cargo+Pants",
    soldOut: true
  },
  {
    name: "Street Hoodie",
    price: "₹1499",
    image: "https://via.placeholder.com/400x400?text=Street+Hoodie",
    soldOut: false
  }
];

const container = document.getElementById("productList");
if (container) {
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    let imageHTML = p.image
      ? `<img src="${p.image}" alt="${p.name}">`
      : `<div style="height:280px;display:flex;align-items:center;justify-content:center;background:#111;">
          <a href="${p.link}" target="_blank" class="btn">View Image</a>
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
              <input type="checkbox" class="select-product" data-name="${p.name}" data-price="${p.price}" data-image="${p.image || p.link}">
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
