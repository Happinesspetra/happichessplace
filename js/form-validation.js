// Form Validation Helper Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-()+]{10,}$/;
    return re.test(phone);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('span');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('invalid');
}

function clearError(input) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('invalid');
}

// Generic Form Validation
function setupFormValidation(form, fields) {
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all fields
        fields.forEach(field => {
            const input = form.querySelector(field.selector);
            if (!input) return;

            clearError(input);

            if (field.required && !input.value.trim()) {
                showError(input, field.messages?.required || 'This field is required');
                isValid = false;
            }
            else if (field.type === 'email' && !validateEmail(input.value)) {
                showError(input, field.messages?.invalid || 'Please enter a valid email');
                isValid = false;
            }
            else if (field.type === 'tel' && !validatePhone(input.value)) {
                showError(input, field.messages?.invalid || 'Please enter a valid phone number');
                isValid = false;
            }
        });

        if (isValid) {
            // Form submission logic would go here
            alert(form.id === 'booking-form' 
                ? 'Booking request submitted successfully! We will contact you soon.' 
                : 'Form submitted successfully!');
            form.reset();
        }
    });

    // Add real-time validation on blur
    fields.forEach(field => {
        const input = form.querySelector(field.selector);
        if (!input) return;

        input.addEventListener('blur', () => {
            clearError(input);

            if (field.required && !input.value.trim()) {
                showError(input, field.messages?.required || 'This field is required');
            }
            else if (field.type === 'email' && input.value && !validateEmail(input.value)) {
                showError(input, field.messages?.invalid || 'Please enter a valid email');
            }
            else if (field.type === 'tel' && input.value && !validatePhone(input.value)) {
                showError(input, field.messages?.invalid || 'Please enter a valid phone number');
            }
        });

        // Clear error on input
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                clearError(input);
            }
        });
    });
}

// Contact Form Configuration
const contactFormFields = [
    {
        selector: 'input[name="name"], input[type="text"]:first-of-type',
        required: true,
        messages: {
            required: 'Please enter your name'
        }
    },
    {
        selector: 'input[name="email"], input[type="email"]',
        type: 'email',
        required: true,
        messages: {
            required: 'Please enter your email',
            invalid: 'Please enter a valid email address'
        }
    },
    {
        selector: 'textarea[name="message"], textarea',
        required: true,
        messages: {
            required: 'Please enter your message'
        }
    }
];

// Booking Form Configuration
const bookingFormFields = [
    {
        selector: 'input[type="text"]:first-of-type',
        required: true,
        messages: {
            required: 'Please enter your name'
        }
    },
    {
        selector: 'input[type="email"]',
        type: 'email',
        required: true,
        messages: {
            required: 'Please enter your email',
            invalid: 'Please enter a valid email address'
        }
    },
    {
        selector: 'input[type="tel"]',
        type: 'tel',
        required: true,
        messages: {
            required: 'Please enter your phone number',
            invalid: 'Please enter a valid phone number'
        }
    },
    {
        selector: 'select',
        required: true,
        messages: {
            required: 'Please select an event type'
        }
    },
    {
        selector: 'textarea',
        required: true,
        messages: {
            required: 'Please enter event details'
        }
    }
];

// Initialize form validations
setupFormValidation(document.querySelector('#contact-form'), contactFormFields);
setupFormValidation(document.querySelector('#booking-form'), bookingFormFields);