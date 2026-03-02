document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when a link is clicked
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    menuBtn.classList.remove('open');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Navigation Link Update on Scroll
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200; // Offset for better accuracy

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const faders = document.querySelectorAll('.fade-in, .timeline-item, .education-card, .skill-tag, .contact-item');

    // Add base class for animation
    faders.forEach(fader => {
        if (!fader.classList.contains('fade-in')) {
            fader.classList.add('fade-in');
        }
    });

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Staggered animation for skills and education cards
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.transitionDelay = `${index * 0.05}s`;
    });
});
