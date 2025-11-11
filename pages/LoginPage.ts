import { Page, Locator } from '@playwright/test';
import { time } from 'console';

/**
 * Page Object Model for the Sauce Demo login page (https://www.saucedemo.com/)
 *
 * Selectors taken from the live app:
 *  - username input: #user-name
 *  - password input: #password
 *  - login button: #login-button
 *
 * Usage:
 *   const login = new LoginPage(page);
 *   await login.login('standard_user', 'secret_sauce');
 */
export class LoginPage {
	readonly page: Page;
	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.usernameInput = page.locator('#user-name');
		this.passwordInput = page.locator('#password');
		this.loginButton = page.locator('#login-button');
	}

	/**
	 * Fill username and password and submit the login form.
	 * Does not assume navigation happens; caller should await expected navigation or page change.
	 */
	async login(username: string, password: string): Promise<void> {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginButton.click({timeout:15000});
	}

	/** Convenience: login as the standard demo user */
	async loginAsStandardUser(): Promise<void> {
		await this.login('standard_user', 'secret_sauce');
		/*await this.usernameInput.fill('standard_user');
		await this.passwordInput.fill('secret_sauce');
		await this.loginButton.click({timeout:15000});*/
	}

	/** Convenience: login as locked out user (doesn't successfully log in) */
	async loginAsLockedOutUser(): Promise<void> {
		await this.login('locked_out_user', 'secret_sauce');
	}
}


