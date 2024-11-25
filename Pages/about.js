// about.js 

// Initialisation de la scène, de la caméra et du rendu 
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('aboutCanvas'), 
    alpha: true, 
    antialias: true 
}); 
renderer.setSize(window.innerWidth, window.innerHeight); 

// Création d'une géométrie et d'un matériau 
const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16); 
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ffff, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.05 
}); 
const torusKnot = new THREE.Mesh(geometry, material); 
scene.add(torusKnot); 

// Positionnement de la caméra 
camera.position.z = 5; 

// Animation du torus knot
function animateTorusKnot() { 
    requestAnimationFrame(animateTorusKnot); 
    torusKnot.rotation.x += 0.003; 
    torusKnot.rotation.y += 0.003; 
    renderer.render(scene, camera); 
} 

// Animation de l'apparition du contenu
function animateContentAppearance() {
    const container = document.querySelector('.container');
    const paragraphs = container.querySelectorAll('p');
    const title = container.querySelector('h1');
    const backButton = container.querySelector('.cta-button');

    // Animation du titre
    gsap.fromTo(title, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Animation des paragraphes
    gsap.fromTo(paragraphs, 
        { opacity: 0, y: 50 }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: "power2.out" 
        }
    );

    // Animation du bouton
    gsap.fromTo(backButton, 
        { opacity: 0, scale: 0.5 }, 
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
    );
}

// Ajout de GSAP pour les animations (à ajouter dans le head de about.html)
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>

// Lancement des animations au chargement
window.addEventListener('load', () => {
    animateTorusKnot();
    animateContentAppearance();
});

// Gestion de la taille du canvas lors du redimensionnement de la fenêtre 
window.addEventListener('resize', () => { 
    const width = window.innerWidth; 
    const height = window.innerHeight; 
    renderer.setSize(width, height); 
    camera.aspect = width / height; 
    camera.updateProjectionMatrix(); 
}); 