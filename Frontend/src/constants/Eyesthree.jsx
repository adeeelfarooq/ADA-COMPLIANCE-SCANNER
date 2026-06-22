import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Eyesthree = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();

       
        const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000);
        camera.position.z = 5;

        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(100, 100);
        renderer.setPixelRatio(window.devicePixelRatio);

        
        const eyeballGeo = new THREE.SphereGeometry(1.5, 64, 64);
        const eyeballMat = new THREE.MeshPhongMaterial({
            color: "yellow",
            shininess: 120,
        });
        const eyeball = new THREE.Mesh(eyeballGeo, eyeballMat);
        scene.add(eyeball);

       
        const irisGeo = new THREE.CircleGeometry(0.6, 64);
        const irisMat = new THREE.MeshBasicMaterial({ color: 0xffa500 });
        const iris = new THREE.Mesh(irisGeo, irisMat);
        iris.position.z = 1.51;
        scene.add(iris);

        
        const pupilGeo = new THREE.CircleGeometry(0.25, 64);
        const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const pupil = new THREE.Mesh(pupilGeo, pupilMat);
        pupil.position.z = 1.52;
        scene.add(pupil);

        
        const highlightGeo = new THREE.SphereGeometry(0.08, 32, 32);
        const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const highlight = new THREE.Mesh(highlightGeo, highlightMat);
        pupil.add(highlight);
        highlight.position.set(0.1, 0.1, 0.01);

        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x505050));

        
        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);

        
        const blink = () => {
            let progress = 0;
            let closing = true;

            const blinkAnim = () => {
                if (closing) {
                    progress += 0.2;
                    if (progress >= 1) {
                        progress = 1;
                        closing = false;
                    }
                } else {
                    progress -= 0.2;
                    if (progress <= 0) {
                        progress = 0;
                        return; 
                    }
                }

                iris.scale.y = 1 - progress;   
                pupil.scale.y = 1 - progress;  
                requestAnimationFrame(blinkAnim);
            };

            blinkAnim();
        };

        
        const blinkInterval = setInterval(blink, 2000);

        
        const animate = () => {
            requestAnimationFrame(animate);

            iris.position.x = mouseX * 0.5;
            iris.position.y = mouseY * 0.5;
            pupil.position.x = mouseX * 0.5;
            pupil.position.y = mouseY * 0.5;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(blinkInterval);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                backgroundColor: "#e7ecf2",
                width: "100px",
                height: "100px",
                position: "absolute",
                pointerEvents: "none",
            }}
        />
    );
};

export default Eyesthree;
