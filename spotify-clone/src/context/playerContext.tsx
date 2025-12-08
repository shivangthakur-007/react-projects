import React, { createContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { songsData } from "../assets/assets";

type ArrayInterface = {
  id: number;
  name: string;
  image: string;
  file: string;
  desc: string;
  duration: string;
};

interface TimeInterface {
  currentTime: { second: number; minute: number };
  totalTime: { second: number; minute: number };
}

interface ContextValue {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  seekBar: React.RefObject<HTMLDivElement|null>;
  seekBg: React.RefObject<HTMLDivElement | null>;

  track: ArrayInterface; // ← Always defined
  setTrack: React.Dispatch<React.SetStateAction<ArrayInterface>>;

  playStatus: boolean;
  setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
  time: TimeInterface;
  setTime: React.Dispatch<React.SetStateAction<TimeInterface>>;
  play: () => void;
  pause: () => void;
  playWithId: (id: number) => Promise<void>;
  previous: () => void;
  next: () => void;
  seekSong: () => Promise<void>;
}

// Default value uses first song — safe because songsData has items
const defaultContextValue: ContextValue = {
  audioRef: { current: null },
  seekBar: { current: null },
  seekBg: { current: null },
  track: songsData[0], // ← no null!
  setTrack: () => {},
  playStatus: false,
  setPlayStatus: () => {},
  time: {
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  },
  setTime: () => {},
  play: () => console.warn("play() called without PlayerContext"),
  pause: () => console.warn("pause() called without PlayerContext"),
  playWithId: async () =>
    console.warn("playWithId alled without playerContext"),
  previous: () => {
    console.warn("previous() called without playerContext");
  },
  next: () => {
    console.warn("next() called without playerContext");
  },
  seekSong: async() => {
    console.warn("seekSong() called without playerContext");
  },
};

export const playerContext = createContext<ContextValue>(defaultContextValue);

interface PlayerContextProviderProps {
  children: ReactNode;
}

const PlayerContextProvider: React.FC<PlayerContextProviderProps> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekBg = useRef<HTMLDivElement>(null);
  const seekBar = useRef<HTMLDivElement | null>(null);

  const [track, setTrack] = useState<ArrayInterface>(songsData[0]);
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const [time, setTime] = useState<TimeInterface>({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current?.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id: number) => {
    await setTrack(songsData[id]);
    await audioRef.current?.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current?.play();
      setPlayStatus(true);
    }
  };
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current?.play();
      setPlayStatus(true);
    }
  };

  interface SeekEvent {
    nativeEvent: {
      offsetX: number;
    };
  }

  const seekSong = async (e: SeekEvent): Promise<void> => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current!.offsetWidth) *
        audioRef.current.duration;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current) {
        const audio = audioRef.current;
        const duration = audio.duration;
        audio.ontimeupdate = () => {
          if (seekBar.current && audio) {
            seekBar.current.style.width = `${Math.floor(
              (audio.currentTime / duration) * 100
            )}%`;
          }
          setTime({
            currentTime: {
              second: Math.floor(audio.currentTime % 60),
              minute: Math.floor(audio.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(duration % 60),
              minute: Math.floor(duration / 60),
            },
          });
        };
      }
    }, 1000);
  }, [audioRef]);

  const contextValue: ContextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <playerContext.Provider value={contextValue}>
      {children}
    </playerContext.Provider>
  );
};

export default PlayerContextProvider;
