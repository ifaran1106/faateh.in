const phoneNumber = "917620994805";

const products = [
  {
    name: "Perspective In Pieces",
    price: "₹699",
    image: "images/pes.jpg", // local image for website
    whatsappImage: "https://raw.githubusercontent.com/ifaran1106/faateh.in/main/images/pes.jpg", // link for WhatsApp
    soldOut: false
  },
  {
    name: "My Soul Has Been Sold",
    price: "₹699",
    image: "images/shs.jpg", // local image for website
    whatsappImage: "https://raw.githubusercontent.com/ifaran1106/faateh.in/main/images/shs.jpg", // link for WhatsApp
    soldOut: false
  }
];

const container = document.getElementById("productList");

if (container) {
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="image-container">
        <img src="${p.image}" alt="${p.name}">
      </div>
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
                     data-image="${p.whatsappImage}"> <!-- GitHub link used here -->
              Select
            </label>
          </div>
        `}
      </div>
    `;

    container.appendChild(card);
  });

  // 🛒 Checkout button logic
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const selected = [...document.querySelectorAll(".select-product:checked")];
    if (selected.length === 0) return alert("Select at least one product first!");

    let message = "Hey! I'm interested in these products:\n\n";
    selected.forEach(item => {
      // Use data-image (GitHub link) in the message
      message += `• ${item.dataset.name} (${item.dataset.price})\n${item.dataset.image}\n\n`;
    });

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}
