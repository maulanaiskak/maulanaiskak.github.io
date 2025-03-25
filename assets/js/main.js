document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Typing effect for hero section
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const strings = JSON.parse(typedElement.getAttribute('data-strings'));
        let currentStringIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentString = strings[currentStringIndex];

            if (isDeleting) {
                typedElement.textContent = currentString.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typedElement.textContent = currentString.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && currentCharIndex === currentString.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at the end
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentStringIndex = (currentStringIndex + 1) % strings.length;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }

    // Project card interactions
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Skill bar animation on scroll
    const skillBars = document.querySelectorAll('.skill-level');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                const level = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = level;
                }, 100);
            }
        });
    }

    // Run once on page load
    animateSkillBars();

    // Re-run on scroll (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateSkillBars();
                scrollTimeout = null;
            }, 100);
        }
    });
});
