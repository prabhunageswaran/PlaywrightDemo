import { APIResponse } from '@playwright/test';

export async function attachReqRes(name: string, info: any, resp: APIResponse, testInfo: any) {
  try {
    await testInfo.attach(`${name}-request`, {
      body: Buffer.from(JSON.stringify(info, null, 2)),
      contentType: 'application/json',
    });
  } catch {}
  try {
    const text = await resp.text();
    const contentType = resp.headers()['content-type'] || 'text/plain';
    await testInfo.attach(`${name}-response`, {
      body: Buffer.from(text),
      contentType,
    });
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch {
    return null;
  }
}

