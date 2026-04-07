// ========================================
// Custom Printed T-Shirts - JavaScript
// ========================================

// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Product added to cart!', 'success');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#2ECC71' : '#FF6B6B'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize shopping cart
const cart = new ShoppingCart();

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Change icon
            const icon = mobileMenuToggle.querySelector('i');
            icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
        });

        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }

    // Add to Cart Buttons
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const priceText = productCard.querySelector('.price-current').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            
            const product = {
                id: index + 1,
                name: productName,
                price: price,
                image: productCard.querySelector('.product-image img').src
            };
            
            cart.addItem(product);
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current FAQ
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        // Parallax effect on hero section (optional)
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Newsletter Form Validation
    const newsletterForm = document.getElementById('mc-embedded-subscribe-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('mce-EMAIL');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Here you would typically submit to Mailchimp
            // For now, we'll show a success message
            showFormMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
            
            // Clear form
            newsletterForm.reset();
            
            // In production, uncomment this to submit to Mailchimp:
            // this.submit();
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!data.name || !data.email || !data.subject || !data.message) {
                cart.showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                cart.showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            cart.showNotification('Message sent successfully! We will get back to you soon.', 'success');
            this.reset();
            
            // In production, send data to server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
        });
    }

    // Image Lazy Loading (if needed)
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .step-card, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Helper function for form messages
function showFormMessage(message, type) {
    const successResponse = document.getElementById('mce-success-response');
    const errorResponse = document.getElementById('mce-error-response');
    
    if (type === 'success') {
        successResponse.textContent = message;
        successResponse.style.display = 'block';
        errorResponse.style.display = 'none';
    } else {
        errorResponse.textContent = message;
        errorResponse.style.display = 'block';
        successResponse.style.display = 'none';
    }
    
    // Hide message after 5 seconds
    setTimeout(() => {
        successResponse.style.display = 'none';
        errorResponse.style.display = 'none';
    }, 5000);
}

// Google Analytics Event Tracking (if GA is set up)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track product views
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        const productName = this.querySelector('.product-name').textContent;
        trackEvent('Products', 'View', productName);
    });
});

// Track add to cart events
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.closest('.product-card').querySelector('.product-name').textContent;
        trackEvent('Cart', 'Add', productName);
    });
});

// Track newsletter signups
const newsletterSubmit = document.getElementById('mc-embedded-subscribe');
if (newsletterSubmit) {
    newsletterSubmit.addEventListener('click', function() {
        trackEvent('Newsletter', 'Subscribe', 'Email Signup');
    });
}

// Exit Intent Popup (Optional)
let exitPopupShown = false;

document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 0 && !exitPopupShown && window.innerWidth > 768) {
        exitPopupShown = true;
        showExitPopup();
    }
});

function showExitPopup() {
    // Create exit popup
    const popup = document.createElement('div');
    popup.className = 'exit-popup';
    popup.innerHTML = `
        <div class="exit-popup-content">
            <button class="close-popup" aria-label="Close popup">&times;</button>
            <h3>Wait! Don't Leave Yet!</h3>
            <p>Get <strong>15% OFF</strong> your first order</p>
            <form class="exit-popup-form">
                <input type="email" placeholder="Enter your email" required>
                <button type="submit" class="btn btn-primary">Get Discount</button>
            </form>
        </div>
    `;
    
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(popup);
    
    // Close popup
    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
    });
    
    // Handle form submission
    popup.querySelector('.exit-popup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        cart.showNotification('Discount code sent to your email!', 'success');
        popup.remove();
        trackEvent('Exit Intent', 'Subscribe', 'Popup');
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .exit-popup-content {
        background: white;
        padding: 3rem;
        border-radius: 15px;
        max-width: 500px;
        text-align: center;
        position: relative;
    }
    
    .close-popup {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #999;
    }
    
    .exit-popup h3 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #2C3E50;
    }
    
    .exit-popup p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
    }
    
    .exit-popup-form {
        display: flex;
        gap: 0.5rem;
    }
    
    .exit-popup-form input {
        flex: 1;
        padding: 1rem;
        border: 2px solid #BDC3C7;
        border-radius: 8px;
        font-size: 1rem;
    }
`;
document.head.appendChild(style);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', (pageLoadTime / 1000).toFixed(2), 'seconds');
            
            // Track in analytics
            trackEvent('Performance', 'Page Load Time', pageLoadTime);
        }, 0);
    });
}

console.log('🎨 UrbanInk Custom T-Shirts - Loaded Successfully!');
