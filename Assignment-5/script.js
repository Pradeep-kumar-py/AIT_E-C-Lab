// Product Database
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 79.99,
        image: 'https://www.gonoise.com/cdn/shop/files/1-3_result.webp?v=1771479107',
        description: 'High-quality wireless headphones with noise cancellation'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://m.media-amazon.com/images/I/51wxHEqyaNL._SX679_.jpg',
        description: 'Feature-rich smartwatch with health tracking'
    },
    {
        id: 3,
        name: 'Laptop Stand',
        price: 49.99,
        image: 'https://www.ugreenindia.com/cdn/shop/files/415VYhWmQTL._AC_SL1000.jpg?v=1763832918&width=1500',
        description: 'Ergonomic aluminum laptop stand'
    },
    {
        id: 4,
        name: 'USB-C Hub',
        price: 39.99,
        image: 'https://www.ugreenindia.com/cdn/shop/files/71KaQtsnzxL._SL1500_a721be2c-2edc-4ffc-950a-4f484cface22.jpg?v=1763833738&width=1500',
        description: '7-in-1 USB-C hub with multiple ports'
    },
    {
        id: 5,
        name: 'Mechanical Keyboard',
        price: 129.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwsmj0cwXvc69bm9I73t2TQnxhraa11yEWQ&s',
        description: 'RGB mechanical gaming keyboard'
    },
    {
        id: 6,
        name: 'Wireless Mouse',
        price: 59.99,
        image: 'https://www.ugreenindia.com/cdn/shop/files/71jp0cIdxHL._AC_SL1500.jpg?v=1763831726&width=1125',
        description: 'Ergonomic wireless mouse with precision tracking'
    }
];

// Cart Management using localStorage
class ShoppingCart {
    constructor() {
        this.storageKey = 'shopping_cart';
        this.cart = this.loadCart();
    }

    loadCart() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {};
    }

    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    }

    addItem(productId, quantity = 1) {
        if (this.cart[productId]) {
            this.cart[productId] += quantity;
        } else {
            this.cart[productId] = quantity;
        }
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        if (quantity > 0) {
            this.cart[productId] = quantity;
        } else {
            delete this.cart[productId];
        }
        this.saveCart();
    }

    removeItem(productId) {
        delete this.cart[productId];
        this.saveCart();
    }

    clearCart() {
        this.cart = {};
        this.saveCart();
    }

    getItems() {
        return this.cart;
    }

    getItemCount() {
        return Object.values(this.cart).reduce((sum, qty) => sum + qty, 0);
    }

    getCartDetails() {
        const items = [];
        let total = 0;

        for (const [productId, quantity] of Object.entries(this.cart)) {
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                const subtotal = product.price * quantity;
                items.push({
                    product,
                    quantity,
                    subtotal
                });
                total += subtotal;
            }
        }

        const tax = total * 0.1;
        const shipping = total > 100 ? 0 : 9.99;
        const finalTotal = total + tax + shipping;

        return { items, total, tax, shipping, finalTotal };
    }
}

const cart = new ShoppingCart();

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cart.getItemCount();
    }
}

function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// Page Initialization
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        loadProductsPage();
    } else if (currentPage === 'cart.html') {
        loadCartPage();
    } else if (currentPage === 'checkout.html') {
        loadCheckoutPage();
    } else if (currentPage === 'success.html') {
        loadSuccessPage();
    }
});

// Products Page
function loadProductsPage() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="btn btn-primary add-to-cart" 
                            data-product-id="${product.id}"
                            data-product-name="${product.name}">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            const productName = this.dataset.productName;
            
            cart.addItem(productId, 1);
            showNotification(`${productName} added to cart!`, 'success');
            updateCartBadge();
        });
    });
}

// Cart Page
function loadCartPage() {
    const content = document.getElementById('cart-content');
    if (!content) return;

    const { items, total, tax, shipping, finalTotal } = cart.getCartDetails();

    if (items.length === 0) {
        content.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <a href="index.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    content.innerHTML = `
        <div class="cart-container">
            <div class="cart-items">
                ${items.map(item => `
                    <div class="cart-item" data-product-id="${item.product.id}">
                        <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.product.name}</h3>
                            <p class="cart-item-price">$${item.product.price.toFixed(2)}</p>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-product-id="${item.product.id}">-</button>
                            <input type="number" 
                                   class="quantity-input" 
                                   value="${item.quantity}" 
                                   min="1" 
                                   data-product-id="${item.product.id}">
                            <button class="quantity-btn increase" data-product-id="${item.product.id}">+</button>
                        </div>
                        <div class="cart-item-subtotal">
                            <span class="subtotal-amount">$${item.subtotal.toFixed(2)}</span>
                        </div>
                        <button class="remove-btn" data-product-id="${item.product.id}">✕</button>
                    </div>
                `).join('')}
            </div>

            <div class="cart-summary">
                <h3>Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (10%):</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>$${shipping.toFixed(2)}</span>
                </div>
                ${total > 100 ? '<div class="free-shipping-notice">✓ Free shipping on orders over $100!</div>' : ''}
                <hr>
                <div class="summary-row total">
                    <span><strong>Total:</strong></span>
                    <span><strong>$${finalTotal.toFixed(2)}</strong></span>
                </div>
                <a href="checkout.html" class="btn btn-primary btn-block">Proceed to Checkout</a>
                <button class="btn btn-secondary btn-block" id="clearCart">Clear Cart</button>
            </div>
        </div>
    `;

    // Add event listeners
    attachCartEventListeners();
}

function attachCartEventListeners() {
    // Increase buttons
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
            const newQuantity = parseInt(input.value) + 1;
            cart.updateQuantity(productId, newQuantity);
            loadCartPage();
            updateCartBadge();
        });
    });

    // Decrease buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
            const newQuantity = Math.max(1, parseInt(input.value) - 1);
            cart.updateQuantity(productId, newQuantity);
            loadCartPage();
            updateCartBadge();
        });
    });

    // Quantity input
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.dataset.productId);
            const newQuantity = Math.max(1, parseInt(this.value) || 1);
            cart.updateQuantity(productId, newQuantity);
            loadCartPage();
            updateCartBadge();
        });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            if (confirm('Remove this item from cart?')) {
                cart.removeItem(productId);
                showNotification('Product removed from cart', 'success');
                loadCartPage();
                updateCartBadge();
            }
        });
    });

    // Clear cart
    const clearBtn = document.getElementById('clearCart');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                cart.clearCart();
                showNotification('Cart cleared', 'success');
                loadCartPage();
                updateCartBadge();
            }
        });
    }
}

// Checkout Page
function loadCheckoutPage() {
    const content = document.getElementById('checkout-content');
    if (!content) return;

    const { items, total, tax, shipping, finalTotal } = cart.getCartDetails();

    if (items.length === 0) {
        window.location.href = 'index.html';
        return;
    }

    content.innerHTML = `
        <div class="checkout-container">
            <div class="checkout-form">
                <form id="checkoutForm">
                    <section class="form-section">
                        <h3>Contact Information</h3>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                    </section>

                    <section class="form-section">
                        <h3>Shipping Address</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" required>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="address">Street Address</label>
                            <input type="text" id="address" name="address" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="city">City</label>
                                <input type="text" id="city" name="city" required>
                            </div>
                            <div class="form-group">
                                <label for="state">State</label>
                                <input type="text" id="state" name="state" required>
                            </div>
                            <div class="form-group">
                                <label for="zip">ZIP Code</label>
                                <input type="text" id="zip" name="zip" required>
                            </div>
                        </div>
                    </section>

                    <section class="form-section">
                        <h3>Payment Information</h3>
                        <div class="form-group">
                            <label for="cardName">Name on Card</label>
                            <input type="text" id="cardName" name="cardName" required>
                        </div>
                        <div class="form-group">
                            <label for="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required maxlength="19">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiry">Expiry Date</label>
                                <input type="text" id="expiry" name="expiry" placeholder="MM/YY" required maxlength="5">
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" name="cvv" placeholder="123" required maxlength="3">
                            </div>
                        </div>
                    </section>

                    <button type="submit" class="btn btn-primary btn-block">Place Order</button>
                </form>
            </div>

            <div class="checkout-summary">
                <h3>Order Summary</h3>
                <div class="order-items">
                    ${items.map(item => `
                        <div class="order-item">
                            <div class="order-item-details">
                                <span class="order-item-name">${item.product.name}</span>
                                <span class="order-item-quantity">× ${item.quantity}</span>
                            </div>
                            <span class="order-item-price">$${item.subtotal.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="summary-calculations">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>$${total.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Tax (10%):</span>
                        <span>$${tax.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping:</span>
                        <span>$${shipping.toFixed(2)}</span>
                    </div>
                    ${total > 100 ? '<div class="free-shipping-notice">✓ Free shipping on orders over $100!</div>' : ''}
                    <hr>
                    <div class="summary-row total">
                        <span><strong>Total:</strong></span>
                        <span><strong>$${finalTotal.toFixed(2)}</strong></span>
                    </div>
                </div>
            </div>
        </div>
    `;

    attachCheckoutEventListeners();
}

function attachCheckoutEventListeners() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    // Format card number
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });

    // Format expiry
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cvv = document.getElementById('cvv').value;
        const expiry = document.getElementById('expiry').value;

        // Validation
        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            showNotification('Please enter a valid 16-digit card number', 'error');
            return;
        }

        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            showNotification('Please enter a valid 3-digit CVV', 'error');
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            showNotification('Please enter expiry date in MM/YY format', 'error');
            return;
        }

        // Save order
        const { items, finalTotal } = cart.getCartDetails();
        const order = {
            items,
            total: finalTotal,
            date: new Date().toISOString(),
            customer: {
                email: document.getElementById('email').value,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value
            }
        };

        localStorage.setItem('last_order', JSON.stringify(order));
        cart.clearCart();
        window.location.href = 'success.html';
    });
}

// Success Page
function loadSuccessPage() {
    const content = document.getElementById('success-content');
    if (!content) return;

    const orderData = localStorage.getItem('last_order');
    
    if (!orderData) {
        window.location.href = 'index.html';
        return;
    }

    const order = JSON.parse(orderData);
    const orderDate = new Date(order.date);

    content.innerHTML = `
        <div class="success-container">
            <div class="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Your order has been confirmed.</p>
            
            <div class="order-details">
                <h3>Order Details</h3>
                <p class="order-date">Order Date: ${orderDate.toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                })}</p>
                
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <span>${item.product.name} × ${item.quantity}</span>
                            <span>$${item.subtotal.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="order-total">
                    <strong>Total Paid:</strong>
                    <strong>$${order.total.toFixed(2)}</strong>
                </div>
            </div>

            <div class="success-actions">
                <a href="index.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        </div>
    `;
}
