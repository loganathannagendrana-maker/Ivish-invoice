'use server';
/**
 * @fileOverview AI agent to suggest services or products based on user input.
 *
 * - suggestServicesOrProducts - Function to suggest services or products.
 * - SuggestServicesOrProductsInput - Input type for the function.
 * - SuggestServicesOrProductsOutput - Output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestServicesOrProductsInputSchema = z.object({
  text: z
    .string()
    .describe(
      'The text entered by the user, used to generate service/product suggestions.'
    ),
});
export type SuggestServicesOrProductsInput = z.infer<
  typeof SuggestServicesOrProductsInputSchema
>;

const SuggestServicesOrProductsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested services or products.'),
});
export type SuggestServicesOrProductsOutput = z.infer<
  typeof SuggestServicesOrProductsOutputSchema
>;

export async function suggestServicesOrProducts(
  input: SuggestServicesOrProductsInput
): Promise<SuggestServicesOrProductsOutput> {
  return suggestServicesOrProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestServicesOrProductsPrompt',
  input: {schema: SuggestServicesOrProductsInputSchema},
  output: {schema: SuggestServicesOrProductsOutputSchema},
  prompt: `You are an AI assistant that suggests services or products based on the user's input text.  Return an array of strings representing the suggestions.

Text: {{{text}}}`,
});

const suggestServicesOrProductsFlow = ai.defineFlow(
  {
    name: 'suggestServicesOrProductsFlow',
    inputSchema: SuggestServicesOrProductsInputSchema,
    outputSchema: SuggestServicesOrProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
