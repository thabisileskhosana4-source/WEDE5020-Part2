// --- 1. POP-UP MODALS ---
function openModal(modalId) {
document.getElementById(modalId).classList.add('show-modal');
    }

function closeModal(modalId) {
document.getElementById(modalId).classList.remove('show0modal');
    }

// --- 2. SHOPPING CART ---
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }
    updateCartDisplay();
    openCart(); 
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    if (!cartContainer) return; // Safety check

    cartContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center; color: #888;">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += (item.price * item.qty);
            count += item.qty;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        R${item.price.toFixed(2)}
                    </div>
                    <div class="qty-controls">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </div>
            `;
        });
    }
    if(cartTotal) cartTotal.innerText = total.toFixed(2);
    if(cartCount) cartCount.innerText = count;
}

function changeQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1); 
    }
    updateCartDisplay();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
    }
}

function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('open');
    }
}

function checkout() {
    if (cart.length === 0) { alert("Your cart is empty!"); return; }
    alert("Order placed successfully! Please pay at the counter when you collect.");
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// --- 3. SEARCH FILTER ---
function filterProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        let title = card.querySelector('.product-title').innerText.toLowerCase();
        if (title.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// --- 4. LIGHTBOX ---
function openLightbox(imageSrc) {
    let lightbox = document.getElementById('lightbox');
    let lightboxImg = document.getElementById('lightbox-img');
    if(lightbox && lightboxImg) {
        lightbox.style.display = "flex";
        lightboxImg.src = imageSrc;
    }
}

function closeLightbox() {
    let lightbox = document.getElementById('lightbox');
    if(lightbox) {
        lightbox.style.display = "none";
    }
}