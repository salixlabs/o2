// Main JavaScript file
// Currently empty as mobile navigation is handled inline
// Future shared functionality can be added here

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Testimonial Carousel
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.testimonial-container');
    const testimonials = document.querySelectorAll('.testimonial');
    const navContainer = document.querySelector('.testimonial-nav');
    let currentIndex = 0;

    // Create navigation dots
    testimonials.forEach((_, index) => {
        const button = document.createElement('button');
        button.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        if (index === 0) button.classList.add('active');
        button.addEventListener('click', () => goToSlide(index));
        navContainer.appendChild(button);
    });

    function goToSlide(index) {
        currentIndex = index;
        const offset = -100 * currentIndex;
        container.style.transform = `translateX(${offset}%)`;
        
        // Update active nav button
        document.querySelectorAll('.testimonial-nav button').forEach((button, i) => {
            button.classList.toggle('active', i === currentIndex);
        });
    }

    // Auto advance every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        goToSlide(currentIndex);
    }, 5000);
});

function initMobileNavToggle() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('nav ul');
    if (mobileNavToggle && navList) {
        mobileNavToggle.addEventListener('click', function() {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNavToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileNavToggle();
}); 