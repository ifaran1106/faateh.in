/* script.js
 - Central product + cart management for the static site.
 - Products are persisted in localStorage under key "faateh_products".
 - Cart is stored under "faateh_cart".
 - Replace phoneNumber with your WhatsApp number (country code + number, no +).
*/

const phoneNumber = "917620994805"; // replace if needed

/* ---------- DEFAULT PRODUCTS ---------- */
const defaultProducts = [
  {
    id: "perspective",
    name: "Perspective In Pieces",
    price: "₹699",
    priceNum: 699,
    image: "images/pes.jpg",
    description: "Limited streetwear drop — crafted for those who move with purpose.",
    whatsappLink: "https://www.instagram.com/p/DOECmBUgf4o/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" // custom link per product
  },
  {
    id: "mysoul",
    name: "My Soul Has Been Sold",
    price: "₹699",
    priceNum: 699,
    image: "images/shs.jpg",
    description: "A limited run — bold graphics, street-ready fit.",
    whatsappLink: "https://www.instagram.com/p/DOEBJGnAb9R/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" // custom link per product
  }
];

/* ---------- product storage helpers ---------- */
function getProducts() {
  const raw = localStorage.getItem('faateh_products');
  if (!raw) {
    saveProducts(defaultProducts);
    return defaultProducts.slice();
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    saveProducts(defaultProducts);
    return defaultProducts.slice();
  }
}
function saveProducts(arr) {
  localStorage.setItem('faateh_products', JSON.stringify(arr));
}

/* ---------- cart helpers ---------- */
function getCart() {
  const raw = localStorage.getItem('faateh_cart');
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch(e) {
    localStorage.removeItem('faateh_cart');
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem('faateh_cart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(product, qty = 1) {
  if (!product) return;
  const cart = getCart();
  const idx = cart.findIndex(c => c.id === product.id);
  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: product.priceNum || 0,
      image: product.image,
      whatsappLink: product.whatsappLink || "", // store custom link
      qty: qty
    });
  }
  saveCart(cart);
}
function updateCartQty(index, qty) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = qty;
  saveCart(cart);
}
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}
function clearCart() {
  localStorage.removeItem('faateh_cart');
  updateCartCount();
}

/* ---------- UI helpers ---------- */
function updateCartCount() {
  const el = document.getElementById('cartCount');
  if (!el) return;
  const total = getCart().reduce((s,i)=>s+i.qty,0);
  el.textContent = total;
}

/* auto-update cart count on load */
updateCartCount();

/* ---------- WhatsApp Checkout ---------- */
function checkoutWhatsApp() {
  const cart = getCart();
  if (!cart || cart.length === 0) return alert("Your cart is empty!");

  let message = "Hey! I'm interested in these products:\n\n";
  cart.forEach(item => {
    message += `• ${item.name} (${item.price}) x${item.qty}\n`;
    if (item.whatsappLink) message += `Link: ${item.whatsappLink}\n`;
    message += `${item.whatsappLink}\n\n`;
  });

  const total = cart.reduce((s,i)=>s+i.priceNum*i.qty,0);
  message += `Total: ₹${total}\n\nPlease confirm.`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* Bind checkout button */
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", checkoutWhatsApp);
}
