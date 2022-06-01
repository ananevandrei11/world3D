import * as THREE from './three.module.js';
import { OrbitControls } from "./OrbitControls.module.js";

export default class {
	constructor() {
		this.create();
	}

	create() {

		var renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		renderer.setPixelRatio(0.75);
		var modal = document.querySelector('#modal-3D');
		modal.appendChild(renderer.domElement);
		renderer.setSize(modal.offsetWidth, modal.offsetHeight);

		var scene = new THREE.Scene();

		var camera = new THREE.PerspectiveCamera(
			35,
			modal.offsetWidth / modal.offsetHeight,
			1,
			500
		);
		camera.position.y = 0;
		camera.position.z = 5;
		scene.add(camera);

		var light1 = new THREE.DirectionalLight(0xffffff, .75);
		light1.position.set(0.5, 1.0, 0.5).normalize();
		scene.add(light1);
		/* ВСЕОБЪЕМЛЮЩИЙ СВЕТ
		var light2 = new THREE.AmbientLight(0xffffff);
		scene.add(light2);
		*/

		var object = new THREE.Mesh(
			new THREE.SphereGeometry(1, 32, 32),
			new THREE.MeshStandardMaterial()
		);
		object.position.set(0,0,0);
		let texture = new THREE.TextureLoader().load(
			`script/earth.jpg`
		);
		object.material.map = texture;
		scene.add(object);

		var controls = new OrbitControls(camera, renderer.domElement);
		controls.addEventListener('change', render);
		controls.minPolarAngle = Math.PI / 3.5;
		controls.maxPolarAngle = Math.PI / 1.5;
		controls.minDistance = 5;
		controls.maxDistance = 9;
		controls.update();

		function animate() {
			requestAnimationFrame(animate);
			render()
		}
		animate();

		function onWindowResize() {
			camera.aspect = modal.offsetWidth / modal.offsetHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(modal.offsetWidth, modal.offsetHeight);
			render();
		}
		window.addEventListener('resize', onWindowResize);
		function render() {
			renderer.render(scene, camera);
			light1.position.set(
				camera.position.x,
				camera.position.y,
				camera.position.z,

			).normalize();
		}
	}
}

