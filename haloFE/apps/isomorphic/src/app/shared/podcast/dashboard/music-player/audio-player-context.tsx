'use client';

import {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type AudioPlayerContextType = {
  audioRef: RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  currentDuration: number;
  totalDuration: number;
  handlePlayPause: () => void;
  seekNext: () => void;
  seekPrev: () => void;
  setAudioUrl: (url: string) => void;
  bufferedProgress: number;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const AudioPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [audioSrc, setAudioSrc] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seekPrev = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

  const seekNext = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        totalDuration
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTotalDuration(audioRef.current.duration);
    }
  };

  const loadAudioBuffer = async (url: string) => {
    try {
      // Cancel any existing fetch request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentLength = response.headers.get('content-length');
      const totalSize = contentLength ? parseInt(contentLength, 10) : 0;

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to get reader');

      const chunks: Uint8Array[] = [];
      let loadedSize = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        loadedSize += value.length;

        // Calculate and update buffer progress
        if (totalSize) {
          setBufferedProgress((loadedSize / totalSize) * 100);
        }
      }

      // Combine chunks into a single Uint8Array
      const allChunks = new Uint8Array(loadedSize);
      let position = 0;
      for (const chunk of chunks) {
        allChunks.set(chunk, position);
        position += chunk.length;
      }

      // Create blob and object URL
      const blob = new Blob([allChunks], { type: 'audio/mpeg' });
      const blobUrl = URL.createObjectURL(blob);

      // Update audio source
      if (audioRef.current) {
        audioRef.current.src = blobUrl;
        audioRef.current.load();
      }

      return blobUrl;
    } catch (error) {
      if ((error as any).name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Error loading audio:', error);
      }
      return null;
    }
  };

  const setAudioUrl = useCallback(async (url: string) => {
    setIsPlaying(false);
    setCurrentDuration(0);
    setBufferedProgress(0);

    const blobUrl = await loadAudioBuffer(url);

    if (blobUrl) {
      setAudioSrc(blobUrl);

      if (audioRef.current) {
        if (document.documentElement.hasAttribute('data-user-interacted')) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((error) => console.error('Error playing audio:', error));
        }
      }
    }
  }, []);

  // Cleanup function to revoke blob URLs
  useEffect(() => {
    return () => {
      if (audioSrc && audioSrc.startsWith('blob:')) {
        URL.revokeObjectURL(audioSrc);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    const handleInteraction = () => {
      document.documentElement.setAttribute('data-user-interacted', 'true');
    };

    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, []);

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentDuration(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleUpdateTime = () => {
    if (audioRef.current) {
      setCurrentDuration(Math.floor(audioRef.current.currentTime));
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        audioRef,
        isPlaying,
        currentDuration,
        totalDuration,
        handlePlayPause,
        seekPrev,
        seekNext,
        setAudioUrl,
        bufferedProgress,
      }}
    >
      {audioSrc ? (
        <audio
          ref={audioRef}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleUpdateTime}
          onEnded={handleEnded}
        >
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : null}
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      'useAudioPlayerContext must be used within a AudioPlayerProvider'
    );
  }
  return context;
};
