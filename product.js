const products = [
  {
    name: "Classic Tee",
    price: "₹699",
    description: "High-quality cotton classic t-shirt",
    image: "https://raw.githubusercontent.com/ifaran1106/faateh.in/main/images/product1.jpg",
    whatsapp: "https://wa.me/917620994805?text=Hi,+I+want+to+buy+Classic+Tee"
  },
  {
    name: "Street Hoodie",
    price: "₹999",
    description: "Comfortable street-style hoodie",
    image: "https://raw.githubusercontent.com/ifaran1106/faateh.in/main/images/product2.jpg",
    whatsapp: "https://wa.me/917620994805?text=Hi,+I+want+to+buy+Street+Hoodie"
  }
];

let cart = [];

function addToCart(product){
  cart.push(product);
  document.getElementById("cart-count").innerText = cart.length;
}

// Get product index from URL ?product=0
const urlParams = new URLSearchParams(window.location.search);
const productIndex = urlParams.get("product") || 0;
const product = products[productIndex];

// Populate product page
document.getElementById("product-image").src = product.image;
document.getElementById("product-name").innerText = product.name;
document.getElementById("product-price").innerText = product.price;
document.getElementById("product-description").innerText = product.description;
document.getElementById("whatsapp-btn").href = product.whatsapp;

// Add to cart
document.getElementById("add-cart-btn").addEventListener("click", () => {
  addToCart(product);
});
