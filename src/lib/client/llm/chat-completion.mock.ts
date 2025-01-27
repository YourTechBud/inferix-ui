/*
 * Mock server handlers
 */

import { http, HttpResponse } from 'msw';

import { getApiUrl } from '../config';
import { LLMSettings } from './chat-completion';

export const handlers = [
  http.post(getApiUrl('/inferix/v1/llm/chat/completions'), () => {
    const data = `
**The Ultimate Showdown: Goku vs One-Punch Man**

**Introduction**

Goku, the legendary Super Saiyan from the Dragon Ball universe, faces off against Saitama, the powerful yet laid-back hero from the One-Punch Man series. This hypothetical battle pits two powerful warriors against each other, pushing their limits to the extreme. In this essay, we will analyze the strengths and weaknesses of both opponents, exploring the possibilities and consequences of this epic confrontation.

**Goku's Abilities**

Goku, a warrior of the Saiyan tribe, boasts incredible martial arts skills, speed, and strength. He has mastered various ki-based techniques, allowing him to manipulate energy in various ways:

*   **Kamehameha Wave**: A concentrated blast of energy that can obliterate enemies.
*   **Kaio-ken**: A technique that allows Goku to tap into his inner power, augmenting his physical abilities.
*   **Instant Transmission**: Goku can teleport short or long distances using his ki.

**One-Punch Man's Abilities**

Saitama, on the other hand, is a hero with a unique set of skills:

*   **Incredible Strength**: Saitama possesses overwhelming physical strength, capable of defeating opponents with a single punch.
*   **Durability**: He exhibits robust durability, withstanding massive amounts of damage without flinching.
*   **Speed and Agility**: Saitama's speed and agility allow him to keep up with fast-moving opponents and avoid attacks with ease.

**Comparing the Two**

Goku's abilities rely on his ki and his ability to harness energy, whereas Saitama's powers are rooted in his raw physical strength and durability. Goku's reliance on ki-based techniques makes him vulnerable to attacks that can disrupt or neutralize his energy.

**Hypothetical Scenario**

Suppose Goku and Saitama face off in a neutral environment, with no external factors influencing the battle. Here's a possible scenario:

1.  Saitama, confident in his abilities, sneers at Goku, goading him into a fight.
2.  Goku, fueled by his determination to battle Saitama, charges forward with a Kamehameha Wave.
3.  Saitama responds by throwing a straightforward punch.
4.  Goku attempts to dodge the punch, but Saitama's speed and agility prove to be too much for him to handle.
5.  The punch lands squarely on Goku, severely injuring him.

**Conclusion**

In this hypothetical battle, Saitama's overwhelming strength and durability give him the upper hand over Goku. Goku's reliance on ki-based techniques makes him vulnerable to Saitama's raw power.

**Winner:** One-Punch Man
    `;
    const settings: LLMSettings = {
      model: 'gpt-4o',
    };

    return prepareChatCompletionStreamingResponse(data, settings);
  }),
];

export const prepareChatCompletionStreamingResponse = (
  data: string,
  settings: LLMSettings,
) => {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const chunkSize = 10;
      const chunks = [];
      for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
      }
      const chatId = 'chat-' + Math.random().toString(36).substring(2, 15);
      const timestamp = Math.floor(Date.now() / 1000);

      // Stream content chunks
      for (const chunk of chunks) {
        const response = {
          id: chatId,
          choices: [
            {
              delta: {
                role: 'assistant',
                content: chunk,
              },
              index: 0,
            },
          ],
          created: timestamp,
          model: settings.model || 'gpt-4o',
          object: 'chat.completion',
          usage: {
            completion_tokens: 4,
            prompt_tokens: 254,
            total_tokens: 255,
          },
        };

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(response)}\n\n`),
        );
        await new Promise(resolve => setTimeout(resolve, 20));
      }

      // Send completion message
      const completionResponse = {
        id: chatId,
        choices: [
          {
            delta: {
              role: 'assistant',
              content: '',
            },
            finish_reason: 'stop',
            index: 0,
          },
        ],
        created: timestamp,
        model: settings.model || 'Llama-3.1-8B-Instruct',
        object: 'chat.completion',
        usage: {
          completion_tokens: 206,
          prompt_tokens: 254,
          total_tokens: 460,
        },
      };
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(completionResponse)}\n\n`),
      );

      // Send empty choices message
      const emptyChoicesResponse = {
        id: chatId,
        choices: [],
        created: timestamp,
        model: settings.model || 'Llama-3.1-8B-Instruct',
        object: 'chat.completion',
        usage: {
          completion_tokens: 206,
          prompt_tokens: 254,
          total_tokens: 460,
        },
      };
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(emptyChoicesResponse)}\n\n`),
      );

      // Send done message
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new HttpResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
};
