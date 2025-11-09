"use client";

import { useState, useRef, useEffect } from "react";
import { Video, Mic, Camera, VideoOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function LiveBroadcast() {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera and microphone permissions in your browser to broadcast.",
          });
        }
      } else {
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }

  }, [toast]);

  const toggleBroadcast = () => {
    if (!hasCameraPermission) {
        toast({
            variant: "destructive",
            title: "Camera not available",
            description: "Cannot start broadcast without camera access.",
          });
        return;
    }
    setIsBroadcasting(!isBroadcasting);
    toast({
        title: isBroadcasting ? "Broadcast Stopped" : "You are live!",
        description: isBroadcasting ? "Your broadcast has ended." : "Your audience can now see you!",
    });
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="text-primary" />
          <span>Broadcast Studio</span>
        </CardTitle>
        <CardDescription>
          Start a live video broadcast for your audience. You'll need camera and microphone permissions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            {hasCameraPermission === false && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                    <VideoOff className="w-12 h-12 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Camera is not available</p>
                </div>
            )}
            {isBroadcasting && (
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge variant="destructive" className="animate-pulse">
                        LIVE
                    </Badge>
                </div>
            )}
        </div>
        
        {hasCameraPermission === false && (
            <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera and microphone access in your browser to use this feature.
              </AlertDescription>
            </Alert>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button onClick={toggleBroadcast} disabled={hasCameraPermission === undefined || hasCameraPermission === false} className="w-full sm:w-auto" size="lg">
                {isBroadcasting ? <VideoOff className="mr-2"/> : <Video className="mr-2" />}
                {isBroadcasting ? "Stop Broadcast" : "Start Broadcast"}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Camera className="w-5 h-5 text-green-500" />
                <span>Camera {hasCameraPermission ? 'On' : 'Off'}</span>
                <Mic className="w-5 h-5 text-green-500" />
                <span>Mic On</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
