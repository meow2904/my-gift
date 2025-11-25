'use client'
import * as THREE from 'three'
import {useEffect, useRef} from 'react'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {MarchingCubes} from "three/examples/jsm/objects/MarchingCubes.js";

function heartEquation(x: number, y: number, z: number): number {
    return Math.pow(x * x + (9 / 4) * y * y + z * z - 1, 3)
        - x * x * Math.pow(z, 3)
        - (9 / 80) * y * y * Math.pow(z, 3);
}

function generateField(resolution: number, range = 2): Float32Array {
    const field = new Float32Array(resolution ** 3);
    let ptr = 0;

    for (let k = 0; k < resolution; k++) {
        const z = (k / resolution) * 2 * range - range;
        for (let j = 0; j < resolution; j++) {
            const y = (j / resolution) * 2 * range - range;
            for (let i = 0; i < resolution; i++) {
                const x = (i / resolution) * 2 * range - range;
                field[ptr++] = heartEquation(x, y, z);
            }
        }
    }

    return field;
}
export function createHeartMarchingCubes(resolution = 50): THREE.Object3D {
    const material = new THREE.MeshStandardMaterial({
        color: 0xff3366,
        metalness: 0.2,
        roughness: 0.3,
        side: THREE.DoubleSide,
    });

    // Tạo marching cubes object
    const mc = new MarchingCubes(resolution, material);
    mc.isolation = 0;

    // Gán dữ liệu field cho marching cubes
    const field = generateField(resolution);
    for (let i = 0; i < field.length; i++) {
        mc.field[i] = field[i];
    }

    mc.isolation = 0;
    mc.enableUvs = false;
    mc.enableColors = false;
    mc.update();

    // Scale cho vừa
    mc.scale.set(1.5, 1.5, 1.5);
    return mc;
}


export default function Heart3D() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mountRef.current) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 4);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05

        // Ánh sáng
        // === Ánh sáng môi trường (chiếu đều khắp không gian) ===
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // 0.6 là độ mạnh
        scene.add(ambientLight);

        // === Ánh sáng chính (DirectionalLight) ===
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(3, 3, 3);
        scene.add(dirLight);

        // === Thêm 1-2 nguồn phụ nhẹ để phản sáng ===
        const fillLight = new THREE.DirectionalLight(0xffcccc, 0.4);
        fillLight.position.set(-3, 2, -2);
        scene.add(fillLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
        backLight.position.set(0, -3, -3);
        scene.add(backLight);


        // const heart = createHeartMarchingCubes(60);
        // scene.add(heart);

        const sphereGeometry =new THREE.SphereGeometry(5, 32, 32);
        const sphereMaterial =  new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
        })
        const sphere =  new THREE.Points(sphereGeometry, sphereMaterial);
        scene.add(sphere);



        function animate() {
            controls.update()
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        // === HANDLE RESIZE ===
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            mountRef.current && mountRef.current.removeChild(renderer.domElement)
        }
    }, [])

    return <div ref={mountRef} style={{width: '100vw', height: '100vh'}}/>
}
