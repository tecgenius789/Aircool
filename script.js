// Handle Form Submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = form.querySelector('input[placeholder="Your Name"]').value;
    const email = form.querySelector('input[placeholder="Your Email"]').value;
    const phone = form.querySelector('input[placeholder="Your Phone Number"]').value;
    const serviceType = form.querySelector('select').value;
    const message = form.querySelector('textarea').value;
    
    // Validation
    if (!name || !email || !phone || !serviceType || !message) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
        showNotification('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    // Success message
    showNotification('Service request submitted successfully! We will contact you soon.', 'success');
    
    // Reset form
    form.reset();
    
    // Log the data (In real application, send to server)
    console.log('Service Request:', {
        name,
        email,
        phone,
        serviceType,
        message,
        timestamp: new Date().toISOString()
    });
}

// Show Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
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

// Add scroll animation for elements
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-in-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation style
    const animStyle = document.createElement('style');
    animStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animStyle);
    
    // Observe service cards, stat cards, testimonial cards, etc.
    document.querySelectorAll(
        '.service-card, .stat-card, .testimonial-card, .stat, .info-item'
    ).forEach(el => {
        observer.observe(el);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    initializeCounters();
});

// Counter Animation
function initializeCounters() {
    const stats = [
        { element: document.querySelector('.about-stats .stat:nth-child(1) h3'), value: 850 },
        { element: document.querySelector('.about-stats .stat:nth-child(2) h3'), value: 650 },
        { element: document.querySelector('.about-stats .stat:nth-child(3) h3'), value: 10 },
    ];
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const stat = stats.find(s => s.element === entry.target);
                if (stat) {
                    animateCounter(entry.target, stat.value);
                    entry.target.classList.add('counted');
                }
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        if (stat.element) {
            counterObserver.observe(stat.element);
        }
    });
}

function animateCounter(element, endValue) {
    let currentValue = 0;
    const duration = 1500; // ms
    const increment = endValue / (duration / 16);
    
    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= endValue) {
            element.textContent = endValue + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue) + '+';
        }
    }, 16);
}

// Mobile Menu Toggle (optional - for future enhancement)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Prevent default form behavior for select
document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            if (e.target.value === '') {
                e.target.style.color = '#999';
            } else {
                e.target.style.color = '#333';
            }
        });
    });
});

// Add active state to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-menu a.active {
        color: #fff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }
`;
document.head.appendChild(activeStyle);

// Click to call functionality
document.addEventListener('DOMContentLoaded', () => {
    const phoneElements = document.querySelectorAll('[href^="tel:"]');
    phoneElements.forEach(el => {
        el.addEventListener('click', (e) => {
            // This will trigger native phone call on mobile
            if (!navigator.userAgent.match(/iphone|ipad|ipod|android/i)) {
                e.preventDefault();
                console.log('Click to call:', el.getAttribute('href'));
            }
        });
    });
});

// Add WhatsApp share functionality
function shareOnWhatsApp() {
    const message = 'Check out CoolTech Pro - Professional AC Services! 🌬️ Doorstep Service | Online Consultation | 24/7 Emergency Support';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Performance monitoring
console.log('Aircool Service Portal loaded successfully');
console.log('Page Load Time:', performance.timing.loadEventEnd - performance.timing.navigationStart, 'ms');
