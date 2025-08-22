document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.glass-navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Offset for fixed navbar
                const navbarHeight = document.querySelector('.glass-navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize cart functionality if on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }

    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter products
            document.querySelectorAll('.product-card').forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Simple cart functions
function getCart() {
    return JSON.parse(localStorage.getItem('mewantra_cart') || '[]');
}

function setCart(cart) {
    localStorage.setItem('mewantra_cart', JSON.stringify(cart));
}

function addToCart(product, price, img) {
    let cart = getCart();
    const existingItem = cart.find(item => item.name === product);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            name: product,
            price: price,
            qty: 1,
            img: img || 'assets/images/products/default.jpg'
        });
    }
    
    setCart(cart);
    
    // Show notification
    showNotification(`${product} added to cart!`);
}

function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '20px';
        notification.style.background = 'rgba(191, 160, 84, 0.9)';
        notification.style.color = '#1a2238';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.transform = 'translateY(100px)';
        notification.style.transition = 'transform 0.3s ease';
        document.body.appendChild(notification);
    }
    
    // Update message and show notification
    notification.textContent = message;
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
    }, 3000);
}

// Add event listeners to "Add to Cart" buttons if they exist
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            const imgEl = this.closest('.product-card').querySelector('img');
            const img = imgEl ? imgEl.src : null;
            
            addToCart(product, price, img);
        });
    });
});

// Make sure renderCart is defined globally, not inside another function
function renderCart() {
    // Your cart rendering code
}