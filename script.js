document.addEventListener('DOMContentLoaded', () => {
    // --- Particles.js Initialization ---
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#757575"
            },
            "shape": {
                "type": "circle",
            },
            "opacity": {
                "value": 0.6,
                "random": true,
            },
            "size": {
                "value": 3,
                "random": true,
            },
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": "#757575",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": { "opacity": 1 }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": { "particles_nb": 4 },
                "remove": { "particles_nb": 2 }
            }
        },
        "retina_detect": true
    });

    // --- Theme Switcher Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = 'fa-sun';
    const moonIcon = 'fa-moon';
    
    // Function to set the theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const iconElement = themeToggle.querySelector('i');
        if (theme === 'dark') {
            iconElement.classList.remove(moonIcon);
            iconElement.classList.add(sunIcon);
        } else {
            iconElement.classList.remove(sunIcon);
            iconElement.classList.add(moonIcon);
        }
    };

    // Event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Check for saved theme in localStorage on page load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // --- Mobile menu toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Intersection Observer for scroll animations ---
    const sections = document.querySelectorAll('.content-section');
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Active navigation link on scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 85) { // Adjusted offset for sticky header
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- NEW: Stats Counter Animation ---
    const statsSection = document.querySelector('.about-stats');

    if (statsSection) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            const [entry] = entries; // Get the first entry

            // If the element is intersecting and not yet animated
            if (entry.isIntersecting && !statsSection.classList.contains('animated')) {
                statsSection.classList.add('animated'); // Prevent re-animation

                const counters = statsSection.querySelectorAll('h3[data-target]');
                const animationDuration = 2000; // 2 seconds

                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let startTime = null;

                    const updateCount = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        
                        const currentCount = Math.min(Math.floor(progress / animationDuration * target), target);
                        
                        counter.innerText = currentCount + '+';

                        if (currentCount < target) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target + '+'; // Ensure it ends perfectly
                        }
                    };
                    
                    requestAnimationFrame(updateCount);
                });

                observer.unobserve(statsSection); // Stop observing after animation
            }
        }, {
            threshold: 0.5 // Trigger when 50% of the element is in view
        });

        counterObserver.observe(statsSection);
    }

    // --- Contact form handler ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you shortly.');
            contactForm.reset();
        });
    }
});