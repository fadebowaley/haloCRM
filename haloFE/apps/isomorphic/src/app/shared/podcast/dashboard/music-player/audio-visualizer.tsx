'use client';

import { useEffect, useRef } from 'react';

// Global store for audio context and connections
const globalAudioContext = {
  context: null as AudioContext | null,
  source: null as MediaElementAudioSourceNode | null,
  analyser: null as AnalyserNode | null,
  connectedElement: null as HTMLAudioElement | null,
};

interface AudioVisualizerProps {
  audioElement: HTMLAudioElement;
  theme: string | undefined;
  color: string;
  height?: number;
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
  defaultBarColor?: {
    light: string;
    dark: string;
  };
}

export function AudioVisualizer({
  audioElement,
  theme,
  color,
  height = 30,
  barWidth = 4,
  barGap = 4,
  barRadius = 4,
  defaultBarColor = {
    light: '#f1f1f1',
    dark: '#1f1f1f',
  },
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number | null>(null);

  // Setup audio context and nodes
  useEffect(() => {
    const setupAudioContext = () => {
      try {
        // If already connected to this audio element, reuse the existing setup
        if (globalAudioContext.connectedElement === audioElement) {
          return true;
        }

        // Clean up previous connections if they exist
        if (globalAudioContext.source) {
          globalAudioContext.source.disconnect();
        }
        if (globalAudioContext.analyser) {
          globalAudioContext.analyser.disconnect();
        }
        if (globalAudioContext.context) {
          globalAudioContext.context.close();
        }

        // Create new audio context and nodes
        globalAudioContext.context = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        globalAudioContext.analyser =
          globalAudioContext.context.createAnalyser();
        globalAudioContext.analyser.fftSize = 256;
        globalAudioContext.source =
          globalAudioContext.context.createMediaElementSource(audioElement);

        // Connect nodes
        globalAudioContext.source.connect(globalAudioContext.analyser);
        globalAudioContext.analyser.connect(
          globalAudioContext.context.destination
        );
        globalAudioContext.connectedElement = audioElement;

        return true;
      } catch (error) {
        console.error('Error setting up audio context:', error);
        return false;
      }
    };

    const success = setupAudioContext();
    if (!success) return;

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [audioElement]);

  // Handle visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !globalAudioContext.analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const bufferLength = globalAudioContext.analyser!.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      globalAudioContext.analyser!.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];

        ctx.fillStyle = audioElement.paused
          ? theme === 'dark'
            ? defaultBarColor.dark
            : defaultBarColor.light
          : color;

        ctx.beginPath();
        ctx.roundRect(
          x,
          audioElement.paused ? 0 : canvas.height - barHeight / 2,
          barWidth,
          audioElement.paused ? canvas.height : barHeight,
          barRadius
        );
        ctx.fill();

        x += barWidth + barGap;
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    const handlePlay = () => {
      if (globalAudioContext.context?.state === 'suspended') {
        globalAudioContext.context.resume();
      }
      draw();
    };

    const handlePauseOrStop = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      draw();
    };

    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePauseOrStop);
    audioElement.addEventListener('ended', handlePauseOrStop);

    draw();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePauseOrStop);
      audioElement.removeEventListener('ended', handlePauseOrStop);
    };
  }, [theme, color, barWidth, barGap, barRadius, defaultBarColor]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: `${height}px`,
        display: 'block',
      }}
    />
  );
}
