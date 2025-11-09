"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export default function LivePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        // Fake timer for visual effect
        setCurrentTime(prevTime => {
          const [min, sec] = prevTime.split(":").map(Number);
          let newSec = sec + 1;
          let newMin = min;
          if (newSec === 60) {
            newSec = 0;
            newMin += 1;
          }
          return `${String(newMin).padStart(2, "0")}:${String(newSec).padStart(2, "0")}`;
        });
      }, 1000);
    } else {
        // Reset timer when paused
        setCurrentTime("00:00");
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

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

  return (
    <Card className="overflow-hidden shadow-lg bg-card">
      <CardContent className="flex flex-col items-center justify-center gap-6 p-6 sm:flex-row">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 flex-shrink-0">
            <Radio className={`h-12 w-12 text-primary ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>

        <div className="flex flex-1 flex-col gap-3 w-full">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="font-bold text-lg">Now Playing</h3>
                    <p className="text-sm text-muted-foreground">Morning Show</p>
                </div>
                <Badge variant="destructive" className="animate-pulse">
                    LIVE
                </Badge>
            </div>
          
            <div className="flex items-center gap-4">
              <Button onClick={togglePlay} variant="ghost" size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                {isPlaying ? <Pause className="h-6 w-6 text-primary-foreground" /> : <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground" />}
                <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
              </Button>
              <div className="text-sm font-mono text-muted-foreground w-12">{currentTime}</div>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden relative">
                <div 
                    className="bg-primary h-full"
                    style={{ width: isPlaying ? '100%' : '0%', transition: isPlaying ? 'width 3600s linear' : 'none' }}
                ></div>
              </div>
              <div className="flex items-center gap-2 w-[120px]">
                <Button onClick={toggleMute} variant="ghost" size="icon" className="rounded-full">
                    <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={1}
                  step={0.05}
                  aria-label="Volume control"
                />
              </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
