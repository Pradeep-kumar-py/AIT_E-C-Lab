# Lab Assignment 5: Shopping Cart with Session Handling

## Overview
This is a complete e-commerce shopping cart implementation using **JavaScript with localStorage** for session/state management. No server-side code required!

## Features

### 1. Product Listing (index.php)
- Display of 6 sample tech products
- Product cards with images, names, descriptions, and prices
- "Add to Cart" functionality for each product
- Real-time cart badge update

### 2. Session-Based Cart Management (localStorage)
- Add items to cart
- Update item quantities
- Remove items from cart
- Clear entire cart
- Persistent cart storage using browser localStorage

### 3. Shopping Cart Page (cart.php)
- View all items in cart
- Increase/decrease quantity with +/- buttons
- Manual quantity input
- Remove individual items
- Clear entire cart
- Order summary with:
  - Subtotal
  - Tax calculation (10%)
  - Shipping ($9.99, free over $100)
  - Total amount

### 4. Checkout Page (checkout.php)
- Customer information form
  - Contact details
  - Shipping address
  - Payment information
- Order summary sidebar
- Form validation
- Card number formatting (XXXX XXXX XXXX XXXX)
- Expiry date formatting (MM/YY)

### 5. Order Confirmation (order_success.php)
- Order confirmation message
- Order details display
- Order timestamp
- Items purchased with quantities
- Total amount paid

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Session Storage**: localStorage API
- **No Backend Required**: Pure client-side implementation

## File Structure

```
Assignment-5/
├── index.html              # Product listing page
├── cart.html               # Shopping cart page
├── checkout.html           # Checkout form page
├── success.html            # Order confirmation page
├── script.js               # All JavaScript logic (products, cart, sessions)
├── style.css               # Styling
└── README.md               # Documentation
```

## How to Run

1. **Requirements**:
   - Any modern web browser (Chrome, Firefox, Safari, Edge)
   - No server required!

2. **Option 1: Direct File Opening**:
   - Simply open `index.html` in your browser
   - Or drag and drop `index.html` into your browser

3. **Option 2: Using Live Server** (recommended for better experience):
   - Use VS Code Live Server extension
   - Or use Python: `python -m http.server 8000`
   - Or use Node.js: `npx serve`

4. **Access the Application**:
   - Open `index.html` in your browser

4. **Test the Features**:
   - Browse products on the homepage
   - Add items to cart
   - View cart and update quantities
   - Proceed to checkout
   - Fill out the form and place order
   - View order confirmation

## Key Concepts Demonstrated

### Session Handling with localStorage
- Storing cart data in browser's localStorage
- Persisting data across page refreshes
- Session-based order history
- Cart state management with JavaScript classes

### Dynamic Content Loading
- All content generated dynamically with JavaScript
- Template literals for HTML generation
- Event delegation for dynamic elements

### Form Validation
- Client-side validation with JavaScript
- Input formatting (card number, expiry date)
- Required field validation

### Responsive Design
- Mobile-friendly layout
- CSS Grid for product display
- Flexible cart and checkout layouts

## Cart Session Structure (localStorage)

```javascript
{
    "1": 2,  // Product ID => Quantity
    "3": 1,
    "5": 3
}
```

## ShoppingCart Class Methods

- `addItem(productId, quantity)` - Add product to cart
- `updateQuantity(productId, quantity)` - Update product quantity
- `removeItem(productId)` - Remove product from cart
- `clearCart()` - Clear entire cart
- `getItemCount()` - Get total item count
- `getCartDetails()` - Get full cart with calculations

## Future Enhancements

- User authentication
- Database integration
- Payment gateway integration
- Order history
- Product search and filtering
- Wishlist functionality
- Product reviews
- Inventory management

## Assignment Requirements Met

✅ Add-to-cart functionality  
✅ Session-based quantity tracking  
✅ Cart display with items and quantities  
✅ Update and remove cart items  
✅ Checkout process  
✅ Order summary and calculations  
✅ Responsive design  
✅ JavaScript interactivity  

## Author
Lab Assignment 5 - E-Commerce & Tech Backbone
