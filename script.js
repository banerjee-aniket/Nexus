<script>
// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.nav');

// Mobile Navigation Toggle
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Close Mobile Navigation
function closeMobileNav() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}

// Smooth Scrolling Function
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation Background Change on Scroll
function handleNavScroll() {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.1)';
    }
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Event Listeners
function addEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileNav);

    // Close mobile menu when clicking on navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', handleNavScroll);

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            closeMobileNav();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
}

// Page Performance Optimization
function optimizePerformance() {
    // Lazy load images if any
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize Application
function init() {
    // Add event listeners
    addEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Optimize performance
    optimizePerformance();
    
    // Set initial navbar state
    handleNavScroll();
    
    console.log('Nexus Landing Page Initialized Successfully!');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for potential external use
window.NexusApp = {
    toggleMobileNav,
    closeMobileNav,
    smoothScroll,
    handleNavScroll
};
</script>