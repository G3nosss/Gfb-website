// Setup Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);
const sun = new THREE.DirectionalLight(0xffd700, 2);
sun.position.set(5, 10, 7);
scene.add(sun);

// Load the Bird (Make sure phoenix_bird.glb is in your main folder)
let phoenix, mixer;
const loader = new THREE.GLTFLoader();
loader.load('assets/phoenix_bird.glb', (gltf) => {
    phoenix = gltf.scene;
    phoenix.scale.set(10, 10, 10);
    phoenix.position.set(0, 0, -5); // Positioned behind logo
    scene.add(phoenix);

    mixer = new THREE.AnimationMixer(phoenix);
    mixer.clipAction(gltf.animations[0]).play();

    setupScroll();
});

// The Story Flight
function setupScroll() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-spacer",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        }
    });

    // 1. Bird flies out from behind logo toward you
    tl.to(phoenix.position, { z: 4, y: 1, duration: 2 })
    
    // 2. Bird moves down and right (as if flying past)
    .to(phoenix.position, { x: 4, y: -1, duration: 2 })
    
    // 3. Bird flies to the left and fades away
    .to(phoenix.position, { x: -10, y: -2, duration: 3 })
    .to("#canvas-container", { opacity: 0, duration: 1 });
}

// Animation Loop
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}
animate();
