import React, { useState, useEffect, useRef } from 'react';
import { ExperienceCanvas } from './components/3d/ExperienceCanvas';
import { OrientationHeader } from './components/ui/OrientationHeader';
import { NavigationOverlay } from './components/ui/NavigationOverlay';
import { StoryOverlay } from './components/ui/StoryOverlay';
import { TeamDrawer } from './components/ui/TeamDrawer';
import { ProjectModal } from './components/ui/ProjectModal';
import { TransmissionConsole } from './components/ui/TransmissionConsole';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useAudioSynthesizer } from './hooks/useAudioSynthesizer';
import { useReducedMotion } from './hooks/useReducedMotion';
import { PROJECTS } from './data/projectData';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredMemberId, setHoveredMemberId] = useState(null);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const {
    progress,
    currentChapterIndex,
    currentChapter,
    scrollToChapter
  } = useScrollProgress();

  const {
    isMuted,
    toggleMute,
    playChime,
    playTransitionSound
  } = useAudioSynthesizer();

  const {
    reducedMotion,
    toggleReducedMotion
  } = useReducedMotion();

  // Test WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLSupported(false);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  // Trigger subtle sound on chapter transition
  const prevChapterRef = useRef(currentChapterIndex);
  useEffect(() => {
    if (prevChapterRef.current !== currentChapterIndex) {
      prevChapterRef.current = currentChapterIndex;
      playTransitionSound();
    }
  }, [currentChapterIndex, playTransitionSound]);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    playChime(587.33, 0.9);
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    playChime(659.25, 0.9);
  };

  const handleSelectProjectById = (projId) => {
    const proj = PROJECTS.find(p => p.id === projId);
    if (proj) {
      setSelectedProject(proj);
      setSelectedMember(null);
      playChime(659.25, 0.9);
    }
  };

  const handleOpenTransmission = () => {
    setIsTransmissionOpen(true);
    playChime(523.25, 1.0);
  };

  return (
    <div className="experience-wrapper">
      {/* Loading sequence */}
      {!isLoaded && <LoadingScreen onLoaded={() => setIsLoaded(true)} />}

      {/* 3D Canvas or WebGL fallback */}
      {webGLSupported ? (
        <ExperienceCanvas
          progress={progress}
          reducedMotion={reducedMotion}
          onSelectMember={handleSelectMember}
          hoveredMemberId={hoveredMemberId}
          setHoveredMemberId={setHoveredMemberId}
          onSelectProject={handleSelectProject}
          hoveredProjectId={hoveredProjectId}
          setHoveredProjectId={setHoveredProjectId}
          onCoreClick={() => playChime(440, 1.2)}
        />
      ) : (
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#ff6b35' }}>
          <h2>WebGL Accelerated View Unavailable</h2>
          <p style={{ color: '#aaa', marginTop: '10px' }}>Standard spatial layout loaded in compatibility mode.</p>
        </div>
      )}

      {/* Cinematic Vignette */}
      <div className="cinematic-vignette" />

      {/* Persistent Orientation Header */}
      <OrientationHeader
        currentChapter={currentChapter}
        progress={progress}
        isMuted={isMuted}
        toggleMute={toggleMute}
        reducedMotion={reducedMotion}
        toggleReducedMotion={toggleReducedMotion}
        onOpenTransmission={handleOpenTransmission}
      />

      {/* Story Overlay & Scroll Narrative */}
      <StoryOverlay
        currentChapter={currentChapter}
        currentChapterIndex={currentChapterIndex}
        progress={progress}
        onNavigateChapter={scrollToChapter}
        onSelectMember={handleSelectMember}
        onSelectProject={handleSelectProject}
        onOpenTransmission={handleOpenTransmission}
      />

      {/* Persistent Navigation Track & Progress Bar */}
      <NavigationOverlay
        currentChapterIndex={currentChapterIndex}
        progress={progress}
        onNavigateChapter={scrollToChapter}
      />

      {/* Slide-in Team Member Dossier Drawer */}
      <TeamDrawer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onSelectProjectById={handleSelectProjectById}
      />

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Final Transmission Console Modal */}
      <TransmissionConsole
        isOpen={isTransmissionOpen}
        onClose={() => setIsTransmissionOpen(false)}
        playChime={playChime}
      />
    </div>
  );
}
