"use client";

import { useState, useRef, useEffect } from "react";
import { Video, Mic, Camera, VideoOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
            title: "Acceso a la Cámara Denegado",
            description: "Por favor, habilita los permisos de cámara y micrófono en tu navegador para transmitir.",
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
            title: "Cámara no disponible",
            description: "No se puede iniciar la transmisión sin acceso a la cámara.",
          });
        return;
    }
    setIsBroadcasting(!isBroadcasting);
    toast({
        title: isBroadcasting ? "Transmisión Detenida" : "¡Estás en vivo!",
        description: isBroadcasting ? "Tu transmisión ha finalizado." : "¡Tu audiencia ahora puede verte!",
    });
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="text-primary" />
          <span>Estudio de Transmisión</span>
        </CardTitle>
        <CardDescription>
          Inicia una transmisión de video en vivo para tu audiencia. Necesitarás permisos de cámara y micrófono.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            {hasCameraPermission === false && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                    <VideoOff className="w-12 h-12 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">La cámara no está disponible</p>
                </div>
            )}
            {isBroadcasting && (
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge variant="destructive" className="animate-pulse">
                        EN VIVO
                    </Badge>
                </div>
            )}
        </div>
        
        {hasCameraPermission === false && (
            <Alert variant="destructive">
              <AlertTitle>Se Requiere Acceso a la Cámara</AlertTitle>
              <AlertDescription>
                Por favor, permite el acceso a la cámara y al micrófono en tu navegador para usar esta función.
              </AlertDescription>
            </Alert>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button onClick={toggleBroadcast} disabled={hasCameraPermission === undefined || hasCameraPermission === false} className="w-full sm:w-auto" size="lg">
                {isBroadcasting ? <VideoOff className="mr-2"/> : <Video className="mr-2" />}
                {isBroadcasting ? "Detener Transmisión" : "Iniciar Transmisión"}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Camera className="w-5 h-5 text-green-500" />
                <span>Cámara {hasCameraPermission ? 'Activada' : 'Desactivada'}</span>
                <Mic className="w-5 h-5 text-green-500" />
                <span>Micrófono Activado</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Add new component - live-broadcast.tsx
import { Badge } from "@/components/ui/badge";
