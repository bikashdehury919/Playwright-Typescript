import { test, expect } from '../../fixtures';
import { ApiBase } from '../../pages/api_base'; 

test('GET product by ID and validate response', async ({ apiRequestContext }) => {
  const api = new ApiBase(apiRequestContext);

  const res = await api.getRequest('/products/1');
  await api.verifyStatusCode(res, 200);

  const body = await res.json();

  expect(body).toBeTruthy();
  expect(body.id).toBe(1);

  const { title, price } = body;
  console.log('Buffered Title:', title);
  console.log('Buffered Price:', price);

  expect(typeof title).toBe('string');
  expect(typeof price).toBe('number');
});
