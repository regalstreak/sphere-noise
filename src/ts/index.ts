import * as THREE from 'three';
import vertexShader from '../shaders/noise.vert';
import fragmentShader from '../shaders/noise.frag';

const start = Date.now(), fov = 30;

let renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    mesh: THREE.Mesh,
    material: THREE.ShaderMaterial;

function initialize() {

    // Prepare Scene
    const container = document.getElementById('container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;

    material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            time: {
                type: 'f',
                value: 0.0
            }
        }
        // wireframe: true
    })

    mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(20, 4), material);
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
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;
    material.uniforms['time'].value = .00025 * (Date.now() - start);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.addEventListener('load', initialize)
