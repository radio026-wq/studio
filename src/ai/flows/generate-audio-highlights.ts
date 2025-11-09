'use server';

/**
 * @fileOverview Generates audio highlights from a given audio stream.
 *
 * - generateAudioHighlights - A function that takes an audio stream data URI and generates highlights.
 * - GenerateAudioHighlightsInput - The input type for the generateAudioHighlights function.
 * - GenerateAudioHighlightsOutput - The return type for the generateAudioHighlights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAudioHighlightsInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      'The audio stream as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected typo here
    ),
});
export type GenerateAudioHighlightsInput = z.infer<typeof GenerateAudioHighlightsInputSchema>;

const GenerateAudioHighlightsOutputSchema = z.object({
  highlights: z.array(
    z.object({
      startTime: z.number().describe('The start time of the highlight in seconds.'),
      endTime: z.number().describe('The end time of the highlight in seconds.'),
      reason: z.string().describe('The reason this segment was chosen as a highlight.'),
    })
  ).describe('A list of audio highlights.'),
});
export type GenerateAudioHighlightsOutput = z.infer<typeof GenerateAudioHighlightsOutputSchema>;

export async function generateAudioHighlights(input: GenerateAudioHighlightsInput): Promise<GenerateAudioHighlightsOutput> {
  return generateAudioHighlightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAudioHighlightsPrompt',
  input: {schema: GenerateAudioHighlightsInputSchema},
  output: {schema: GenerateAudioHighlightsOutputSchema},
  prompt: `You are an AI tasked with identifying and extracting compelling audio highlights from radio broadcasts.

Analyze the provided audio stream and identify segments that would be most engaging to listeners.  Consider segments with interesting discussions, surprising moments, or engaging musical interludes.

Return a JSON array of highlights, with the start and end times in seconds, and a brief explanation of why each segment was chosen.

Audio stream: {{media url=audioDataUri}}`,
});

const generateAudioHighlightsFlow = ai.defineFlow(
  {
    name: 'generateAudioHighlightsFlow',
    inputSchema: GenerateAudioHighlightsInputSchema,
    outputSchema: GenerateAudioHighlightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
