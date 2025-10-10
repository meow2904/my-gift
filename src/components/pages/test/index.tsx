// ParticleBackground.tsx
'use client';  // nếu bạn dùng Next.js App Router và component phía client

import {useCallback, useEffect, useState} from 'react';
import Particles, {initParticlesEngine} from '@tsparticles/react';
import {loadSlim} from "@tsparticles/slim";
import {loadFull} from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import {ISourceOptions} from "@tsparticles/engine";
import {loadImageShape} from "@tsparticles/shape-image";

export default function ParticleBackground() {
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine: any) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            await loadFull(engine);
            //await loadSlim(engine);
            //await loadBasic(engine);
            await loadImageShape(engine);

        }).then(() => {
            setInit(true);
        });
    }, []);

    // const particlesLoaded = useCallback(async (container?: any) => {
    //     console.log(container);
    // }, []);

    const options: ISourceOptions = {
        fullScreen: {
            enable: true,
            zIndex: 0,  // z-index canvas
        },
        particles: {
            number: {
                value: 150,
                density: {
                    enable: true,
                },
            },
            color: {
                value: "#0d47a1",
            },
            fpsLimit: 120,
            shape: {
                type: "image",
                options: {
                    image: [
                        {
                            // src: "/particle/asian-flower-1.png",
                            src: "/particle/asian-flower-1.png",
                            width: 100,
                            height: 100,
                            // replaceColor: true, // Thay thế màu nền
                            // fill: true, // Không vẽ outline
                        },
                        {
                            src: "/particle/asian-flower.png",
                            width: 100,
                            height: 100,
                            // replaceColor: true, // Thay thế màu nền
                            // fill: true, // Không vẽ outline
                        },
                        // {
                        //     src: "/particle/snowflake.png",
                        //     width: 100,
                        //     height: 100,
                        //     // replaceColor: true, // Thay thế màu nền
                        //     // fill: true, // Không vẽ outline
                        // },
                    ],
                },
            },
            stroke: {
                width: 0, // Loại bỏ viền
            },
            opacity: {
                value: 0.8,
            },
            size: {
                value: {
                    min: 3,
                    max: 15
                },
            },
            rotate: {
                value: {
                    min: 0,
                    max: 360, // Góc xoay ngẫu nhiên từ 0-360 độ
                },
                animation: {
                    enable: true,
                    speed: 5, // Tốc độ xoay (càng cao càng nhanh)
                    sync: false, // Mỗi particle xoay độc lập
                },
                direction: "random", // Hướng xoay ngẫu nhiên (clockwise hoặc counter-clockwise)
            },
            move: {
                enable: true,
                speed: 2,
                direction: "bottom",
                random: false,
                outModes: {
                    default: "out",
                },
                straight: false,
            },
            // links: { //liên kết giữa các ảnh
            //     enable: true,
            //     distance: 150,
            //     color: "#ffffff",
            //     opacity: 0.4,
            //     width: 1,
            // },
        },
        interactivity: {
            // events: {
            //     onHover: {
            //         enable: true,
            //         mode: "grab",
            //     },
            //     onClick: {
            //         enable: true,
            //         mode: "push",
            //     },
            // },
            events: {
                // onHover: {
                //     enable: true,
                //     mode: "repulse",
                // },
                onClick: {
                    enable: true,
                    mode: "push",
                },
            },
            modes: {
                grab: {
                    distance: 200,
                    links: {
                        opacity: 1,
                    },
                },
                push: {
                    quantity: 4,
                },
            },
        },
        detectRetina: true,
    };

    if (!init) console.log("Particle aaaaa");
    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            // particlesLoaded={particlesLoaded}
        />
    );
}
