
'use server';

import { generateAudioHighlights, type GenerateAudioHighlightsOutput } from '@/ai/flows/generate-audio-highlights';

type ActionState = {
  message: string;
  highlights?: GenerateAudioHighlightsOutput['highlights'];
  error?: string;
}

export async function createHighlightsAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const audioFile = formData.get('audioFile') as File | null;

  if (!audioFile || audioFile.size === 0) {
    return { message: '', error: 'An audio file is required.' };
  }
  
  if (!audioFile.type.startsWith('audio/')) {
    return { message: '', error: 'Invalid file type. Please upload an audio file.' };
  }

  try {
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const audioDataUri = `data:${audioFile.type};base64,${buffer.toString('base64')}`;
    
    const result = await generateAudioHighlights({ audioDataUri });
    
    if (result.highlights && result.highlights.length > 0) {
        return { message: 'Highlights generated successfully.', highlights: result.highlights };
    } else {
        return { message: '', error: 'Could not generate highlights from this audio.' };
    }

  } catch (error) {
    console.error('Highlight generation failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { message: '', error: `Could not generate highlights. Please try a different file.`};
  }
}
