// Sample product data
const products = [
    {
        id: 1,
        name: "Smart LED Ceiling Light",
        description: "Energy-efficient LED ceiling light with smart control and customizable colors",
        price: "$99.99",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        features: ["Smart Home Compatible", "Color Changing", "Dimmable", "Energy Efficient"]
    },
    {
        id: 2,
        name: "Modern Chandelier",
        description: "Elegant chandelier with dimmable LED lights and crystal accents",
        price: "$199.99",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        features: ["Crystal Accents", "Dimmable", "LED Technology", "Modern Design"]
    },
    {
        id: 3,
        name: "Recessed Ceiling Light",
        description: "Sleek recessed lighting for modern interiors with adjustable brightness",
        price: "$79.99",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        features: ["Adjustable Brightness", "Energy Efficient", "Modern Design", "Easy Installation"]
    },
    {
        id: 4,
        name: "Ceiling Fan with Light",
        description: "Energy-efficient ceiling fan with integrated LED light and remote control",
        price: "$149.99",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        features: ["Remote Control", "LED Light", "Energy Efficient", "Multiple Speeds"]
    }
];

// Display products
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-features">
                    ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <p class="price">${product.price}</p>
                <button class="view-details" onclick="showProductDetails(${product.id})">View Details</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Show product details in a modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-product">
                <img src="${product.image}" alt="${product.name}">
                <div class="modal-product-info">
                    <h2>${product.name}</h2>
                    <p class="modal-description">${product.description}</p>
                    <div class="modal-features">
                        <h3>Features:</h3>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <p class="modal-price">${product.price}</p>
                    <button class="contact-button">Contact for Purchase</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking the close button
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Mobile navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you for your message, ${name}! We'll get back to you soon.</p>
        `;

        // Insert success message after form
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

        // Reset form
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('section');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('reveal');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Product modal functionality
    const viewDetailButtons = document.querySelectorAll('.view-details');
    viewDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productFeatures = Array.from(productCard.querySelectorAll('.feature-tag')).map(tag => tag.textContent);
            
            // Create modal content
            const modalContent = `
                <div class="modal">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <h2>${productName}</h2>
                        <div class="product-details">
                            <p><strong>Price:</strong> ${productPrice}</p>
                            <p><strong>Features:</strong></p>
                            <ul>
                                ${productFeatures.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;

            // Add modal to body
            document.body.insertAdjacentHTML('beforeend', modalContent);

            // Close modal functionality
            const modal = document.querySelector('.modal');
            const closeBtn = document.querySelector('.close-modal');
            
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    const products = document.querySelectorAll('.product-card');

    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productDescription = product.querySelector('p').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Cart functionality
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCartCount() {
        const cartCount = document.querySelectorAll('.cart-count');
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.forEach(count => {
            count.textContent = totalItems;
        });
    }

    function addToCart(product) {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }

    function removeFromCart(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        renderCartItems();
    }

    function updateQuantity(productId, change) {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) {
                removeFromCart(productId);
            } else {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCartCount();
                renderCartItems();
            }
        }
    }

    function calculateTotal() {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.18;
        const total = subtotal + tax;
        
        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2)
        };
    }

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="products.html" class="cta-button">Continue Shopping</a>
                </div>
            `;
        } else {
            cartItemsContainer.innerHTML = cartItems.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Price: ₹${item.price}</p>
                    </div>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <div class="item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }

        const totals = calculateTotal();
        document.querySelector('.subtotal').textContent = `₹${totals.subtotal}`;
        document.querySelector('.tax').textContent = `₹${totals.tax}`;
        document.querySelector('.total-amount').textContent = `₹${totals.total}`;
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Initialize cart
    document.addEventListener('DOMContentLoaded', () => {
        updateCartCount();
        renderCartItems();

        // Add event listeners for "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const product = {
                    id: productCard.dataset.id,
                    name: productCard.querySelector('h3').textContent,
                    price: parseFloat(productCard.querySelector('.current-price').textContent.replace('₹', '')),
                    image: productCard.querySelector('img').src
                };
                addToCart(product);
            });
        });

        // Add event listener for checkout button
        const checkoutButton = document.querySelector('.checkout-button');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (cartItems.length === 0) {
                    showNotification('Your cart is empty!');
                } else {
                    // Here you would typically redirect to a checkout page
                    showNotification('Proceeding to checkout...');
                }
            });
        }
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}); 