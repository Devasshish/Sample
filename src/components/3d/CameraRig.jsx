import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CHAPTERS } from '../../data/storyData';

export function CameraRig({ progress = 0, reducedMotion = false }) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Initial position matching Scene 01 ARRIVAL
  const currentPosRef = useRef(new THREE.Vector3(-2.2, 1.4, 7.8));
  const currentLookAtRef = useRef(new THREE.Vector3(0.2, 1.2, 0.5));

  // Pre-allocated vectors to prevent GC allocations inside useFrame
  const targetPosRef = useRef(new THREE.Vector3());
  const targetLookAtRef = useRef(new THREE.Vector3());

  // Mouse parallax tracking with passive listener
  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Parallax smoothing
    const mouseLerp = reducedMotion ? 0 : 0.04;
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * mouseLerp;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * mouseLerp;

    // Find bounding chapters based on current progress across 7 scenes
    let startChapter = CHAPTERS[0];
    let endChapter = CHAPTERS[CHAPTERS.length - 1];
    let localT = 0;

    for (let i = 0; i < CHAPTERS.length - 1; i++) {
      const chA = CHAPTERS[i];
      const chB = CHAPTERS[i + 1];
      const midA = (chA.range[0] + chA.range[1]) / 2;
      const midB = (chB.range[0] + chB.range[1]) / 2;

      if (progress >= midA && progress <= midB) {
        startChapter = chA;
        endChapter = chB;
        localT = (progress - midA) / (midB - midA);
        break;
      } else if (progress < midA && i === 0) {
        startChapter = chA;
        endChapter = chA;
        localT = 0;
        break;
      } else if (progress > midB && i === CHAPTERS.length - 2) {
        startChapter = chB;
        endChapter = chB;
        localT = 1;
        break;
      }
    }

    // Smooth cubic hermite / smoothstep interpolation for weighted cinematic feel
    const smoothT = localT * localT * (3 - 2 * localT);

    const targetX = THREE.MathUtils.lerp(startChapter.cameraPos[0], endChapter.cameraPos[0], smoothT);
    const targetY = THREE.MathUtils.lerp(startChapter.cameraPos[1], endChapter.cameraPos[1], smoothT);
    const targetZ = THREE.MathUtils.lerp(startChapter.cameraPos[2], endChapter.cameraPos[2], smoothT);

    const lookX = THREE.MathUtils.lerp(startChapter.cameraTarget[0], endChapter.cameraTarget[0], smoothT);
    const lookY = THREE.MathUtils.lerp(startChapter.cameraTarget[1], endChapter.cameraTarget[1], smoothT);
    const lookZ = THREE.MathUtils.lerp(startChapter.cameraTarget[2], endChapter.cameraTarget[2], smoothT);

    // Subtle handheld operator breathing movement (very slow, organic)
    const time = state.clock.elapsedTime;
    const handheldSwayX = reducedMotion ? 0 : Math.sin(time * 0.4) * 0.012;
    const handheldSwayY = reducedMotion ? 0 : Math.cos(time * 0.5) * 0.008;

    // Apply gentle mouse parallax offset
    const parallaxIntensity = reducedMotion ? 0 : 0.25;
    const finalPosX = targetX + mouseRef.current.x * parallaxIntensity + handheldSwayX;
    const finalPosY = targetY + mouseRef.current.y * parallaxIntensity * 0.4 + handheldSwayY;
    const finalPosZ = targetZ;

    const finalLookX = lookX + mouseRef.current.x * (parallaxIntensity * 0.4);
    const finalLookY = lookY + mouseRef.current.y * (parallaxIntensity * 0.2);
    const finalLookZ = lookZ;

    // Smooth weighted camera damping (simulating physical crane & dolly mass)
    targetPosRef.current.set(finalPosX, finalPosY, finalPosZ);
    targetLookAtRef.current.set(finalLookX, finalLookY, finalLookZ);

    currentPosRef.current.lerp(targetPosRef.current, 0.07);
    currentLookAtRef.current.lerp(targetLookAtRef.current, 0.07);

    camera.position.copy(currentPosRef.current);
    camera.lookAt(currentLookAtRef.current);
  });

  return null;
}
