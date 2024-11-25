// contact.js

// Animation de l'apparition du contenu
function animateContentAppearance() {
    const contactSection = document.querySelector('.contact-section');
    const title = contactSection.querySelector('h2');
    const description = contactSection.querySelector('p');
    const formElements = contactSection.querySelectorAll('form > *');
    const backButton = contactSection.querySelector('.back-button');

    // Créer une timeline GSAP pour séquencer les animations
    const tl = gsap.timeline();

    // Animation du titre
    tl.fromTo(title, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    // Animation de la description
    .fromTo(description, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"  // Commence légèrement avant la fin de l'animation précédente
    )
    // Animation des éléments du formulaire
    .fromTo(formElements, 
        { opacity: 0, y: 50 }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.2,  // Décalage entre chaque élément
            ease: "power2.out" 
        },
        "-=0.3"
    )
    // Animation du bouton de retour
    .fromTo(backButton, 
        { opacity: 0, scale: 0.5 }, 
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
}

// Animation de particules en arrière-plan
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = `rgba(0, 255, 255, ${Math.random() * 0.5})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebondir aux bords
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Initialiser les particules
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Boucle d'animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Redimensionnement du canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();
}

// Lancement des animations au chargement
window.addEventListener('load', () => {
    animateContentAppearance();
    createParticleBackground();
});