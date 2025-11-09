"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const placeholderSongs = [
  {
    id: 1,
    title: 'Nadie Sabe',
    artist: 'Bad Bunny',
    cover: 'https://picsum.photos/seed/song1/100/100',
    audioSrc: 'https://storage.googleapis.com/studioprodutti/samples/nadie-sabe-preview.mp3',
  },
  {
    id: 2,
    title: 'Harley Quinn',
    artist: 'Fuerza Regida, Marshmello',
    cover: 'https://picsum.photos/seed/song2/100/100',
    audioSrc: 'https://storage.googleapis.com/studioprodutti/samples/harley-quinn-preview.mp3',
  },
  {
    id: 3,
    title: 'La Diabla',
    artist: 'Xavi',
    cover: 'https://picsum.photos/seed/song3/100/100',
    audioSrc: 'https://storage.googleapis.com/studioprodutti/samples/la-diabla-preview.mp3',
  },
  {
    id: 4,
    title: 'Monaco',
    artist: 'Bad Bunny',
    cover: 'https://picsum.photos/seed/song4/100/100',
    audioSrc: 'https://storage.googleapis.com/studioprodutti/samples/monaco-preview.mp3',
  },
  {
    id: 5,
    title: 'Bellakeo',
    artist: 'Peso Pluma, Anitta',
    cover: 'https://picsum.photos/seed/song5/100/100',
    audioSrc: 'https://storage.googleapis.com/studioprodutti/samples/bellakeo-preview.mp3',
  },
];


export default function SongPlaylist() {
  const [currentSong, setCurrentSong] = useState<(typeof placeholderSongs)[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleSongEnd = () => {
        setIsPlaying(false);
        // Optional: play next song
    }

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleSongEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [currentSong]);

  const handlePlayPause = (song: (typeof placeholderSongs)[0]) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
        const newTime = (value[0] / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-4 sm:p-6 space-y-4">
        {placeholderSongs.map((song) => (
          <div key={song.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Image
              src={song.cover}
              alt={`Cover art for ${song.title}`}
              width={50}
              height={50}
              className="rounded-md"
              data-ai-hint="song album cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-foreground">{song.title}</p>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => handlePlayPause(song)}
            >
              {currentSong?.id === song.id && isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
            </Button>
          </div>
        ))}
        {currentSong && (
          <div className="sticky bottom-0 mt-4 p-4 bg-background/80 backdrop-blur-sm border-t rounded-b-lg -m-6 px-6">
            <div className="flex items-center gap-4">
                <Image
                    src={currentSong.cover}
                    alt={`Cover of ${currentSong.title}`}
                    width={40}
                    height={40}
                    className="rounded-md"
                />
                <div className="flex-1">
                    <p className="font-semibold text-sm">{currentSong.title}</p>
                    <p className="text-xs text-muted-foreground">{currentSong.artist}</p>
                    <Slider 
                        value={[progress]}
                        max={100}
                        step={1}
                        className="w-full mt-2 h-1"
                        onValueChange={handleSeek}
                    />
                </div>
                 <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handlePlayPause(currentSong)}>
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                 </Button>
            </div>
          </div>
        )}
        <audio ref={audioRef} src={currentSong?.audioSrc} />
      </CardContent>
    </Card>
  );
}
