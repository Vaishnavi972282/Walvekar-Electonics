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
}); 