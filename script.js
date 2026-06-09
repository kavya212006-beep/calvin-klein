document.addEventListener('DOMContentLoaded', () => {

    // --- Loading Screen ---
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Match the transition duration
    }

    // --- Sticky Navbar ---
    const header = document.getElementById('header');
    const stickyNavClass = 'scrolled';
    const scrollIndicator = document.querySelector('.scroll-indicator');

    const handleScroll = () => {
        if (window.scrollY > 80) {
            header.classList.add(stickyNavClass);
            if (scrollIndicator) scrollIndicator.style.display = 'none';
        } else {
            header.classList.remove(stickyNavClass);
            if (scrollIndicator) scrollIndicator.style.display = 'block';
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navLinks && navbar) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking on a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- Smooth Scrolling & Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // If it's a navigation link, close the mobile menu
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const speed = (target > 1000) ? 2000 / target : 2000 / target; // Adjust speed based on target value

                let count = 0;
                const increment = target > 1000 ? Math.ceil(target / 1000) : 1; // Increment value, adjust for larger numbers

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        if (count > target) count = target; // Ensure we don't overshoot
                        counter.innerText = count;
                        setTimeout(updateCount, speed);
                    } else {
                        counter.innerText = target; // Ensure final value is exact
                    }
                };
                updateCount();
                observer.unobserve(counter); // Stop observing once animated
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- Tabbed Content ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button and its corresponding content
            button.classList.add('active');
            const targetTab = document.getElementById(button.getAttribute('data-tab'));
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            faqItem.classList.toggle('active');
        });
    });

    // --- Testimonial Slider ---
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.indicator');
    let currentTestimonial = 0;
    const testimonialInterval = 5000; // 5 seconds

    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            item.classList.remove('active');
            item.style.transform = 'translateX(0)'; // Reset transform
            item.style.opacity = '0';
        });
        indicators.forEach(indicator => indicator.classList.remove('active'));

        testimonialItems[index].classList.add('active');
        testimonialItems[index].style.opacity = '1';
        testimonialItems[index].style.transform = 'translateX(0)';
        indicators[index].classList.add('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }

    // Initialize first testimonial
    if (testimonialItems.length > 0) {
        showTestimonial(currentTestimonial);
        // Auto-slide testimonials
        setInterval(nextTestimonial, testimonialInterval);
    }

    // Indicator clicks
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentTestimonial = i;
            showTestimonial(currentTestimonial);
        });
    });

    // --- Portfolio Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- Form Validation (Contact & Newsletter) ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            const emailInput = document.getElementById('newsletter-email');
            if (!emailInput.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                alert('Please enter a valid email address.');
                e.preventDefault();
            } else {
                // In a real app, you'd submit the form here.
                // For this example, we'll just show an alert.
                alert('Thank you for subscribing!');
                newsletterForm.reset();
                e.preventDefault(); // Prevent actual form submission for this demo
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Basic email validation (more robust checks can be added)
            const emailInput = document.getElementById('email');
            if (!emailInput.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                alert('Please enter a valid email address.');
                e.preventDefault();
            }
            // Add other field validations as needed
            // For demonstration purposes, we'll just submit a success message if email is valid
            else {
                alert('Thank you for your message! We will get back to you shortly.');
                contactForm.reset();
                e.preventDefault(); // Prevent actual form submission for this demo
            }
        });
    }

    // --- Consultation Form Validation ---
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            // Basic email validation
            const emailInput = document.getElementById('consultEmail');
            if (!emailInput.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                alert('Please enter a valid email address.');
                e.preventDefault();
                return; // Stop submission
            }

            // Check if required fields are filled
            const requiredFields = ['consultName', 'consultPhone', 'consultService', 'consultDate', 'consultTime'];
            let allRequiredFilled = true;
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value) {
                    allRequiredFilled = false;
                    // Optionally, add visual cues for empty required fields
                }
            });

            if (!allRequiredFilled) {
                alert('Please fill in all required fields.');
                e.preventDefault();
            } else {
                alert('Thank you for scheduling your consultation! We will contact you soon.');
                consultationForm.reset();
                e.preventDefault(); // Prevent actual form submission for this demo
            }
        });
    }


    // --- Scroll To Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) { // Show button after scrolling 200px
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Hero Scroll Indicator Animation ---
    if (scrollIndicator) {
        const mouseIcon = scrollIndicator.querySelector('.mouse-icon');
        if (mouseIcon) {
            let translateY = 0;
            let direction = 1;
            const animationSpeed = 10; // milliseconds per step

            function animateScrollIndicator() {
                translateY += direction * 2; // Move by 2px
                if (translateY > 12 || translateY < -12) { // Limit movement
                    direction *= -1; // Reverse direction
                }
                mouseIcon.style.transform = `translateX(-50%) translateY(${translateY}px)`;
                requestAnimationFrame(animateScrollIndicator);
            }
            // Only start if the indicator is visible
            if (window.getComputedStyle(scrollIndicator).display !== 'none') {
                 animateScrollIndicator();
            }
        }
    }

    // --- Add basic hover effects for animated cards/items if needed ---
    // Example for portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
    });

    // --- Animated Buttons - slight scale and lift ---
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
            button.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
    });

});
