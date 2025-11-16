import { test, expect } from '@playwright/test';
import { attachReqRes } from '../../utils/apicommon';

const BASE = 'https://petstore.swagger.io/v2';

test.describe('Petstore API - GET /pet/{petId}', () => {

  test('GET pet by id - positive case (id=2)', async ({ request }, testInfo) => {
    const id = 1;
    const url = `${BASE}/pet/${id}`;
    //const requestDescriptor = { method: 'GET', url, headers: { accept: 'application/json' } };
    const resp = await request.get(url, { headers: { accept: 'application/json' }});

    // attach request and response to the report
    //const body = await attachReqRes('pet-2', requestDescriptor, resp, testInfo);
    const text = await resp.text();
    const body  = JSON.parse(text);
 
    const code = resp.status();
    // HTTP status
    expect(resp.status(), 'expected 200 OK').toBe(200);

    // Content-Type header and JSON body
    const ct = resp.headers()['content-type'] || '';
    expect(ct.toLowerCase()).toContain('application/json');

    // Basic shape assertions
    expect(body).toBeTruthy();
    // If parsed JSON has id property assert it, otherwise try fallback
    if (body && typeof body === 'object' && 'id' in body) {
      expect(body.id).toBe(id);
    }
    if (body && typeof body === 'object' && 'name' in body) {
      expect(body.name).toBeDefined();
      expect(typeof body.name).toBe('string');
      expect(body.name).toBe('catty');
    }
  });

  test('GET pet by id - negative case: non-existent id returns 404', async ({ request }, testInfo) => {
    const id = 9_999_999;
    const url = `${BASE}/pet/${id}`;
    const requestDescriptor = { method: 'GET', url, headers: { accept: 'application/json' } };
    const resp = await request.get(url, { headers: requestDescriptor.headers });

    const body = await attachReqRes('pet-404', requestDescriptor, resp, testInfo);

    expect(resp.status(), 'expected 404 Not Found for unknown id').toBe(404);
    // Server typically returns an object with { code, type, message }
    if (body && typeof body === 'object' && typeof body.message === 'string') {
      expect(body.message.toLowerCase()).toMatch(/not found/);
    }
  });

  test('GET pet by id - negative case: invalid id (non-numeric) returns client error', async ({ request }, testInfo) => {
    const id: any = 'abc';
    const url = `${BASE}/pet/${id}`;
    const requestDescriptor = { method: 'GET', url, headers: { accept: 'application/json' } };
    const resp = await request.get(url, { headers: requestDescriptor.headers });

    const body = await attachReqRes('pet-invalid', requestDescriptor, resp, testInfo);

    // Some servers return 400, some 404 for invalid path param. Assert it's a 4xx client error.
    expect(resp.status() >= 400 && resp.status() < 500, 'expected 4xx for invalid id').toBeTruthy();
    // If JSON body present, assert there's a message
    if (body && typeof body === 'object' && body.message) {
      expect(String(body.message)).toBeTruthy();
    }
  });

  test('GET pet by id - boundary / zero id', async ({ request }, testInfo) => {
    const id = 0;
    const url = `${BASE}/pet/${id}`;
    const requestDescriptor = { method: 'GET', url, headers: { accept: 'application/json' } };
    const resp = await request.get(url, { headers: requestDescriptor.headers });

    const body = await attachReqRes('pet-zero', requestDescriptor, resp, testInfo);

    // Assert it's either 200 with a valid body or a client error; make a conservative assertion
    expect(resp.status() < 500, 'server should not 5xx for zero id').toBeTruthy();
  });
});
