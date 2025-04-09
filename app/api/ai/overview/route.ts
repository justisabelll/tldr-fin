import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { NextRequest, NextResponse } from 'next/server';
import { streamObject } from 'ai';
import { object, z } from 'zod';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const companyOverviewSchema = z.object({
  foundingYear: z.string(),
  location: z.string(),
  overview: z.array(z.string()),
  story: z.string(),
  stockTicker: z.string().optional(),
});

const requestSchema = z.object({
  companyName: z.string(),
  companyOverview: z.undefined(),
});

export async function POST(request: NextRequest) {
  try {
    // Check request body
    if (!request.body) {
      throw new Error('NO_BODY');
    }

    // Parse request
    const parsedRequest = requestSchema.safeParse(await request.json());
    if (!parsedRequest.success) {
      throw new Error('INVALID_BODY', { cause: parsedRequest.error });
    }

    const { companyName } = parsedRequest.data;
    if (!companyName.trim()) {
      throw new Error('EMPTY_COMPANY');
    }

    // Generate company overview
    const results = streamObject({
      model: openrouter('openai/chatgpt-4o-latest'),
      schema: companyOverviewSchema,
      mode: 'json',
      system:
        'You are a tool that provides company overviews as part of fundamental analysis. You always do your best to provide the most accurate and best picture possible of how a company came to be and what is is today in a clear concise manner.',
      prompt: `Generate an overview of the following company: ${companyName}`,
    });

    console.log(results);

    return results.toTextStreamResponse();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'UNKNOWN_ERROR';

    switch (errorMessage) {
      case 'NO_BODY':
        console.error('ERROR: No request body provided', error);
        return new NextResponse('No request body provided', { status: 400 });
      case 'INVALID_BODY':
        console.error('ERROR: Invalid request body format', error);
        return new NextResponse('Invalid request body format', { status: 400 });
      case 'EMPTY_COMPANY':
        console.error('ERROR: Company name cannot be empty', error);
        return new NextResponse('Company name cannot be empty', {
          status: 400,
        });
      case 'UNKNOWN_ERROR':
        console.error('ERROR: Unknown error occurred', error);
        return new NextResponse('Unknown error occurred', { status: 500 });
      default:
        console.error('ERROR: Internal server error', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
  }
}
