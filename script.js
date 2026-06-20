// Immediately set theme to avoid flashing
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Listener
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'light';
            if (currentTheme === 'light') {
                newTheme = 'dark';
            }
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.click();
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            navbar.style.padding = '5px 0';
            navbar.style.backgroundColor = 'rgba(27, 13, 30, 0.95)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            navbar.style.padding = '0';
            navbar.style.backgroundColor = 'rgba(27, 13, 30, 1.0)';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('productModal');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const closeModalBtn = document.querySelector('.close-modal');

    if (modal && viewDetailsBtns.length > 0) {
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        };

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Esc key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    // Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .about-text, .product-card, .benefit-card').forEach(el => {
        el.classList.add('reveal-element');
        observer.observe(el);
    });
});
