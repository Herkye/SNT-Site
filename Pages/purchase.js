// purchase.js

// Animation de l'apparition du contenu
function animateContentAppearance() {
    const container = document.querySelector('.container');
    const title = container.querySelector('h1');
    const productCards = container.querySelectorAll('.product-card');
    const form = container.querySelector('form');
    const backLink = container.querySelector('.back-link');

    // Créer une timeline GSAP pour séquencer les animations
    const tl = gsap.timeline();

    // Animation du titre
    tl.fromTo(title, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    // Animation des cartes de produits
    .fromTo(productCards, 
        { opacity: 0, scale: 0.8 }, 
        { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.2,
            ease: "back.out(1.7)" 
        },
        "-=0.4"
    )
    // Animation du formulaire
    .fromTo(form.children, 
        { opacity: 0, y: 50 }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.2,
            ease: "power2.out" 
        },
        "-=0.3"
    )
    // Animation du lien de retour
    .fromTo(backLink, 
        { opacity: 0, scale: 0.5 }, 
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
}

// Interaction améliorée pour la sélection de produit
function enhanceProductSelection() {
    const productCards = document.querySelectorAll('.product-card');
    const selectedProductInput = document.getElementById('selectedProduct');

    productCards.forEach(card => {
        // Animation au survol
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                duration: 0.3,
                ease: "power1.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: 'none',
                duration: 0.3,
                ease: "power1.out"
            });
        });

        // Sélection de produit avec animation
        card.addEventListener('click', () => {
            // Réinitialiser tous les produits
            productCards.forEach(c => {
                gsap.to(c, {
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    duration: 0.3
                });
            });

            // Animer le produit sélectionné
            gsap.to(card, {
                borderColor: '#00ffff',
                backgroundColor: 'rgba(0, 255, 255, 0.2)',
                duration: 0.3
            });

            // Mise à jour du produit sélectionné
            selectedProductInput.value = card.querySelector('h3').textContent;
        });
    });
}

// Animation de particules de fond
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.color = `rgba(0, 255, 255, ${Math.random() * 0.4})`;
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

// Validation de formulaire améliorée
function enhanceFormValidation() {
    const form = document.getElementById('purchaseForm');
    const submitButton = form.querySelector('.submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Vérifier tous les champs
        const inputs = form.querySelectorAll('input, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                
                // Animation d'erreur
                gsap.to(input, {
                    borderColor: '#ff00ff',
                    backgroundColor: 'rgba(255, 0, 255, 0.1)',
                    duration: 0.3,
                    repeat: 2,
                    yoyo: true
                });
            }
        });

        if (isValid) {
            // Animation de confirmation
            gsap.to(submitButton, {
                scale: 1.1,
                backgroundColor: '#00ffff',
                color: '#000',
                duration: 0.3,
                onComplete: () => {
                    alert('Commande confirmée ! Merci pour votre achat.');
                    form.reset();
                }
            });
        }
    });
}

// Lancement des animations au chargement
window.addEventListener('load', () => {
    animateContentAppearance();
    enhanceProductSelection();
    createParticleBackground();
    enhanceFormValidation();
});