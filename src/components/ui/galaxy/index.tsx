"use client"

import React, {useEffect, useRef} from "react";
import {useWindowSize} from "@/hooks/useWindowSize";
import {createCamera, createControl, createRender, createScene} from "@/lib/three-utils";

const GalaxyViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null); // Reference to the container div
  const [width, height] = useWindowSize();


  useEffect(() => {
        if (!mountRef.current || width === 0 || height === 0) return;

        const scene = createScene();
        const camera = createCamera({width, height});
        const renderer = createRender({width, height});

        mountRef.current.innerHTML = '';
        mountRef.current.appendChild(renderer.domElement);
        const controls = createControl({camera, renderer});

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
        };

      },
      [height, width]);
  return (
      <div ref={mountRef} className="h-screen bg-gray-400">
      </div>
  )
}

export default GalaxyViewer;