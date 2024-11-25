// Three.js Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('heroCanvas'), 
    alpha: true,
    antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

// Shader material for gradient color
const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
        // Create a dynamic gradient based on time and position
        vec3 color1 = vec3(0.0, 1.0, 1.0); // Cyan
        vec3 color2 = vec3(1.0, 0.0, 1.0); // Magenta
        
        // Mix colors based on position and time
        float mixFactor = (sin(time * 0.5 + vPosition.x * 0.1) + 1.0) * 0.5;
        vec3 dynamicColor = mix(color1, color2, mixFactor);
        
        // Add some depth and variation
        float opacity = 0.6 + sin(time * 0.3) * 0.2;
        
        gl_FragColor = vec4(dynamicColor, opacity);
    }
`;

const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    wireframe: true
});

const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 30;

// Animation timing variables
let time = 0;
const rotationSpeed = 0.002;
const oscillationSpeed = 0.001;
const oscillationAmplitude = 0.5;

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Update time uniform for shader
    material.uniforms.time.value = time;

    // Smooth rotation
    torusKnot.rotation.x += rotationSpeed;
    torusKnot.rotation.y += rotationSpeed;

    // Add gentle oscillation
    torusKnot.position.y = Math.sin(time) * oscillationAmplitude;
    torusKnot.position.x = Math.cos(time) * oscillationAmplitude;

    // Gentle scale pulsing
    const scale = 1 + Math.sin(time * 0.5) * 0.05;
    torusKnot.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
}
animate();

// Responsive canvas
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
// Smooth scroll to prices section
document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    
    const pricesSection = document.getElementById('prices');
    
    // Animation de défilement fluide
    pricesSection.scrollIntoView({
        behavior: 'smooth'
    });
});
// Smooth scroll to prices section for both CTA and Nav link
function smoothScrollToPrices(e) {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    
    const pricesSection = document.getElementById('prices');
    
    // Animation de défilement fluide
    pricesSection.scrollIntoView({
        behavior: 'smooth'
    });
}

// Ajout de l'écouteur d'événement pour le bouton CTA
document.querySelector('.cta-button').addEventListener('click', smoothScrollToPrices);

// Ajout de l'écouteur d'événement pour le lien "PRIX" dans la navigation
document.querySelector('nav .nav-links a[href="#prices"]').addEventListener('click', smoothScrollToPrices);
