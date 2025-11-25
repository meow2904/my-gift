'use client'

import React, {useEffect, useRef} from "react";
import {useWindowSize} from "@/hooks/useWindowSize";
import {createCamera, createControl, createRender, createScene} from "@/lib/three-utils";
import {GLTFLoader} from "three-stdlib";
import * as THREE from 'three';

export default function Christmas() {
    const mountRef = useRef<HTMLDivElement>(null)
    const [width, height] = useWindowSize();


    useEffect(() => {
        if (!mountRef.current || width === 0 || height === 0) return;
        const scene = createScene();
        const camera = createCamera({width, height});
        const renderer = createRender({width, height});
        // ✅ THÊM ÁNH SÁNG - QUAN TRỌNG!
        // Ánh sáng môi trường - chiếu sáng đều khắp scene
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        // Ánh sáng directional chính - giống ánh sáng mặt trời
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Thêm ánh sáng phụ từ góc khác để không bị tối
        const fillLight = new THREE.DirectionalLight(0x4080ff, 0.8);
        fillLight.position.set(-5, 5, -5);
        scene.add(fillLight);

        // Ánh sáng từ phía sau
        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(0, 5, -10);
        scene.add(backLight);

        mountRef.current.innerHTML = '';
        mountRef.current.appendChild(renderer.domElement);
        const controls = createControl({camera, renderer});

        const loader = new GLTFLoader();
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        renderer.domElement.addEventListener("click", onClick);
        function onClick(event: any) {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                handleObjectClick(intersects[0].object);
            }
        }
        function handleObjectClick(obj: any) {
            if (!obj.name.startsWith("Object_")) return;

            // Lấy số phía sau Object_
            const number = parseInt(obj.name.replace("Object_", ""), 10);

            if (number === 17) {
                console.log("Clicked:", obj.name);
                console.log("  Clicked  Geometry:", obj.geometry);
                console.log("  Clicked  Material:", obj.material);
                // showMessage(`Bạn đã click vào ${obj.name}`);

                //clone and update color
                obj.material = obj.material.clone();
                obj.material.color.setHex(0xfff957);
                obj.material.needsUpdate = true;
            }
        }
        function applyRandomGiftColors(obj: any) {
            if (!obj.isMesh) return;

            if (obj.material.name !== 'gifts') return;

            // const targetIds = [17, 18, 20, 23, 26, 29, 32, 35, 38];
            // // Nếu thuộc danh sách Gift
            // const match = obj.name.match(/Object_(\d+)/);
            // if (!match) return;
            //
            // const id = parseInt(match[1], 10);
            // if (!targetIds.includes(id)) return;

            // Clone material để không ảnh hưởng object khác
            obj.material = obj.material.clone();

            // Random màu HEX
            const giftColors = [0xff0000, 0x00d9ff, 0xffd700, 0x8b00ff, 0x00ff80];
            const randomColor = giftColors[Math.floor(Math.random() * giftColors.length)];
            // const randomColor = Math.floor(Math.random() * 0xffffff);

            obj.material.color.setHex(randomColor);
            obj.material.metalness = 0.4;
            obj.material.roughness = 0.3;
            obj.material.needsUpdate = true;
        }

        const MATERIAL_COLORS: Record<string, number> = {
            ground: 0x32ecb5,
            plastic_green: 0x35f142,
            plastic_red: 0xf34429,
            plastic_orange_yellow: 0xf7ed1b,
            plastic_blue: 0x13ecf5,
            plastic_orange: 0xf59e13,
            plastic_black: 0x2e2c27,
        };

        function applyCustomMaterial(obj: any, hex: number) {
            obj.material = obj.material.clone();
            obj.material.color.setHex(hex);
            obj.material.metalness = 0.3;
            obj.material.roughness = 0.4;
            obj.material.needsUpdate = true;
        }


        function showMessage(text: any) {
            alert(text);
        }

        // loader.load('./modals/tree2/xmas_tree.glb', (gltf: any) => {
        //     const tree = gltf.scene;
        //     tree.traverse((obj: any) => {
        //         // console.log("Tên:", obj.name);
        //         // console.log("Loại:", obj.type);
        //         //
        //         // if (obj.isMesh) {
        //         //     console.log("→ Mesh:", obj.name);
        //         //     console.log("    Geometry:", obj.geometry);
        //         //     console.log("    Material:", obj.material);
        //         // }
        //
        //         //Đổi màu ngôi sao
        //         if (obj.isMesh && obj.name === "Object_15") {
        //             obj.material = obj.material.clone();
        //             obj.material.color.setHex(0xf7ef05);
        //             obj.material.metalness = 0.3;
        //             obj.material.roughness = 0.4;
        //             obj.material.needsUpdate = true;
        //         }
        //
        //         //Đổi màu quả bóng
        //         if (obj.isMesh && obj.name === "Object_9") {
        //             obj.material = obj.material.clone();
        //             obj.material.color.setHex(0xffffff);
        //             obj.material.metalness = 0.3;
        //             obj.material.roughness = 0.4;
        //             obj.material.needsUpdate = true;
        //         }
        //
        //         //Dổi màu ngẫu nhiên hộp quà
        //         applyRandomGiftColors(obj)
        //     });
        //
        //     scene.add(tree);
        //     tree.position.set(0, 0, 0);
        //     tree.scale.set(10, 10, 10);
        // });

        const trackPoints: THREE.Vector3[] = [];

        loader.load('./modals/tree2/playmobil_train_set.glb', (gltf: any) => {
            const train = gltf.scene;
            train.traverse((obj: any) => {
                // console.log("Tên:", obj.name);
                // console.log("Loại:", obj.type);

                if (obj.name.startsWith('track') &&  obj.isObject3D) {
                    console.log("→ Tên:", obj.name);
                    console.log("→ position:", obj.position);

                    trackPoints.push(new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z));
                    // if (obj.name === 'track_wide_turn_10') {
                    //     // obj.scale.set(0, 0, 0);
                    //
                    //
                    //     child.material = child.material.clone();
                    //     child.material.color.setHex(0xf59e13);
                    //     child.material.metalness = 0.3;
                    //     child.material.roughness = 0.4;
                    //     child.material.needsUpdate = true;
                    // }
                }

                // if (obj.name.startsWith('train') &&  obj.isObject3D) {
                //     console.log("→ Tên:", obj.name);
                //     console.log("→ Loại:", obj.type);
                //     console.log("    Geometry:", obj.geometry);
                //     console.log("    Material:", obj.material);
                // }


                if (!obj.isMesh || !obj.material || !obj.material.name) return;
                if ( obj.material.name === 'ground' ) {
                    obj.scale.set(0, 0, 0);
                }

                if ( obj.material.name === 'plastic_green' ) {
                    obj.scale.set(0.8, 1, 0.6);
                    obj.position.set(-2.5, 0, 4.2);
                }

                const hex = MATERIAL_COLORS[obj.material.name];
                if (hex !== undefined) {
                    applyCustomMaterial(obj, hex);
                }
            })

            scene.add(train);
            train.position.set(11, 5.1, -11);
            train.scale.set(3, 3, 3);

            const geometry = new THREE.BufferGeometry().setFromPoints(trackPoints);
            const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // đỏ
            const line = new THREE.Line(geometry, material); // không loop
            line.position.set(0, 10, 0);
            scene.add(line);



            // const geometry = new THREE.BufferGeometry().setFromPoints(trackPoints);
            // const material = new THREE.LineBasicMaterial({ color: 0x00ffff });
            // const loop = new THREE.LineLoop(geometry, material); // hoặc Line nếu không muốn loop
            //
            // loop.position.set(0, 10, 0);
            // scene.add(loop);
        });
        const animate = () => {
            requestAnimationFrame(animate);

            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            controls.dispose();
        }

    }, [width, height]);


    return (
        <div ref={mountRef} className="h-screen bg-gray-400">
        </div>
    )

}

