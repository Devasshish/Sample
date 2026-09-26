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
  const [focusedTarget, setFocusedTarget] = useState(null);

  const {
    progress,
    currentChapterIndex,
    currentChapter,
    scrollToChapter,
    setProgressDirect
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

  // Trigger sound on sector transitions
  const prevChapterRef = useRef(currentChapterIndex);
  useEffect(() => {
    if (prevChapterRef.current !== currentChapterIndex) {
      prevChapterRef.current = currentChapterIndex;
      playTransitionSound();
    }
  }, [currentChapterIndex, playTransitionSound]);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setSelectedProject(null);
    if (member && member.position) {
      setFocusedTarget(member.position);
    }
    playChime(587.33, 0.9);
  };

  const handleCloseMember = () => {
    setSelectedMember(null);
    setFocusedTarget(null);
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setSelectedMember(null);
    if (project && project.cameraInspectPos) {
      setFocusedTarget(project.cameraInspectPos);
    }
    playChime(659.25, 0.9);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    setFocusedTarget(null);
  };

  const handleSelectProjectById = (projId) => {
    const proj = PROJECTS.find(p => p.id === projId);
    if (proj) {
      handleSelectProject(proj);
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

      {/* 3D Canvas */}
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
          onOpenTransmission={handleOpenTransmission}
          focusedTarget={focusedTarget}
        />
      ) : (
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#00f0ff' }}>
          <h2>WebGL Accelerated View Unavailable</h2>
          <p style={{ color: '#aaa', marginTop: '10px' }}>Please enable WebGL in your browser for the full 3D experience.</p>
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
        onSelectMember={handleSelectMember}
        selectedMember={selectedMember}
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
        hoveredMemberId={hoveredMemberId}
        setHoveredMemberId={setHoveredMemberId}
        hoveredProjectId={hoveredProjectId}
        setHoveredProjectId={setHoveredProjectId}
      />

      {/* Persistent Navigation Track & Progress Scrubber */}
      <NavigationOverlay
        currentChapterIndex={currentChapterIndex}
        progress={progress}
        onNavigateChapter={scrollToChapter}
        onScrub={setProgressDirect}
      />

      {/* Slide-in Operative Dossier Drawer */}
      <TeamDrawer
        member={selectedMember}
        onClose={handleCloseMember}
        onSelectProjectById={handleSelectProjectById}
      />

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
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
