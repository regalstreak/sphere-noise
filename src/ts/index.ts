import * as THREE from 'three';
import vertexShader from '../shaders/noise.vert';
import fragmentShader from '../shaders/noise.frag';

let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera;

function initialize() {
    const start = Date.now(), fov = 30;

    // Prepare Scene
    const container = document.getElementById('container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader
    })

    const mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(20, 4), material);
    scene.add(mesh);

    // Prepare Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    render();
}

function render() {
    // Render loop
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.addEventListener('load', initialize)
