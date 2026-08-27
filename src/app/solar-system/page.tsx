'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SolarSystemPage() {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        animationId: number;
    } | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // マウント状態を確認
    useLayoutEffect(() => {
        setIsMounted(true);
    }, []);

    // Three.jsの初期化とアニメーション
    useLayoutEffect(() => {
        if (!mountRef.current || !isMounted) return;

        // シーン、カメラ、レンダラーの初期化
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // カメラの位置を設定
        camera.position.set(0, 10, 30);
        camera.lookAt(0, 0, 0);

        // 環境光を追加
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // 指向性ライトを追加（太陽の光を表現）
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 0, 0);
        scene.add(directionalLight);

        // 太陽を作成
        const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xffd700,
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // 地球の軌道を作成
        const earthOrbit = new THREE.Group();
        scene.add(earthOrbit);

        // 地球を作成
        const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
        const earthMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a90e2,
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.position.set(8, 0, 0);
        earthOrbit.add(earth);

        // 月の軌道を作成（地球の周り）
        const moonOrbit = new THREE.Group();
        earth.add(moonOrbit);

        // 月を作成
        const moonGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const moonMaterial = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
        });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(2, 0, 0);
        moonOrbit.add(moon);

        // 火星の軌道を作成
        const marsOrbit = new THREE.Group();
        scene.add(marsOrbit);

        // 火星を作成
        const marsGeometry = new THREE.SphereGeometry(0.6, 32, 32);
        const marsMaterial = new THREE.MeshStandardMaterial({
            color: 0xff6b47,
        });
        const mars = new THREE.Mesh(marsGeometry, marsMaterial);
        mars.position.set(12, 0, 0);
        marsOrbit.add(mars);

        // 軌道を可視化するための線を作成
        const createOrbitLine = (radius: number, color: number) => {
            const orbitCurve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
            const orbitPoints = orbitCurve.getPoints(100);
            const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints.map((point) => new THREE.Vector3(point.x, 0, point.y)));
            const orbitMaterial = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.3,
            });
            return new THREE.Line(orbitGeometry, orbitMaterial);
        };

        // 地球と火星の軌道線を追加
        scene.add(createOrbitLine(8, 0x4a90e2));
        scene.add(createOrbitLine(12, 0xff6b47));

        // アニメーションループ
        let animationId: number = 0;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // 太陽の自転
            sun.rotation.y += 0.005;

            // 地球の公転
            earthOrbit.rotation.y += 0.01;
            // 地球の自転
            earth.rotation.y += 0.02;

            // 月の公転（地球の周り）
            moonOrbit.rotation.y += 0.05;
            // 月の自転
            moon.rotation.y += 0.05;

            // 火星の公転
            marsOrbit.rotation.y += 0.006;
            // 火星の自転
            mars.rotation.y += 0.015;

            renderer.render(scene, camera);
        };

        animate();

        // リサイズハンドラー
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // クリーンアップ用の参照を保存
        sceneRef.current = {
            scene,
            camera,
            renderer,
            animationId,
        };

        // クリーンアップ関数
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [isMounted]);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            <div ref={mountRef} />
        </div>
    );
}
