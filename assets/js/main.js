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

    // Mobile menu toggle - completely rewritten for reliability
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        // Force-remove active class on load
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        
        // Toggle menu visibility
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            console.log('Mobile menu toggled - active:', mobileMenu.classList.contains('active'));
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                console.log('Mobile menu closed via link click');
            });
        });
    } else {
        console.error('Mobile menu elements not found:', !!menuToggle, !!mobileMenu);
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

    // Skill bar animation - modified to run only once
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Keep track of which skill bars have already been animated
    const animatedSkills = new Set();

    function animateSkillBarsOnce() {
        skillBars.forEach(bar => {
            // Skip bars that have already been animated
            if (animatedSkills.has(bar)) {
                return;
            }
            
            const rect = bar.getBoundingClientRect();
            
            // Check if skill bar is in the viewport
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                const level = bar.getAttribute('data-level') || bar.style.width;
                
                // Set initial width to 0
                bar.style.width = '0%';
                
                // Animate to full width
                setTimeout(() => {
                    bar.style.width = level;
                }, 100);
                
                // Add to set of animated bars so we don't animate again
                animatedSkills.add(bar);
            }
        });
        
        // If all skill bars have been animated, remove the scroll listener
        if (animatedSkills.size === skillBars.length) {
            window.removeEventListener('scroll', throttledAnimation);
        }
    }
    
    // Throttle the scroll event
    let scrollTimeout;
    function throttledAnimation() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateSkillBarsOnce();
                scrollTimeout = null;
            }, 100);
        }
    }
    
    // Run once on page load
    animateSkillBarsOnce();
    
    // Run on scroll until all bars have been animated
    window.addEventListener('scroll', throttledAnimation);
});
