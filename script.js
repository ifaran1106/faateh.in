const phoneNumber = "917620994805";

const products = [
  {
    name: "Perspective In Pieces",
    price: "₹699",
    images: ["images/pes1.jpg"], // multiple images
    soldOut: false
  },
  {
    name: "My Soul Has Been Sold",
    price: "₹699",
    images: ["images/shs1.jpg"], // multiple images
    soldOut: false
  }
];

const container = document.getElementById("productList");

if (container) {
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    // default image (first one)
    const imageHTML = `
      <div class="image-container">
        <img src="${p.images[0]}" alt="${p.name}">
      </div>
    `;

    card.innerHTML = `
      ${imageHTML}
      ${p.soldOut ? '<div class="sold-overlay">SOLD OUT</div>' : ''}
      <div class="card-content">
        <div class="product-name">${p.name}</div>
        <div class="price">${p.price}</div>
        ${p.soldOut ? '' : `
          <div class="select-box">
            <label>
              <input type="checkbox" class="select-product" 
                     data-name="${p.name}" 
                     data-price="${p.price}" 
                     data-image="${p.images[0]}">
              Select
            </label>
          </div>
        `}
      </div>
    `;

    container.appendChild(card);

    // 🎞️ cycle through images on click
    const imgEl = card.querySelector("img");
    let index = 0;
    imgEl.addEventListener("click", () => {
      index = (index + 1) % p.images.length;
      imgEl.src = p.images[index];
    });
  });

  // 🛒 checkout button logic
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
