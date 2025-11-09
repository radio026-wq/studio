"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { createHighlightsAction } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, UploadCloud, FileAudio, Clock } from 'lucide-react';

const initialState = {
  message: '',
  highlights: [],
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Generate Highlights
    </Button>
  );
}

export default function HighlightGenerator() {
  const [state, formAction] = useFormState(createHighlightsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Only show toast on successful generation with highlights
    if (state.message && state.highlights && state.highlights.length > 0) {
      toast({ title: "Success", description: state.message });
      formRef.current?.reset();
    }
    if (state.error) {
      toast({ variant: 'destructive', title: 'Error', description: state.error });
    }
  }, [state, toast]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary"/>
            <span>Auto-Highlights Tool</span>
        </CardTitle>
        <CardDescription>
          Upload an audio file to automatically generate interesting clips.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="audioFile">Audio File</Label>
            <div className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-muted-foreground" />
                <Input id="audioFile" name="audioFile" type="file" accept="audio/*" required className="flex-1 file:text-primary file:font-semibold" />
            </div>
          </div>
          <SubmitButton />
        </form>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 -mr-2">
          {state.highlights && state.highlights.length > 0 ? (
            state.highlights.map((highlight, index) => (
              <Card key={index} className="bg-muted/50">
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileAudio className="h-4 w-4 text-accent" />
                    <span>Highlight {index + 1}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5 pt-1 text-xs">
                    <Clock className="h-3 w-3" />
                    {formatTime(highlight.startTime)} - {formatTime(highlight.endTime)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm">
                  {highlight.reason}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full rounded-lg border-2 border-dashed p-4">
                <Sparkles className="h-8 w-8 mb-2" />
                <p className="text-sm font-medium">Your generated highlights will appear here.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
