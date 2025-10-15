import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register_page';
import userData from '../../data/users.json';

const baseUrl = process.env.BASE_URL!;

test.describe('User Registration Flow', () => {
  let register: RegisterPage;

  test.beforeEach(async ({ page }) => {
    register = new RegisterPage(page);
    await register.goto(baseUrl);
  });

  test('Successful registration', async ({ page }) => {
    await register.fillForm(
      userData.validUser.email,
      userData.validUser.password,
      userData.validUser.password
    );
    await register.submit();
    await register.expectSuccessRedirect(baseUrl);
  });

  test('Email validation - invalid formats', async ({ page }) => {
    for (const email of userData.invalidEmails) {
      await register.goto(baseUrl); // Reload page for each iteration
      await register.fillForm(
        email,
        userData.validUser.password,
        userData.validUser.password
      );
      await register.submit();
      await register.expectEmailInvalid();
    }
  });

  test('Password validation - empty & mismatch', async ({ page }) => {
    // Empty password test
    await register.fillForm('test1@example.com', '', '');
    await register.submit();
    await expect(page.locator('input[name="password"]:invalid')).toBeVisible();

    // Mismatched passwords
    await register.fillForm(
      'test2@example.com',
      userData.mismatchPassword.password,
      userData.mismatchPassword.confirm_password
    );
    await register.submit();
    await register.expectPasswordMismatch();
  });

  test('Duplicate email registration', async () => {
    // First registration
    await register.fillForm(
      userData.validUser.email,
      userData.validUser.password,
      userData.validUser.password
    );
    await register.submit();

    // Second registration with same email
    await register.goto(baseUrl);
    await register.fillForm(
      userData.validUser.email,
      userData.validUser.password,
      userData.validUser.password
    );
    await register.submit();
    await register.expectDuplicateEmailError();
  });
});
