import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.FOO = 'PRABuu';
  // Or a more complicated data structure as JSON:
  process.env.BAR = JSON.stringify({ some: 'data' });
}

export default globalSetup;