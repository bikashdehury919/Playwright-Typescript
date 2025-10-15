import { Page, expect } from '@playwright/test';
import { RegisterLocators } from '../locators/register_locators';

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(baseUrl: string) {
    await this.page.goto(`${baseUrl}/register`);
  }

  async fillForm(email: string, password: string, confirmPassword: string) {
    await this.page.fill(RegisterLocators.emailInput, email);
    await this.page.fill(RegisterLocators.passwordInput, password);
    await this.page.fill(RegisterLocators.confirmPasswordInput, confirmPassword);
  }

  async submit() {
    await this.page.click(RegisterLocators.submitButton);
  }

  async expectSuccessRedirect(baseUrl: string) {
    await expect(this.page).toHaveURL(`${baseUrl}/login`);
    await expect(this.page.locator(RegisterLocators.flashSuccess)).toContainText('Registration successful');
  }

  async expectEmailInvalid() {
    await expect(this.page.locator(RegisterLocators.emailInvalid)).toBeVisible();
  }

  async expectPasswordInvalid() {
    await expect(this.page.locator(RegisterLocators.passwordInvalid)).toBeVisible();
  }

  async expectPasswordMismatch() {
    await expect(this.page.locator(RegisterLocators.flashDanger)).toContainText('Passwords do not match');
  }

  async expectDuplicateEmailError() {
    await expect(this.page.locator(RegisterLocators.flashDanger)).toContainText('Email already registered');
  }
}
