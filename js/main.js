// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery Hover Effects
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.03)';
        img.style.boxShadow = '0 15px 30px rgba(0,0,0,0.4)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
    });
});

// Form Validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]') || contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[name="email"]') || contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea[name="message"]') || contactForm.querySelector('textarea');
        
        if (!name.value || !email.value || !message.value) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Form submitted successfully!');
        contactForm.reset();
    });
}

const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = bookingForm.querySelector('input[type="text"]');
        const email = bookingForm.querySelector('input[type="email"]');
        const phone = bookingForm.querySelector('input[type="tel"]');
        const eventType = bookingForm.querySelector('select');
        const details = bookingForm.querySelector('textarea');
        
        if (!name.value || !email.value || !phone.value || !eventType.value || !details.value) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Booking request submitted successfully! We will contact you soon.');
        bookingForm.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}