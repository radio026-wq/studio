
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
    return { message: '', error: 'Se requiere un archivo de audio.' };
  }
  
  if (!audioFile.type.startsWith('audio/')) {
    return { message: '', error: 'Tipo de archivo no válido. Por favor, sube un archivo de audio.' };
  }

  try {
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const audioDataUri = `data:${audioFile.type};base64,${buffer.toString('base64')}`;
    
    const result = await generateAudioHighlights({ audioDataUri });
    
    if (result.highlights && result.highlights.length > 0) {
        return { message: 'Destacados generados con éxito.', highlights: result.highlights };
    } else {
        return { message: '', error: 'No se pudieron generar destacados de este audio.' };
    }

  } catch (error) {
    console.error('La generación de destacados falló:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
    return { message: '', error: `No se pudieron generar los destacados. Por favor, intenta con un archivo diferente.`};
  }
}
