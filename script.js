// 28 Reasons to Apologize
const reasons = [
    "I'm sorry for making you feel insecure, even in your dream.",
    "I'm sorry for not being there to reassure you immediately.",
    "I'm sorry for any pain my actions (even in dreams) caused you.",
    "I'm sorry for not understanding how deeply this affected you.",
    "I'm sorry for making you question our beautiful relationship.",
    "I'm sorry for the tears you shed because of this.",
    "I'm sorry for not protecting your heart from such pain.",
    "I'm sorry for any doubt I may have planted in your mind.",
    "I'm sorry for not being more sensitive to your feelings.",
    "I'm sorry for the sleepless nights this may have caused you.",
    "I'm sorry for making you feel like you're not enough (you are everything!).",
    "I'm sorry for not immediately comforting you when you were hurt.",
    "I'm sorry for any trust issues this may have triggered.",
    "I'm sorry for not realizing how much this would hurt you.",
    "I'm sorry for the anxiety you may have felt.",
    "I'm sorry for not being perfect for you.",
    "I'm sorry for any moment of happiness I took away from you.",
    "I'm sorry for making you feel unloved, even for a second.",
    "I'm sorry for not cherishing you the way you deserve.",
    "I'm sorry for the emotional pain you experienced.",
    "I'm sorry for not being more understanding of your feelings.",
    "I'm sorry for any distance this created between us.",
    "I'm sorry for not showing you enough how special you are.",
    "I'm sorry for the worry and stress I caused you.",
    "I'm sorry for not being the partner you deserve in that moment.",
    "I'm sorry for hurting the most amazing person I know.",
    "I'm sorry for taking your love for granted.",
    "I'm sorry, Babe. From the bottom of my heart, I LOVE YOU and only YOU."
];

// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💖', '💗', '💓', '💞', '💘', '❤️', '🩷'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 800);
}

// Load reasons into the grid
function loadReasons(showAll = false) {
    const grid = document.getElementById('reasonsGrid');
    const reasonsToShow = showAll ? reasons.length : 6;
    
    grid.innerHTML = '';
    
    for (let i = 0; i < reasonsToShow; i++) {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.innerHTML = `
            <div class="reason-number">${i + 1}</div>
            <p class="reason-text">${reasons[i]}</p>
        `;
        grid.appendChild(card);
        
        // Add animation delay
        setTimeout(() => {
            card.classList.add('visible');
        }, i * 100);
    }
}

// Toggle all reasons
let showingAll = false;
function toggleAllReasons() {
    showingAll = !showingAll;
    loadReasons(showingAll);
    
    const btn = document.querySelector('.load-more-btn');
    btn.textContent = showingAll ? 'Show Less 💕' : 'Show All Reasons 💝';
}

// Show forgiveness modal
function showForgivenessModal() {
    const modal = document.getElementById('forgivenessModal');
    modal.classList.add('show');
    createCelebrationHearts();
}

// Close forgiveness modal
function closeForgivenessModal() {
    const modal = document.getElementById('forgivenessModal');
    modal.classList.remove('show');
}

// Create celebration hearts in modal
function createCelebrationHearts() {
    const container = document.querySelector('.celebration-hearts');
    const hearts = ['💖', '💕', '💗', '💓', '💞', '💘'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.position = 'absolute';
            heart.style.animationDuration = (Math.random() * 2 + 1) + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

// Mobile navigation toggle
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll for navigation
function setupSmoothScroll() {
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe reason cards as they're added dynamically
    const observeCards = () => {
        const cards = document.querySelectorAll('.reason-card');
        cards.forEach(card => observer.observe(card));
    };
    
    // Initial observation
    setTimeout(observeCards, 100);
    
    // Re-observe when reasons are toggled
    const originalToggle = toggleAllReasons;
    toggleAllReasons = function() {
        originalToggle();
        setTimeout(observeCards, 100);
    };
}

// Photo upload functionality (optional enhancement)
function setupPhotoUpload() {
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder, .gallery-placeholder');
    
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            alert('To add your photo:\n1. Save your image in the same folder\n2. Replace this placeholder with an <img> tag\n3. Example: <img src="your-photo.jpg" alt="Babe">');
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    loadReasons(false);
    toggleMobileNav();
    setupSmoothScroll();
    updateActiveNavLink();
    setupScrollAnimations();
    setupPhotoUpload();
    
    // Add a welcome message in console
    console.log('%c Made with ❤️ by Leizer for his Babe Glo ', 'background: #ff6b9d; color: white; font-size: 16px; padding: 10px;');
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add typing effect to main title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Love calculator game (fun addition)
function loveCalculator() {
    const names = 'Leizer' + 'Glo';
    let sum = 0;
    
    for (let i = 0; i < names.length; i++) {
        sum += names.charCodeAt(i);
    }
    
    const lovePercentage = (sum % 100) + 1;
    return lovePercentage > 90 ? 100 : lovePercentage;
}

// Add interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add click effect to hearts
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('floating-heart')) {
            e.target.style.transform = 'scale(1.5)';
            e.target.style.opacity = '0';
            setTimeout(() => e.target.remove(), 300);
        }
    });
});
