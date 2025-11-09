"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Rewind, FastForward, Repeat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const Deck = ({ isPlaying, title, artist }: { isPlaying: boolean, title: string, artist: string }) => {
    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <div className={`w-full h-full rounded-full bg-neutral-800 border-4 border-neutral-700 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '5s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}>
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border-2 border-primary"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-primary/50 top-4 left-1/2 -translate-x-1/2"></div>
                </div>
            </div>
            <div className="text-center">
                <p className="font-semibold text-sm truncate">{title}</p>
                <p className="text-xs text-muted-foreground">{artist}</p>
            </div>
        </div>
    );
};


export default function LivePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [crossfade, setCrossfade] = useState(0.5);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume === 0) {
        setIsMuted(true);
    } else if (isMuted) {
        setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
        setIsMuted(false);
        setVolume(0.5);
    } else {
        setIsMuted(true);
        setVolume(0);
    }
  };
  
  const handleCrossfadeChange = (value: number[]) => {
    setCrossfade(value[0]);
  }

  return (
    <Card className="overflow-hidden shadow-lg bg-neutral-900 border-neutral-800 text-neutral-200">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Deck A */}
            <div style={{ opacity: Math.min(1, (1 - crossfade) * 2) }}>
                <Deck isPlaying={isPlaying && crossfade < 0.5} title="El Show de la Mañana" artist="026 En Vivo" />
            </div>

            {/* Mixer Controls */}
            <div className="flex flex-col items-center gap-4 bg-neutral-800/50 p-4 rounded-lg">
                <Badge variant="destructive" className="animate-pulse">
                    EN VIVO
                </Badge>
                <div className="flex items-center gap-2">
                    <Button onClick={() => {}} variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-primary/20 hover:text-primary"><Rewind /></Button>
                    <Button onClick={togglePlay} variant="ghost" size="icon" className="rounded-full bg-primary hover:bg-primary/90 w-16 h-16">
                        {isPlaying ? <Pause className="h-8 w-8 text-primary-foreground" /> : <Play className="h-8 w-8 text-primary-foreground fill-primary-foreground" />}
                        <span className="sr-only">{isPlaying ? 'Pausar' : 'Reproducir'}</span>
                    </Button>
                     <Button onClick={() => {}} variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-primary/20 hover:text-primary"><FastForward /></Button>
                </div>

                <div className="w-full max-w-xs space-y-4">
                    <div className="flex items-center gap-2 w-full">
                        <Button onClick={toggleMute} variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary">
                            <span className="sr-only">{isMuted ? 'Quitar Silencio' : 'Silenciar'}</span>
                          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          onValueChange={handleVolumeChange}
                          max={1}
                          step={0.05}
                          aria-label="Control de volumen"
                        />
                    </div>
                     <div className="w-full">
                        <Slider
                            value={[crossfade]}
                            onValueChange={handleCrossfadeChange}
                            max={1}
                            step={0.01}
                            aria-label="Crossfader"
                        />
                         <p className="text-xs text-center text-muted-foreground mt-1">Crossfader</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-primary">A</p>
                    <div className="w-24 h-6 bg-neutral-700 rounded-md flex items-center justify-center">
                        <p className="text-xs font-mono">128 BPM</p>
                    </div>
                    <p className="text-sm font-bold text-primary">B</p>
                </div>
            </div>

            {/* Deck B */}
             <div style={{ opacity: Math.min(1, crossfade * 2) }}>
                <Deck isPlaying={isPlaying && crossfade >= 0.5} title="Mix de Salsa" artist="DJ Invitado" />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
