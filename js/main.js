// Loading Screen
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1000);
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Header Scroll Effect - ACTUALIZADO
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollPosition = window.scrollY;
    
    // Cambiar a color del favicon cuando haga scroll más de 50px
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Asegurar que el header inicie transparente
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    header.classList.remove('scrolled');
});

// Smooth Scrolling for Navigation Links
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
            navMenu.classList.remove('active');
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step-card, .bonus-card, .sector-item, .results-card').forEach(el => {
    observer.observe(el);
});

// CTA Button Tracking (Google Tag Manager Events)
function trackCTAClick(action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'CTA',
            'event_label': label,
            'action': action
        });
    }
    
    // Also send to dataLayer for GTM
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'cta_click',
            'cta_action': action,
            'cta_label': label
        });
    }
}

// Add event listeners to CTA buttons
document.querySelectorAll('.cta-primary, .cta-secondary, .cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.textContent.trim();
        const section = this.closest('section')?.id || 'unknown';
        trackCTAClick(action, section);
    });
});

// Enhanced Form submission tracking
function trackFormSubmission(formName, leadData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'Form',
            'event_label': formName,
            'custom_parameters': {
                'sector': leadData.sector,
                'presupuesto': leadData.presupuesto,
                'has_empresa': leadData.empresa ? 'yes' : 'no'
            }
        });
    }
    
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'form_submission',
            'form_name': formName,
            'lead_data': leadData
        });
    }
    
    // Track conversion for Google Ads
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
            'value': 1.0,
            'currency': 'MXN'
        });
    }
}

// Phone call tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        trackCTAClick('phone_call', this.href);
    });
});

// Email tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        trackCTAClick('email_click', this.href);
    });
});

// WhatsApp tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        trackCTAClick('whatsapp_click', 'contact');
    });
});

// Scroll depth tracking
let scrollDepthMarks = [25, 50, 75, 90];
let scrollDepthReached = [];

window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    scrollDepthMarks.forEach(mark => {
        if (scrollPercent >= mark && !scrollDepthReached.includes(mark)) {
            scrollDepthReached.push(mark);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll', {
                    'event_category': 'Scroll Depth',
                    'event_label': mark + '%'
                });
            }
            
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'scroll_depth',
                    'scroll_depth': mark
                });
            }
        }
    });
});

// Page timing tracking
window.addEventListener('load', function() {
    setTimeout(function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'page_load',
                'value': Math.round(performance.now())
            });
        }
    }, 1000);
});

// Exit intent tracking
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'exit_intent'
            });
        }
    }
});

// Form field focus tracking
document.querySelectorAll('#leadForm input, #leadForm select').forEach(field => {
    field.addEventListener('focus', function() {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'form_field_focus',
                'field_name': this.name
            });
        }
    });
});

// Add structured data for local business
const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lead2me",
    "image": "https://www.lead2me.net/images/logo.png",
    "telephone": "6679404929",
    "email": "contact@lead2me.net",
    "url": "https://www.lead2me.net",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "MX"
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "14:00"
        }
    ],
    "priceRange": "$",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "50"
    }
};

// Add the structured data to the page
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);

// Form validation enhancements - CORREGIDO
function validateForm() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Clear previous errors
    clearFieldErrors();
    
    let isValid = true;
    
    if (nombre.length < 2) {
        showFieldError('nombre', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    if (!isValidEmail(email)) {
        showFieldError('email', 'Ingresa un email válido');
        isValid = false;
    }    
       
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearFieldErrors() {
    document.querySelectorAll('.field-error').forEach(error => {
        error.remove();
    });
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentNode.querySelector('.field-error');
    
    if (existingError) {
        existingError.remove();
    }
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.3rem';
    errorElement.style.textShadow = '0 1px 3px rgba(0,0,0,0.3)';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
    field.focus();
    
    // Add error styling to field
    field.style.borderColor = '#ff6b6b';
    field.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
    
    // Remove error styling when user starts typing
    field.addEventListener('input', function() {
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        field.style.boxShadow = 'none';
        if (errorElement.parentNode) {
            errorElement.remove();
        }
    }, { once: true });
    
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.remove();
        }
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        field.style.boxShadow = 'none';
    }, 5000);
}
// Lead Form Handling - AJAX Version CORREGIDO
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    // Función para mostrar modal
    function showSuccessModal() {
        if (modal) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                modal.classList.add('show');
            }, 300);
        }
    }
    
    // Función para cerrar modal
    function hideModal() {
        if (modal) {
            modal.classList.remove('show');
        }
    }
    
    // Event listeners para cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            hideModal();
        }
    });
    
    // Manejo del formulario
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '📤 Enviando...';
            submitButton.disabled = true;
            
            const formData = new FormData(this);
            const leadData = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                empresa: formData.get('empresa'),
                sector: formData.get('sector'),
                presupuesto: formData.get('presupuesto'),
                timestamp: new Date().toISOString(),
                source: 'website_hero_form'
            };
            
            try {
                const response = await fetch('https://formspree.io/f/mdkdqwpn', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    trackFormSubmission('hero_lead_form', leadData);
                    showSuccessModal();
                    form.reset();
                } else {
                    throw new Error('Error en el envío');
                }
                
            } catch (error) {
                alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
                console.error('Error:', error);
            } finally {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Animaciones de los campos del formulario
    const formFields = document.querySelectorAll('#leadForm input, #leadForm select');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
            this.parentNode.style.transition = 'transform 0.2s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });
});

// WhatsApp Float Button Tracking
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function() {
            trackCTAClick('whatsapp_float_click', 'floating_button');
        });
    }
});