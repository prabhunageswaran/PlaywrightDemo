import { test, expect } from '@playwright/test';
import { attachReqRes } from '../../utils/apicommon';

const BASE = 'https://petstore.swagger.io/v2';

test.describe('Petstore API - POST /pet (create) with e2e verification', () => {
  test('POST create pet - positive and E2E verify with GET then DELETE', async ({ request }, testInfo) => {
    // choose an id unlikely to conflict
    const id = Date.now();
    const payload = {
      id,
      category: { id: id, name: 'summa' },
      name: 'summa',
      photoUrls: ['urls..'],
      tags: [{ id: id, name: 'summa' }],
      status: 'available',
    };

    const url = `${BASE}/pet`;
    const reqDesc = { method: 'POST', url, headers: { accept: 'application/json', 'content-type': 'application/json' }, body: payload };
    const resp = await request.post(url, { data: payload, headers: { accept: 'application/json', 'Content-Type': 'application/json' } });
    const created = await attachReqRes('post-create-pet', reqDesc, resp, testInfo);

    // Expect success (Petstore returns 200 with created object)
    expect(resp.status(), 'expected 200 OK for create').toBe(200);
    expect(created).toBeTruthy();
    if (created && typeof created === 'object') {
      expect(created.id).toBe(id);
      expect(created.name).toBe(payload.name);
    }

    // Now GET to verify created
    const getResp = await request.get(`${BASE}/pet/${id}`, { headers: { accept: 'application/json' } });
    const got = await attachReqRes('get-created-pet', { method: 'GET', url: `${BASE}/pet/${id}` }, getResp, testInfo);
    expect(getResp.status(), 'expected 200 OK for get created').toBe(200);
    if (got && typeof got === 'object') {
      expect(got.id).toBe(id);
      expect(got.name).toBe(payload.name);
      expect(got.status).toBe(payload.status);
    }

    // Cleanup: DELETE the pet
    const delResp = await request.delete(`${BASE}/pet/${id}`);
    await attachReqRes('delete-created-pet', { method: 'DELETE', url: `${BASE}/pet/${id}` }, delResp, testInfo);
    expect(delResp.status(), 'expected 200 OK on delete').toBe(200);
  });

  test('POST create pet - negative: missing name should be client error', async ({ request }, testInfo) => {
    const id = Date.now() + 1;
    const payload = {
      id,
      category: { id: id, name: 'summa' },
      // name omitted to simulate invalid payload
      photoUrls: ['string'],
      tags: [{ id: id, name: 'summa' }],
      status: 'available',
    } as any;

    const url = `${BASE}/pet`;
    const reqDesc = { method: 'POST', url, headers: { accept: 'application/json', 'content-type': 'application/json' }, body: payload };
    const resp = await request.post(url, { data: payload, headers: { accept: 'application/json', 'Content-Type': 'application/json' } });
    const body = await attachReqRes('post-create-missing-name', reqDesc, resp, testInfo);

    // Expect client error (4xx). Behavior may vary; assert it's 4xx.
    expect(resp.status() >= 400 && resp.status() < 500, 'expected 4xx for missing name').toBeTruthy();
    if (body && typeof body === 'object' && body.message) expect(String(body.message)).toBeTruthy();
  });

  test('POST create pet - negative: invalid content-type', async ({ request }, testInfo) => {
    const id = Date.now() + 2;
    const payload = {
      id,
      category: { id: id, name: 'summa' },
      name: 'summa',
      photoUrls: ['string'],
      tags: [{ id: id, name: 'summa' }],
      status: 'available',
    };

    const url = `${BASE}/pet`;
    const reqDesc = { method: 'POST', url, headers: { accept: 'application/json', 'content-type': 'text/plain' }, body: payload };
    // intentionally send wrong content-type
    const resp = await request.post(url, { data: JSON.stringify(payload), headers: { accept: 'application/json', 'Content-Type': 'text/plain' } });
    const body = await attachReqRes('post-create-invalid-ct', reqDesc, resp, testInfo);

    // Expect client error (4xx) or server may accept; assert 4xx to flag invalid usage
    expect(resp.status() >= 400 && resp.status() < 500, 'expected 4xx for invalid content-type').toBeTruthy();
    if (body && typeof body === 'object' && body.message) expect(String(body.message)).toBeTruthy();
  });
});
