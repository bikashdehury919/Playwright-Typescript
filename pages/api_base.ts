import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ApiBase {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getRequest(endpoint: string): Promise<APIResponse> {
    return await this.request.get(endpoint);
  }

  async postRequest(endpoint: string, payload: any): Promise<APIResponse> {
    return await this.request.post(endpoint, { data: payload });
  }

  async verifyStatusCode(response: APIResponse, expectedStatus: number): Promise<void> {
    expect(response.status()).toBe(expectedStatus);
  }

  async verifyResponseContains(response: APIResponse, key: string, expectedValue: any): Promise<void> {
    const json = await response.json();
    expect(json[key]).toBe(expectedValue);
  }
}
