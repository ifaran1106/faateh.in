// Select containers
const productsContainer = document.querySelector('.products');

// Load all products dynamically
async function loadProducts() {
    const res = await fetch('products.json');
    const products = await res.json();

    if (!productsContainer) return;

    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <div style="display:flex; justify-content:space-between; padding:0 0.5rem 0.5rem 0.5rem;">
                <button onclick="addToCart('${product.name}')">Add to Cart</button>
                <button onclick="window.open('${product.whatsappLink}', '_blank')">Buy</button>
            </div>
        </div>
    `).join('');
}

// CART MANAGEMENT
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName) {
    const res = fetch('products.json')
        .then(r => r.json())
        .then(products => {
            const product = products.find(p => p.name === productName);
            if (!product) return;
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} added to cart`);
        });
}

// PRODUCT PAGE
function loadSingleProduct() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (!name) return;

    fetch('products.json')
        .then(r => r.json())
        .then(products => {
            const product = products.find(p => p.name === name);
            if (!product) return;

            document.querySelector('.product-image').src = product.image;
            document.querySelector('.product-name').textContent = product.name;
            document.querySelector('.product-price').textContent = product.price;
            document.querySelector('.product-whatsapp').onclick = () => {
                window.open(product.whatsappLink, '_blank');
            };
        });
}

// CART PAGE
function loadCart() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    cartContainer.innerHTML = cart.map((product, index) => `
        <div class="cart-item">
            <img src="${product.image}" alt="${product.name}" style="height:120px; object-fit:cover;">
            <div style="flex:1; margin-left:1rem;">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        </div>
    `).join('');

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        const message = cart.map(p => `• ${p.name} (${p.price})`).join('%0A');
        checkoutBtn.href = `https://wa.me/917620994805?text=Hey! I'm interested in these products:%0A${message}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadSingleProduct();
    loadCart();
});
