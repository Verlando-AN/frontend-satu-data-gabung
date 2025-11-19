document.addEventListener("DOMContentLoaded", () => {

    // ===== Animate Counter =====
    function animateCounter() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        });
    }

    // ===== Intersection Observer for Counter =====
    const statsSection = document.querySelector('.stats');
    let counterAnimated = false;

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterAnimated) {
                    animateCounter();
                    counterAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ===== FAQ Accordion =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(faq => faq.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Thank you for subscribing with: ${email}`);
            newsletterForm.reset();
        });
    }

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Category Cards Hover Effect =====
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== Search Bar =====
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const searchValue = searchInput.value.trim();
            if (searchValue) {
                alert(`Searching for: ${searchValue}`);
            } else {
                searchInput.focus();
            }
        });
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchButton.click();
            }
        });
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            header.style.boxShadow = currentScroll > 100
                ? '0 5px 20px rgba(0,0,0,0.15)'
                : '0 2px 10px rgba(0,0,0,0.1)';
        });
    }

    // ===== Animate On Scroll =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .category-card, .testimonial-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elements.forEach(el => observer.observe(el));
    };
    animateOnScroll();

    // ===== Mobile Menu =====
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            if (nav && navLinks && !document.querySelector('.mobile-menu-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'mobile-menu-toggle';
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
                toggle.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #333;
                    display: block;
                `;
                nav.appendChild(toggle);
                toggle.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.background = 'white';
                    navLinks.style.padding = '1rem';
                    navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                });
            }
        }
    };
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // ===== Loading Animation =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===== Platform Section Animation =====
    const platformSection = document.querySelector('.platform');
    if (platformSection) {
        const platformObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const platformImage = entry.target.querySelector('.platform-image');
                    if (platformImage) {
                        platformImage.style.opacity = '0';
                        platformImage.style.transform = 'translateX(50px)';
                        setTimeout(() => {
                            platformImage.style.transition = 'all 0.8s ease';
                            platformImage.style.opacity = '1';
                            platformImage.style.transform = 'translateX(0)';
                        }, 200);
                    }
                    platformObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        platformObserver.observe(platformSection);
    }

    console.log('✅ KofeJob Homepage Loaded Successfully!');
});
