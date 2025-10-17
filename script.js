const productsContainer = document.querySelector('.products');

async function loadProducts() {
    const res = await fetch('products.json');
    const products = await res.json();

    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button onclick="window.open('${product.whatsappLink}', '_blank')">Buy on WhatsApp</button>
        </div>
    `).join('');
}

loadProducts();
